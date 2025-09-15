import React, { useState } from "react";
import "./Mybooking.css";
import Footer from "./Footer";
import { FaCheckCircle, FaClock, FaTimesCircle, FaUserFriends, FaMapMarkerAlt, FaMapMarkedAlt } from "react-icons/fa";

const MyBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      packageName: "Bali Adventure",
      destination: "Bali, Indonesia",
      date: "2025-09-12",
      guests: 2,
      price: "₹85,000",
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 2,
      packageName: "Swiss Alps Getaway",
      destination: "Zurich, Switzerland",
      date: "2025-10-05",
      guests: 4,
      price: "₹2,40,000",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
      id: 3,
      packageName: "Maldives Luxury Escape",
      destination: "Male, Maldives",
      date: "2025-11-20",
      guests: 2,
      price: "₹1,50,000",
      status: "Cancelled",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
  ]);

  const handleCancel = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "Cancelled" } : b
      )
    );
    alert("Your booking has been cancelled.");
  };

  const getStatus = (status) => {
    if (status === "Confirmed") return { icon: <FaCheckCircle />, class: "confirmed" };
    if (status === "Pending") return { icon: <FaClock />, class: "pending" };
    return { icon: <FaTimesCircle />, class: "cancelled" };
  };

  return (
    <>
      <div className="bookings-page">
        {/* Header */}
        <div className="bookings-header gradient-bg">
          <div className="header-card">
            <div className="header-icon">
              <FaMapMarkedAlt />
            </div>
            <div className="header-text">
              <h1>My Travel Timeline</h1>
              <p>Follow your bookings as a journey</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {bookings.map((b, i) => {
            const status = getStatus(b.status);
            return (
              <div key={b.id} className="timeline-item" style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="timeline-dot" style={{ backgroundImage: `url(${b.image})` }}></div>
                <div className="timeline-content">
                  <span className={`status-tag ${status.class}`}>
                    {status.icon} {b.status}
                  </span>
                  <h2>{b.packageName}</h2>
                  <p className="destination"><FaMapMarkerAlt /> {b.destination}</p>
                  <p><strong>Date:</strong> {b.date}</p>
                  <p><FaUserFriends /> {b.guests} Guests</p>
                  <p className="price">{b.price}</p>
                  {b.status !== "Cancelled" ? (
                    <button className="cancel-btn" onClick={() => handleCancel(b.id)}>Cancel</button>
                  ) : (
                    <span className="no-action">—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;
