// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Dashboard from "./Admin/Dashboard";

// import Header from './User/Header';
// // import Hero from './User/Hero';
// // import Destinationuser from './User/Destinationuser';
// // import About from './User/About';
// // import Contact from './User/Contact';
// // import Mybooking from './User/Mybooking';
// // import Footer from './User/Footer';
// // import Team from './User/Team'


// // import Login from './Login';




// function App() {
//   return (
//     <>

//       <Router>
//         <Routes>
//           <Route path="/*" element={<Dashboard />} />
//           <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </Router>

//       <Header></Header>
//       {/* <Hero></Hero>  */}
//       {/* <Destinationuser></Destinationuser>  */}
//       {/* <Team></Team>
//       <About></About> */}
//       {/* <Contact></Contact> */}
//       {/* <Mybooking></Mybooking>  */}
//       {/* <Login></Login> */}

//       {/* <Footer></Footer> */}


//     </>
//   );
// }

// export default App;


// // RTzcbSNYBybOqY1f
// // K4OS0XNqsLR7enT6
// f0GG2jSiHJVRuZNc





// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// 🔹 Admin side
import Dashboard from "./Admin/Dashboard";

// 🔹 User side
import Header from "./User/Header";
import Destinationuser from "./User/Destinationuser";
import Package from "./User/Package";
import About from "./User/About";
import Contact from "./User/Contact";
import Mybooking from "./User/Mybooking";
import Home1 from "./User/Home1";

// 🔹 Login page
import Login from "./Login";

// Layout wrapper for user pages
const UserLayout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

// Protected route for admin
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
        {/* Login */}
        <Route path="/login" element={<Login setUserType={setUserType} />} />

        {/* 🔹 User side → PUBLIC (default accessible) */}
        <Route
          path="/"
          element={
            <UserLayout>
              <Home1 />
            </UserLayout>
          }
        />
        <Route
          path="/destinations"
          element={
            <UserLayout>
              <Destinationuser />
            </UserLayout>
          }
        />
        <Route
          path="/package"
          element={
            <UserLayout>
              <Package />
            </UserLayout>
          }
        />
        <Route
          path="/about"
          element={
            <UserLayout>
              <About />
            </UserLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <UserLayout>
              <Contact />
            </UserLayout>
          }
        />
        <Route
          path="/bookings"
          element={
            <UserLayout>
              <Mybooking />
            </UserLayout>
          }
        />

        {/* 🔹 Admin side routes → protected */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin" userType={userType}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Logout */}
        <Route
          path="/logout"
          element={<Navigate to="/login" replace />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
