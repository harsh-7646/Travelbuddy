import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { MdEdit, MdDelete } from 'react-icons/md';
import './Hotelmanagement.css';

export const hotelData = [
  { id: 1, name: 'Ocean Paradise', location: 'Goa', price: 4000, amenities: 'WiFi, Pool', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAxTLvchIw9KyFJK0aSs7SyAJRRRTY_WlanA&s' },
  { id: 2, name: 'Hilltop Resort', location: 'Shimla', price: 3500, amenities: 'Breakfast, Parking', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ1rG8G2YxNUOLis_Zur5KgPEGrjZ96taedQ&s' },
  { id: 3, name: 'Desert Pearl', location: 'Jaisalmer', price: 3000, amenities: 'Cultural Show, Jeep Safari', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqDn1Njm5GgQMqaIuJVlCVnFr1NklwKzfaxg&s' },
  { id: 4, name: 'Snowy Heights', location: 'Manali', price: 4500, amenities: 'Heater, Snow Activities', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2xIrcihiIl1JvGecnEyxHghhzFxNQLWiw3w&s' },
  { id: 5, name: 'Lakeview Bliss', location: 'Udaipur', price: 3700, amenities: 'Lake View, Restaurant', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSySKBC64G9m5qcjab-TSBtJVvVS2T2rX4OrA&s' },
];

const HotelManagement = () => {
  const [hotels, setHotels] = useState(hotelData);
  const [editingHotel, setEditingHotel] = useState(null);

  const handleHotelSubmit = (values, { resetForm }) => {
    if (editingHotel) {
      setHotels(hotels.map(h => (h.id === editingHotel.id ? { ...values, id: editingHotel.id } : h)));
      setEditingHotel(null);
    } else {
      setHotels([...hotels, { ...values, id: Date.now() }]);
    }
    resetForm();
  };

  const handleHotelEdit = (hotel) => setEditingHotel(hotel);
  const handleHotelDelete = (id) => setHotels(hotels.filter(h => h.id !== id));

  return (
    <div className="packages-admin">
      <Formik
        initialValues={editingHotel || { name: '', location: '', price: '', amenities: '', image: '' }}
        enableReinitialize
        onSubmit={handleHotelSubmit}
      >
        <Form className="package-form">
          <Field name="name" placeholder="Hotel Name" required />
          <Field name="location" placeholder="Location" required />
          <Field name="price" type="number" placeholder="Price" required />
          <Field name="amenities" placeholder="Amenities" required />
          <Field name="image" placeholder="Image URL" required />
          <button type="submit">{editingHotel ? 'Update' : 'Add'} Hotel</button>
        </Form>
      </Formik>

      {/* Hotels Cards */}
      <div className="package-cards">
        {hotels.map(hotel => (
          <div key={hotel.id} className="package-card">
            <img src={hotel.image} alt={hotel.name} />
            <div className="card-body">
              <h3>{hotel.name}</h3>
              <p><b>Location:</b> {hotel.location}</p>
              <p><b>Price:</b> ₹{hotel.price}</p>
              <p><b>Amenities:</b> {hotel.amenities}</p>
            </div>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleHotelEdit(hotel)}><MdEdit /></button>
              <button className="delete-btn" onClick={() => handleHotelDelete(hotel.id)}><MdDelete /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelManagement;
