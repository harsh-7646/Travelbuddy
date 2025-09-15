import React, { useState } from 'react';
import './Booking.css';

export const bookingData = [
  { id: 1, customer: 'Ravi Sharma', packageName: 'Goa Beach Delight', date: '2025-07-20', status: 'Pending', payment: 'Unpaid' },
  { id: 2, customer: 'Anjali Patel', packageName: 'Manali Adventure', date: '2025-07-25', status: 'Confirmed', payment: 'Paid' },
  { id: 3, customer: 'John Doe', packageName: 'Dubai Desert Tour', date: '2025-07-22', status: 'Cancelled', payment: 'Refunded' },
  { id: 4, customer: 'Priya Mehta', packageName: 'Paris Explorer', date: '2025-08-01', status: 'Confirmed', payment: 'Paid' },
  { id: 5, customer: 'Nikhil Shah', packageName: 'Thailand Getaway', date: '2025-07-28', status: 'Pending', payment: 'Unpaid' },
  { id: 6, customer: 'Meera Joshi', packageName: 'Kerala Backwaters', date: '2025-07-30', status: 'Confirmed', payment: 'Paid' },
  { id: 7, customer: 'Vikram Soni', packageName: 'Leh Ladakh Ride', date: '2025-08-05', status: 'Pending', payment: 'Unpaid' },
  { id: 8, customer: 'Sneha Desai', packageName: 'Andaman Islands', date: '2025-07-29', status: 'Confirmed', payment: 'Paid' },
  { id: 9, customer: 'David Lee', packageName: 'Singapore Tour', date: '2025-07-27', status: 'Cancelled', payment: 'Refunded' },
  { id: 10, customer: 'Karan Verma', packageName: 'New York Highlights', date: '2025-08-02', status: 'Confirmed', payment: 'Paid' },
];

const Bookings = () => {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filteredBookings =
    filter === 'All' ? bookingData : bookingData.filter(b => b.status === filter);

  return (
    <div className="booking-section">
      {/* Filter */}
      <div className="booking-filter">
        <label>Status:</label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Cards */}
      <div className="booking-cards-container">
        {filteredBookings.map((b, i) => (
          <div key={b.id} className={`booking-card booking-${b.status.toLowerCase()}`}>
            <div className="booking-card-header">
              <span className="booking-card-id">#{i + 1}</span>
              <span className={`booking-payment ${b.payment.toLowerCase()}`}>{b.payment}</span>
            </div>
            <div className="booking-card-body">
              <p><strong>Customer:</strong> {b.customer}</p>
              <p><strong>Package:</strong> {b.packageName}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Status:</strong> {b.status}</p>
            </div>
            <button className="booking-details-btn" onClick={() => setSelected(b)}>Details</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="booking-modal-overlay" onClick={() => setSelected(null)}>
          <div className="booking-modal-content" onClick={e => e.stopPropagation()}>
            <h3>Booking Details</h3>
            <p><strong>Customer:</strong> {selected.customer}</p>
            <p><strong>Package:</strong> {selected.packageName}</p>
            <p><strong>Date:</strong> {selected.date}</p>
            <p><strong>Status:</strong> {selected.status}</p>
            <p><strong>Payment:</strong> {selected.payment}</p>
            <p><strong>Email:</strong> example@mail.com</p>
            <p><strong>Phone:</strong> +91-9876543210</p>
            <p><strong>Address:</strong> Ahmedabad, Gujarat</p>
            <button className="booking-modal-close" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
