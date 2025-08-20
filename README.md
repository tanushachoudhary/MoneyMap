# 💰📊 MoneyMap – Expense Tracker App 

A **full-stack expense tracker application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
The app helps users manage their income and expenses, visualize spending patterns with charts, and export reports in Excel format.  
It also includes **secure authentication** and a **responsive UI** for seamless usage across devices.

---

## 🚀 Features

1. **User Authentication** – Secure **login & signup** using **JWT authentication**.  
2. **Dashboard Overview** – Displays **Total Balance, Income, and Expenses** in summary cards.  
3. **Income Management** – Add, view, delete, and export income sources.  
4. **Expense Management** – Add, view, delete, and export expenses with **category-based tracking**.  
5. **Interactive Charts** – Visual representation of income & expenses using **Bar, Pie, and Line charts**.  
6. **Recent Transactions** – Displays the **latest income and expense records** for quick access.  
7. **Reports Export** – Download all **income and expense data in Excel format**.  
8. **Mobile Responsive UI** – Works seamlessly across **desktops, tablets, and mobile devices**.  
9. **Intuitive Navigation** – Sidebar menu with easy access to **Dashboard, Income, Expenses, and Logout**.  
10. **Delete Functionality** – Hover over income/expense cards to reveal a **delete button** for easy record removal.  

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Recharts, Axios, React Router, Emoji Picker
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Multer, XLSX
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer (for profile images)
- **Visualization**: Chart.js / Recharts  
- **Excel Export**: XLSX, ExcelJS

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanushachoudhary/MoneyMap.git 
   cd MoneyMap

2. **Backend Setup**


   ```bash
   cd backend
   npm install
   npm start
   ```

   * Configure your `.env` file with:

     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     PORT=5000
     ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📊 Screenshots


---

## 📈 Future Enhancements

* Add recurring expenses & income support
* Add PDF report export option
* Add dark mode support
* Enable multi-user collaboration

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify.

