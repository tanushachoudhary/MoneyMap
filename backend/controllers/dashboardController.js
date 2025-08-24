// Import the Mongoose models for interacting with the database.
const Expense = require("../models/Expense");
const Income = require("../models/Income");

// Import utilities from Mongoose to work with ObjectIDs.
const { Types } = require("mongoose");

/**
 * Controller to fetch and assemble all data required for the user's dashboard.
 */
exports.getDashboardData = async (req, res) => {
  try {
    // 1. Get the authenticated user's ID from the request object (added by auth middleware).
    const userId = req.user.id;
    // Convert the string ID to a Mongoose ObjectId, which is necessary for aggregation queries.
    const userObjectId = new Types.ObjectId(String(userId));

    // 2. Fetch total income and expenses using the powerful aggregation pipeline.
    // This is more efficient than fetching all documents and summing them in the application.
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } }, // Filter documents by the current user.
      { $group: { _id: null, total: { $sum: "$amount" } } }, // Group all matches and sum their 'amount'.
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // 3. Get income transactions from the last 60 days.
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      // Create a date 60 days in the past and find all records with a date greater than or equal to it.
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 }); // Sort by date, newest first.

    // Calculate the total sum of these transactions using Array.reduce().
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // 4. Get expense transactions from the last 30 days (similar logic).
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expensesLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // 5. Fetch the last 5 transactions of each type (income and expense) and merge them.
    const lastTransactions = [
      // Fetch the last 5 income records...
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        // ...and map over them to add a 'type' property.
        (txn) => ({
          ...txn.toObject(), // Convert Mongoose document to a plain JS object.
          type: "income",
        })
      ),
      // Fetch the last 5 expense records...
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        // ...and map over them to add a 'type' property.
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date); // Sort the combined array to get the true most recent transactions.

    // 6. Assemble and send the final JSON response.
    res.json({
      // The aggregation result is an array, e.g., [{ total: 5000 }]. We safely access the value.
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    // Handle any server errors.
    res.status(500).json({ message: "Server Error", error });
  }
};
