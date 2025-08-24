# 💰📊 MoneyMap – Expense Tracker App 

A **full-stack expense tracker application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
The app helps users manage their income and expenses, visualize spending patterns with charts, and export reports in Excel format.  
It also includes **secure authentication** and a **responsive UI** for seamless usage across devices.

<img width="1892" height="865" alt="Screenshot 2025-08-23 215513" src="https://github.com/user-attachments/assets/3eb57585-ea3f-4ff0-8d49-66c1d4194694" />

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
- **Visualization**: Recharts  
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

<img width="1913" height="866" alt="Screenshot 2025-08-23 215607" src="https://github.com/user-attachments/assets/f889a059-8565-46b5-9714-8f5dee9b9c08" />
<img width="1892" height="865" alt="Screenshot 2025-08-23 215513" src="https://github.com/user-attachments/assets/f2b58844-d234-4697-a6ab-299b2d53e544" />
<img width="1894" height="871" alt="Screenshot 2025-08-23 215557" src="https://github.com/user-attachments/assets/acea6722-8474-4b0a-91f3-e81502302797" />
<img width="1893" height="865" alt="Screenshot 2025-08-23 215546" src="https://github.com/user-attachments/assets/8ecd5322-3f27-4ad5-a275-aa1826aed581" />
<img width="1896" height="868" alt="Screenshot 2025-08-23 215536" src="https://github.com/user-attachments/assets/dacf9a39-a287-4104-b007-3cf2f7c2104e" />
<img width="1895" height="848" alt="Screenshot 2025-08-23 215527" src="https://github.com/user-attachments/assets/fab4b3ec-ca74-4403-9051-468bc8686192" />


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

