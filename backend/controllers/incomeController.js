// Import the 'xlsx' library for creating and managing Excel files.
const xlsx = require("xlsx");
// Import the Income model to interact with the 'incomes' collection in the database.
const Income = require("../models/Income");

/**
 * Controller to add a new income record for the authenticated user.
 */
exports.addIncome = async (req, res) => {
  // The user's ID is attached to the request object by the authentication middleware.
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;

    // --- 1. Validation ---
    // Check if the required fields are present in the request body.
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // --- 2. Create and Save the New Income Record ---
    // Create a new instance of the Income model.
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date), // Ensure the date is stored as a proper Date object.
    });

    // Save the new document to the database.
    await newIncome.save();
    // Respond with a 200 (OK) status and the newly created income object.
    res.status(200).json(newIncome);
  } catch (error) {
    // --- 3. Error Handling ---
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Controller to retrieve all income records for the authenticated user.
 */
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    // Find all income documents in the database that match the user's ID.
    // Sort the results by date in descending order (newest first).
    const income = await Income.find({ userId }).sort({ date: -1 });
    // Send the array of income records as a JSON response.
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Controller to delete a specific income record by its ID.
 */
exports.deleteIncome = async (req, res) => {
  try {
    // The ID of the income record to delete is passed as a URL parameter (e.g., /api/income/someId).
    await Income.findByIdAndDelete(req.params.id);
    // Respond with a success message.
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * Controller to generate and download an Excel file of the user's income data.
 */
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Fetch all income data for the user from the database.
    const income = await Income.find({ userId }).sort({ date: -1 });

    // 2. Prepare the data for the Excel sheet by selecting and mapping the desired fields.
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    }));

    // --- 3. Generate the Excel File on the Server ---
    // Create a new workbook.
    const wb = xlsx.utils.book_new();
    // Convert our JSON data into a worksheet.
    const ws = xlsx.utils.json_to_sheet(data);
    // Add the worksheet to the workbook with the name "Income".
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    // Write the workbook to a file on the server's local filesystem.
    xlsx.writeFile(wb, "income_details.xlsx");

    // 4. Send the generated file to the client for download.
    // The `res.download()` method sends the file and prompts the user's browser to save it.
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
