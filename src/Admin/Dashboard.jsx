import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { FaThLarge, FaHotel, FaUser, FaRupeeSign, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
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
// import { hotelData } from "./Hotelmanagement";
import { userData } from "./User";
import { transactionData } from "./Transaction";
import axios from "axios";


const DashboardHome = () => {

  const [packageCount, setPackageCount] = useState(0);
  const [destinationCount, setDestinationCount] = useState(0);
  const [reviewCount, setreviewCount] = useState(0);
  const [hotelmanagementCount, sethotelmanagementCount] = useState(0);

  useEffect(() => {
    // Fetch packages count
    axios
      .get("https://generateapi.techsnack.online/api/package", {
        headers: { Authorization: 'K4OS0XNqsLR7enT6' },
      })
      .then((res) => {
        const apiData = res.data.Data || res.data.data || [];
        setPackageCount(apiData.length);
      })
      .catch(() => setPackageCount(0));

    // Fetch destinations count
    axios
      .get("https://generateapi.techsnack.online/api/destination", {
        headers: { Authorization: 'RTzcbSNYBybOqY1f' },
      })
      .then((res) => {
        const apiData = res.data.Data || res.data.data || [];
        setDestinationCount(apiData.length);
      })
      .catch(() => setDestinationCount(0));

    // Fetch review count
    axios
      .get("https://generateapi.techsnack.online/api/review", {
        headers: { Authorization: 'dPEwRulbwf8Ktfd3' },
      })
      .then((res) => {
        const apiData = res.data.Data || res.data.data || [];
        setreviewCount(apiData.length);
      })
      .catch(() => setreviewCount(0));


      // Fetch hotel count
    axios
      .get("https://generateapi.techsnack.online/api/hotel", {
        headers: { Authorization: 'ZnXgKXc7OLqLlVn5' },
      })
      .then((res) => {
        const apiData = res.data.Data || res.data.data || [];
        sethotelmanagementCount(apiData.length);
      })
      .catch(() => sethotelmanagementCount(0));
  }, []);

  



  const stats = [
    { title: "Total Bookings", value: bookingData.length },
    { title: "Total Hotels", value: hotelmanagementCount },
    { title: "Total Packages", value: packageCount },
    { title: "Total Users", value: userData.length },
    { title: "Total Destinations", value: destinationCount },
    { title: "Total Transaction", value: transactionData.length },
    { title: "Total Review", value: reviewCount },
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

const TitleBar = ({ toggleSidebar, isOpen, onLogout }) => {
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
      <button className="menu-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <h3 className="navbar-title">{pathToTitle[location.pathname] || "Dashboard"}</h3>

      {/* 🔹 Logout Button on Right */}
      <button className="logout-icon" onClick={onLogout}>
        <FaSignOutAlt />
      </button>
    </div>
  );
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // 🔹 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/"); // redirect to user side home
  };

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
        <TitleBar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} onLogout={handleLogout} />
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
