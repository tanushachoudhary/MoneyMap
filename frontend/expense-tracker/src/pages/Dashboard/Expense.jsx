import React, { useEffect, useState } from "react";
// Import layout, UI components, and hooks
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
// Import utilities for API calls
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const Expense = () => {
  // Custom hook to ensure the user is authenticated before rendering the page.
  useUserAuth();

  // State to hold the list of all expense transactions.
  const [expenseData, setExpenseData] = useState([]);
  // State to manage the loading status of API calls.
  const [loading, setLoading] = useState(false);
  // State to control the delete confirmation alert. It's an object to hold both
  // the visibility status (`show`) and the ID of the item to be deleted (`data`).
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  // State to control the visibility of the "Add Expense" modal.
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  /**
   * Fetches all expense records from the server.
   */
  const fetchExpenseDetails = async () => {
    if (loading) return; // Prevent multiple simultaneous fetches.
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        setExpenseData(response.data); // Update state with fetched data.
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state.
    }
  };

  /**
   * Handles the submission of a new expense.
   * @param {object} expense - The expense object from the form.
   */
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    
    // --- Basic Client-Side Validation ---
    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }
    
    // --- API Call ---
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false); // Close the modal on success.
      toast.success("Expense added successfully");
      fetchExpenseDetails(); // Refresh the expense list to show the new entry.
    } catch (error) {
      console.error(
        "Error adding Expense",
        error.response?.data?.message || error.message
      );
    }
  };

  /**
   * Deletes an expense record by its ID.
   * @param {string} id - The ID of the expense to delete.
   */
  const deleteExpense = async (id) => {
    try {
      // Use the dynamic path function to build the correct delete URL.
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null }); // Close the delete alert.
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails(); // Refresh the expense list.
    } catch (error) {
      console.error(
        "Error deleting expense",
        error.response?.data?.message || error.message
      );
    }
  };

  /**
   * Handles the downloading of expense details as an Excel file.
   */
  const handleDownloadExpenseDetails = async () => {
    try {
      // Make the API request, specifying the response type as 'blob' for file data.
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        { responseType: "blob" }
      );

      // Create a temporary URL from the blob data.
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Create a temporary anchor element to trigger the download.
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx"); // Set the filename.
      document.body.appendChild(link);
      link.click(); // Programmatically click the link to start the download.
      
      // Clean up by removing the link and revoking the object URL.
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details", error.message);
      toast.error("Failed to download expense details");
    }
  };

  // useEffect hook to fetch initial data when the component first mounts.
  useEffect(() => {
    fetchExpenseDetails();

    return () => {}; // Cleanup function.
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)} // Opens the "Add Expense" modal.
            />
            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => {
                // Opens the delete confirmation and stores the ID.
                setOpenDeleteAlert({ show: true, data: id });
              }}
              onDownload={handleDownloadExpenseDetails}
            />
          </div>
        </div>

        {/* Modal for Adding a New Expense */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Modal for Confirming Deletion */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)} // Calls delete function with the stored ID.
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;