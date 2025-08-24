import React, { useEffect, useState } from "react";
// Import layout and UI components
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InfoCard from "./../../components/Cards/InfoCard";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview.jsx";
import ExpenseTransaction from "../../components/Dashboard/ExpenseTransaction.jsx";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses.jsx";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart.jsx";
import RecentIncome from "../../components/Dashboard/RecentIncome.jsx";
// Import hooks and utilities
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addIndianThousandSeparator } from "./../../utils/helper";
// Import icons
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

const Home = () => {
  // Custom hook to handle user authentication. It likely redirects to the login page if the user is not authenticated.
  useUserAuth();
  // Hook from React Router for programmatic navigation.
  const navigate = useNavigate();
  // State to store the data fetched from the dashboard API.
  const [dashboardData, setDashboardData] = useState(null);
  // State to track if the API request is in progress, preventing duplicate calls.
  const [loading, setLoading] = useState(false);

  /**
   * Fetches the dashboard summary data from the API.
   */
  const fetchDashboardData = async () => {
    // Prevent fetching if a request is already in progress.
    if (loading) return;
    setLoading(true);
    try {
      // Make a GET request to the dashboard data endpoint.
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      // If the request is successful, update the state with the response data.
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      // Ensure the loading state is reset, whether the request succeeds or fails.
      setLoading(false);
    }
  };

  // This useEffect hook runs once when the component mounts, thanks to the empty dependency array [].
  useEffect(() => {
    fetchDashboardData();
    // Cleanup function (optional here, but good practice).
    return () => {};
  }, []);

  return (
    // The DashboardLayout component provides the standard page structure (e.g., sidebar, navbar).
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* Section for displaying summary info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            // Use optional chaining (?.) and nullish coalescing (|| 0) for safe data access before it has loaded.
            value={addIndianThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addIndianThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addIndianThousandSeparator(
              dashboardData?.totalExpenses || 0
            )}
            color="bg-red-500"
          />
        </div>

        {/* Section for displaying detailed dashboard components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            // Pass a function to handle navigation when "See More" is clicked.
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpenses || 0}
          />

          <ExpenseTransaction
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => {
              navigate("/expense");
            }}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions}
          />

          <RecentIncomeWithChart
            // Pass a slice of the data to show a limited number of items.
            data={
              dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []
            }
            totalIncome={dashboardData?.totalIncome}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;