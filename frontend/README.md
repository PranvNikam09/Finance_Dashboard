#  Finance Dashboard

A modern, highly responsive financial tracking dashboard leveraging a robust full-stack architecture. This application provides users with an intuitive interface to manage, analyze, and visualize their personal or business transactions.

## ✨ Features

* **Interactive Dashboard**: View real-time statistical summaries including Total Balance, Total Income, and Total Expenses.
* **Data Visualizations**: Beautiful, responsive charts powered by Recharts. Includes time-based balance trend graphs and categorical expense breakdowns.
* **Transaction Management**: A comprehensive grid to list, search, sort, and filter financial activities based on date, type, and category.
* **Derived Insights**: An analytical insights view that parses transactions to extract smart observations natively, including highest spending category and overall savings rate.
* **Role-Based Simulation**: UI seamlessly switches between "Viewer" (Read-only) and "Admin" (Add/Delete entries) modes.
* **Sleek UI/UX**: Custom themed fluid interface matching modern aesthetic standards with CSS Custom Properties and subtle micro-animations.

##  Technologies Used

**Frontend (`/frontend`)**
* **Framework:** React 19 (via Vite)
* **Routing:** React Router v7
* **State Management:** React Context API & `useReducer`
* **Icons:** Lucide React
* **Charts/Analytics:** Recharts
* **Dates/Times:** date-fns


##  Installation & Setup

This repository is split into two distinct environments: the Laravel Backend and the React Frontend. You will need to run both to fully utilize the application.

### 1. Clone the repository
```bash
git clone https://github.com/PranvNikam09/Finance_Dashboard.git
cd finance-dashboard
```


### 2. Frontend Setup (React / Vite)
Open a second terminal window and navigate to the frontend service.
```bash
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```
*The frontend will run on `http://localhost:5173`*

## 📁 Project Structure

```text
Finance_Dashboard/
│
├── frontend/            # React UI Client
│   ├── src/
│   │   ├── components/  # Reusable UI elements (Sidebar, Header, etc.)
│   │   ├── context/     # Global APP State
│   │   ├── pages/       # Core Views (Dashboard, Transactions, Insights)
│   │   └── App.jsx      # Route definitions
│   └── package.json     
└── README.md
```

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
