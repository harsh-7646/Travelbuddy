import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Dashboard from "./Admin/Dashboard";


import Header from "./User/Header";
import Destinationuser from "./User/Destinationuser";
import Package from "./User/Package";
import About from "./User/About";
import Contact from "./User/Contact";
import Mybooking from "./User/Mybooking";
import Home from "./User/Home";


import Login from "./Login";


const UserLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);


const ProtectedRoute = ({ children, role, userType }) => {
  if (!userType) return <Navigate to="/login" replace />;
  if (userType !== role) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);

  useEffect(() => {
    if (userType) localStorage.setItem("userType", userType);
    else localStorage.removeItem("userType");
  }, [userType]);

  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login setUserType={setUserType} />} />


        <Route path="/" element={<UserLayout> <Home /> </UserLayout>} />

        <Route path="/destinations" element={<UserLayout> <Destinationuser /> </UserLayout>} />

        <Route path="/package" element={<UserLayout> <Package /> </UserLayout>} />

        <Route path="/about" element={<UserLayout> <About /> </UserLayout>} />

        <Route path="/contact" element={<UserLayout> <Contact /> </UserLayout>} />

        <Route path="/bookings" element={<UserLayout> <Mybooking /> </UserLayout>} />


        <Route path="/admin/*" element={<ProtectedRoute role="admin" userType={userType}> <Dashboard /> </ProtectedRoute>} />


        <Route path="/logout" element={<Navigate to="/login" replace />} />


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;





// Destination : RTzcbSNYBybOqY1f
// package : K4OS0XNqsLR7enT6
// review : dPEwRulbwf8Ktfd3
// hotel : ZnXgKXc7OLqLlVn5