// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import "./Header.css";


// import Destinationuser from './Destinationuser';
// import Package from './Package';
// import About from './About';
// import Contact from './Contact';
// import Mybooking from './Mybooking';
// import Login from '../Login';
// import Home1 from './Home1';

// const Header = () => {
//   return (
//     <header className="user-header">
//       <div className="logo">Travel Buddy</div>

//       <input type="checkbox" id="menu-toggle" />

//       <label htmlFor="menu-toggle" className="menu-btn">
//         <span></span>
//         <span></span>
//         <span></span>
//       </label>

//       <nav className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/destinations">Destinations</Link>
//         <Link to="/Package">Package</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//         <Link to="/bookings">My Bookings</Link>
//         <Link to="/logout">Logout</Link>
//       </nav>
//     </header>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home1 />} />
//         <Route path="/destinations" element={<Destinationuser />} />
//         <Route path="/Package" element={<Package />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/bookings" element={<Mybooking />} />
//         <Route path="/logout" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;










// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="user-header">
      <div className="logo">Travel Buddy</div>

      {/* Toggle for mobile */}
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-btn">
        <span></span>
        <span></span>
        <span></span>
      </label>

      {/* Navigation links */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/package">Package</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;


