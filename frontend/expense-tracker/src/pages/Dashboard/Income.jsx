import React, { useEffect, useState } from "react";
// Import layout, UI components, and hooks
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
// Import utilities for API calls and user feedback
import axiosInstance from "./../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

const Income = () => {
  // Custom hook to ensure the user is authenticated.
  useUserAuth();

  // State to store the array of income records fetched from the API.
  const [incomeData, setIncomeData] = useState([]);
  // State to manage the loading status during API calls.
  const [loading, setLoading] = useState(false);
  // State to manage the delete confirmation modal. `show` toggles visibility, `data` holds the ID to delete.
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  // State to toggle the "Add Income" modal.
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  /**
   * Fetches all income records from the backend API.
   */
  const fetchIncomeDetails = async () => {
    if (loading) return; // Prevent re-fetching if a request is already in progress.
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) {
        setIncomeData(response.data); // Update state with the fetched data.
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state regardless of outcome.
    }
  };

  /**
   * Handles adding a new income record after form submission.
   * @param {object} income - The new income data from the form.
   */
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // --- Client-Side Validation ---
    if (!source.trim()) {
      toast.error("Source is required.");
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

    // --- API Call to Add Income ---
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false); // Close the modal.
      toast.success("Income added successfully");
      fetchIncomeDetails(); // Refresh the income list to show the new data.
    } catch (error) {
      console.error(
        "Error adding Income",
        error.response?.data?.message || error.message
      );
    }
  };

  /**
   * Deletes an income record by its ID.
   * @param {string} id - The ID of the income record to be deleted.
   */
  const deleteIncome = async (id) => {
    try {
      // Use the dynamic path function to create the correct API endpoint.
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null }); // Close the confirmation alert.
      toast.success("Income details deleted successfully");
      fetchIncomeDetails(); // Refresh the income list.
    } catch (error)      {
      console.error(
        "Error deleting income",
        error.response?.data?.message || error.message
      );
    }
  };

  /**
   * Handles the request to download income details as an Excel file.
   */
  const handleDownloadIncomeDetails = async () => {
    try {
      // Request the file data from the server, specifying the response type as 'blob'.
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" }
      );

      // --- Client-side logic to trigger the file download ---
      // Create a temporary URL for the received blob data.
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Create a hidden anchor tag to act as a download link.
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx"); // Set the desired filename.
      document.body.appendChild(link);
      link.click(); // Programmatically click the link to initiate the download.
      
      // Clean up by removing the link and revoking the temporary URL to free up memory.
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details", error.message);
      toast.error("Failed to download income details");
    }
  };

  // The useEffect hook runs this function once when the component mounts.
  useEffect(() => {
    fetchIncomeDetails();

    return () => {}; // Cleanup function.
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)} // Callback to open the "Add Income" modal.
            />
          </div>
        </div>

        <IncomeList
          transactions={incomeData}
          onDelete={(id) => {
            // Callback to open the delete alert and store the relevant ID.
            setOpenDeleteAlert({ show: true, data: id });
          }}
          onDownload={handleDownloadIncomeDetails}
        />

        {/* Modal for Adding New Income */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        
        {/* Modal for Confirming Deletion */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)} // Pass the stored ID to the delete function.
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;