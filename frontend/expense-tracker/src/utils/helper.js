import moment from "moment";

/**
 * Validates an email address against a standard regex pattern.
 * The regex checks for:
 * 1. One or more characters that are not whitespace or '@' before the '@' symbol.
 * 2. A literal '@' symbol.
 * 3. One or more characters that are not whitespace or '@' after the '@' symbol.
 * 4. A literal '.' symbol.
 * 5. One or more characters that are not whitespace or '@' after the '.' symbol.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Generates initials from a full name.
 * It takes the first character of the first two words.
 * @param {string} name - The full name (e.g., "John Doe").
 * @returns {string} - The uppercase initials (e.g., "JD").
 */
export const getInitials = (name) => {
  // Return an empty string if the name is not provided.
  if (!name) return "";

  // Split the name into an array of words.
  const words = name.split(" ");
  let initials = "";

  // Loop through the first two words of the name.
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    // Append the first character of each word to the initials string.
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

/**
 * Formats a number using the Indian numbering system (lakhs, crores).
 * e.g., 100000 becomes 1,00,000.
 * @param {number | string} number - The number to format.
 * @returns {string} - The formatted number as a string.
 */
export const addIndianThousandSeparator = (number) => {
  // Split the number into integer and decimal parts.
  let [integer, decimal] = number.toString().split(".");
  // Get the last three digits of the integer part.
  let lastThree = integer.slice(-3);
  // Get all digits before the last three.
  let otherNumbers = integer.slice(0, -3);

  // If there are other numbers, add a comma before the last three digits.
  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }

  // Use regex to add a comma after every two digits in the remaining part.
  let formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    
  // Re-join the integer and decimal parts.
  return decimal ? formatted + "." + decimal : formatted;
};

/**
 * Prepares data for an expense bar chart.
 * It extracts the 'category' and 'amount' from each data item.
 * @param {Array<Object>} data - Array of expense objects, e.g., [{ category: 'Food', amount: 500 }].
 * @returns {Array<Object>} - A new array formatted for a bar chart, e.g., [{ category: 'Food', amount: 500 }].
 */
export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};

/**
 * Prepares data for an income bar chart.
 * It sorts the data by date and formats the date for display.
 * @param {Array<Object>} data - Array of income objects, e.g., [{ date: '2025-08-24', amount: 50000, source: 'Salary' }].
 * @returns {Array<Object>} - A new array sorted by date and formatted for a chart, e.g., [{ month: '24th Aug', amount: 50000, source: 'Salary' }].
 */
export const prepareIncomeBarChartData = (data = []) => {
  // Create a new array and sort it by date in ascending order.
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Map over the sorted data to create the desired structure.
  const chartData = sortedData.map((item) => ({
    // Format the date to a more readable string like "24th Aug".
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

/**
 * Prepares data for an expense line chart.
 * It sorts the data by date and formats the date for display.
 * @param {Array<Object>} data - Array of expense objects, e.g., [{ date: '2025-08-24', amount: 500, category: 'Food' }].
 * @returns {Array<Object>} - A new array sorted by date and formatted for a line chart, e.g., [{ month: '24th Aug', amount: 500, category: 'Food' }].
 */
export const prepareExpenseLineChartData = (data = []) => {
  // Create a copy of the data array and sort it by date.
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  
  // Map over the sorted data to format it for the chart.
  const chartData = sortedData.map((item) => ({
    // Use moment.js to format the date string.
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};