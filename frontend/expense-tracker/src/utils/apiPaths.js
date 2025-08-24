export const BASE_URL = "https://moneymap-backend-al1s.onrender.com";

//utils/apiPaths.js
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};

/*
This code defines a single source of truth for all API endpoints used in an application. It's a best practice that prevents you from hardcoding URLs throughout your codebase, making it much easier to manage and update them. 🗺️

***

## `BASE_URL`

The **`BASE_URL`** is the root URL of the backend server. All API requests will be sent to this base URL, with a specific path appended to it. For example, a login request would go to `https://moneymap-backend-al1s.onrender.com/api/v1/auth/login`.

***

## `API_PATHS`

The **`API_PATHS`** object organizes all the different endpoints into logical, nested categories, such as `AUTH` for authentication, `INCOME` for income-related actions, and `EXPENSE` for expense-related ones.

This object uses two main patterns for defining paths:

1.  **Static Paths**: Most paths are simple strings that represent a fixed endpoint, like `AUTH.LOGIN`.
2.  **Dynamic Paths**: For endpoints that require a unique identifier (like an ID), the path is defined as a **function**. This is a very robust design pattern. For example, `INCOME.DELETE_INCOME` is a function that takes an `incomeId` and returns a complete, ready-to-use URL string, such as `/api/v1/income/123`. This ensures the correct ID is always included in the request URL.
*/
