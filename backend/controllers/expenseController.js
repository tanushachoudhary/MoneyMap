// Import the 'xlsx' library for creating and managing Excel files.
const xlsx = require("xlsx");
// Import the Expense model to interact with the 'expenses' collection in the database.
const Expense = require("../models/Expense");

/**
 * Controller to add a new expense record for the authenticated user.
 */
exports.addExpense = async (req, res) => {
  // The user's ID is attached to the request object by the authentication middleware.
  const userId = req.user.id;
  try {
    const { icon, category, amount, date } = req.body;

    // --- 1. Validation ---
    // Check if the required fields are present in the request body.
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // --- 2. Create and Save the New Expense ---
    // Create a new instance of the Expense model.
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date), // Ensure the date is stored as a proper Date object.
    });

    // Save the new document to the database.
    await newExpense.save();
    // Respond with a 200 (OK) status and the newly created expense object.
    res.status(200).json(newExpense);
  } catch (error) {
    // --- 3. Error Handling ---
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Controller to retrieve all expense records for the authenticated user.
 */
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    // Find all expense documents in the database that match the user's ID.
    // Sort the results by date in descending order (newest first).
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    // Send the array of expenses as a JSON response.
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Controller to delete a specific expense record by its ID.
 */
exports.deleteExpense = async (req, res) => {
  try {
    // The ID of the expense to delete is passed as a URL parameter (e.g., /api/expense/someId).
    await Expense.findByIdAndDelete(req.params.id);
    // Respond with a success message.
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Controller to generate and download an Excel file of the user's expense data.
 */
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Fetch all expense data for the user from the database.
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // 2. Prepare the data for the Excel sheet by selecting and mapping the desired fields.
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    }));

    // --- 3. Generate the Excel File on the Server ---
    // Create a new workbook.
    const wb = xlsx.utils.book_new();
    // Convert our JSON data into a worksheet.
    const ws = xlsx.utils.json_to_sheet(data);
    // Add the worksheet to the workbook with the name "Expense".
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    // Write the workbook to a file on the server's local filesystem.
    xlsx.writeFile(wb, "expense_details.xlsx");

    // 4. Send the generated file to the client for download.
    // The `res.download()` method sends the file and prompts the user's browser to save it.
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
