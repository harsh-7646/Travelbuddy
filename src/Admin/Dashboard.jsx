// import React from "react";
// import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
// import "./Dashboard.css";

// import { FaThLarge, FaHotel, FaUser, FaRupeeSign } from "react-icons/fa";
// import { MdReviews, MdLaptopChromebook, MdPlace } from "react-icons/md";
// import { TbPackages } from "react-icons/tb";

// import Booking from "./Booking";
// import Hotelmanagement from "./Hotelmanagement";
// import Package from "./Package";
// import User from "./User";
// import Destination from "./Destination";
// import Transaction from "./Transaction";
// import Review from "./Review";


// import { bookingData } from "./Booking";
// import { hotelData } from "./Hotelmanagement";
// import { userData } from "./User";
// import { transactionData } from "./Transaction";
// import { reviewData } from "./Review";

// const DashboardHome = () => {
//   const stats = [
//     { title: "Total Bookings", value: bookingData.length },
//     { title: "Total Hotels", value: hotelData.length },
//     { title: "Total Packages", value: 5 },
//     { title: "Total Users", value: userData.length },
//     { title: "Total Destination", value: 4 },
//     { title: "Total Transaction", value: transactionData.length },
//     { title: "Total Reviews", value: reviewData.length },
//   ];

//   return (
//     <div className="stats-grid">
//       {stats.map((item, index) => (
//         <div className="card" key={index}>
//           <h4>{item.title}</h4>
//           <p>{item.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// const TitleBar = () => {
//   const location = useLocation();
//   const pathToTitle = {
//     "/dashboard": "Dashboard",
//     "/dashboard/booking": "Bookings",
//     "/dashboard/hotelmanagement": "Hotel Management",
//     "/dashboard/package": "Package Management",
//     "/dashboard/user": "User Management",
//     "/dashboard/destination": "Destination Management",
//     "/dashboard/transaction": "Transactions",
//     "/dashboard/review": "Reviews",
//   };

//   const title = pathToTitle[location.pathname] || "Dashboard";

//   return (
//     <div className="navbar">
//       <h3>{title}</h3>
//     </div>
//   );
// };

// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <div className="sidebar">
//         <h2>TRAVEL</h2>
//         <ul className="sidebar-ul">
//           <li><Link to="/dashboard"><FaThLarge /> Dashboard</Link></li>
//           <li><Link to="/dashboard/booking"><MdLaptopChromebook /> Bookings</Link></li>
//           <li><Link to="/dashboard/hotelmanagement"><FaHotel /> Hotel Management</Link></li>
//           <li><Link to="/dashboard/package"><TbPackages /> Packages</Link></li>
//           <li><Link to="/dashboard/user"><FaUser /> Users</Link></li>
//           <li><Link to="/dashboard/destination"><MdPlace /> Destination</Link></li>
//           <li><Link to="/dashboard/transaction"><FaRupeeSign /> Transactions</Link></li>
//           <li><Link to="/dashboard/review"><MdReviews /> Reviews</Link></li>
//         </ul>
//       </div>

//       <div className="main-content">
//         <TitleBar />
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//           <Route path="/dashboard" element={<DashboardHome />} />
//           <Route path="/dashboard/booking" element={<Booking />} />
//           <Route path="/dashboard/hotelmanagement" element={<Hotelmanagement />} />
//           <Route path="/dashboard/package" element={<Package />} />
//           <Route path="/dashboard/user" element={<User />} />
//           <Route path="/dashboard/destination" element={<Destination />} />
//           <Route path="/dashboard/transaction" element={<Transaction />} />
//           <Route path="/dashboard/review" element={<Review />} />
//           <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;








import React, { useState } from "react";
import { Routes, Route, Navigate, NavLink, useLocation } from "react-router-dom";
import "./Dashboard.css";

import { FaThLarge, FaHotel, FaUser, FaRupeeSign, FaBars, FaTimes } from "react-icons/fa";
import { MdReviews, MdLaptopChromebook, MdPlace } from "react-icons/md";
import { TbPackages } from "react-icons/tb";

import Booking from "./Booking";
import Hotelmanagement from "./Hotelmanagement";
import Package from "./Package";
import User from "./User";
import Destination from "./Destination";
import Transaction from "./Transaction";
import Review from "./Review";

import { bookingData } from "./Booking";
import { hotelData } from "./Hotelmanagement";
import { userData } from "./User";
import { transactionData } from "./Transaction";
// import { reviewData } from "./Review";

const DashboardHome = () => {
  const stats = [
    { title: "Total Bookings", value: bookingData.length },
    { title: "Total Hotels", value: hotelData.length },
    { title: "Total Packages", value: 5 },
    { title: "Total Users", value: userData.length },
    { title: "Total Destination", value: 4 },
    { title: "Total Transaction", value: transactionData.length },
    // { title: "Total Reviews", value: reviewData.length },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item, index) => (
        <div className="card" key={index}>
          <h4>{item.title}</h4>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

const TitleBar = ({ toggleSidebar, isOpen }) => {
  const location = useLocation();
  const pathToTitle = {
    "/admin": "Dashboard",
    "/admin/booking": "Bookings",
    "/admin/hotelmanagement": "Hotel Management",
    "/admin/package": "Package Management",
    "/admin/user": "User Management",
    "/admin/destination": "Destination Management",
    "/admin/transaction": "Transactions",
    "/admin/review": "Reviews",
  };

  return (
    <div className="navbar">
      {/* 🔹 Always show toggle button */}
      <button className="menu-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <h3>{pathToTitle[location.pathname] || "Dashboard"}</h3>
    </div>
  );
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard-container">
      {/* 🔹 Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>TRAVEL</h2>
        <ul className="sidebar-ul">
          <li><NavLink to="/admin" end onClick={closeSidebar}><FaThLarge /> Dashboard</NavLink></li>
          <li><NavLink to="/admin/booking" onClick={closeSidebar}><MdLaptopChromebook /> Bookings</NavLink></li>
          <li><NavLink to="/admin/hotelmanagement" onClick={closeSidebar}><FaHotel /> Hotel Management</NavLink></li>
          <li><NavLink to="/admin/package" onClick={closeSidebar}><TbPackages /> Packages</NavLink></li>
          <li><NavLink to="/admin/user" onClick={closeSidebar}><FaUser /> Users</NavLink></li>
          <li><NavLink to="/admin/destination" onClick={closeSidebar}><MdPlace /> Destination</NavLink></li>
          <li><NavLink to="/admin/transaction" onClick={closeSidebar}><FaRupeeSign /> Transactions</NavLink></li>
          <li><NavLink to="/admin/review" onClick={closeSidebar}><MdReviews /> Reviews</NavLink></li>
        </ul>
      </div>

      {/* 🔹 Main Content */}
      <div className="main-content">
        <TitleBar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} />
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="booking" element={<Booking />} />
          <Route path="hotelmanagement" element={<Hotelmanagement />} />
          <Route path="package" element={<Package />} />
          <Route path="user" element={<User />} />
          <Route path="destination" element={<Destination />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="review" element={<Review />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
