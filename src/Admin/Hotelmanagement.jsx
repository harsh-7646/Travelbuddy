import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import "./Hotelmanagement.css";

const token = "ZnXgKXc7OLqLlVn5";
const API_URL = "https://generateapi.techsnack.online/api/hotel";

function Hotelmanagement() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
    amenities: "",
    imageFile: null,
  });
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch Hotels
  const fetchData = () => {
    axios
      .get(API_URL, { headers: { Authorization: token } })
      .then((res) => {
        const apiData = res.data.Data || [];
        setList(apiData);
      })
      .catch((err) => {
        console.error("Error fetching hotels:", err);
        setList([]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // File Upload
  const handleFileUpload = (e) => {
    setForm({ ...form, imageFile: e.target.files[0] });
  };

  // Add / Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.price || !form.imageFile) {
      alert("Please fill all details!");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("location", form.location);
    formData.append("price", form.price);
    formData.append("amenities", form.amenities);
    formData.append("image", form.imageFile);

    if (editingId) {
      axios
        .patch(`${API_URL}/${editingId}`, formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(fetchData)
        .catch((err) => console.error("Error updating hotel:", err));
      setEditingId(null);
    } else {
      axios
        .post(API_URL, formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(fetchData)
        .catch((err) => console.error("Error saving hotel:", err));
    }

    setForm({
      name: "",
      location: "",
      price: "",
      amenities: "",
      imageFile: null,
    });
  };

  // Edit
  const handleEdit = (hotel) => {
    setForm({
      name: hotel.name,
      location: hotel.location,
      price: hotel.price,
      amenities: hotel.amenities,
      imageFile: null,
    });
    setEditingId(hotel._id);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Delete this hotel?")) {
      axios
        .delete(`${API_URL}/${id}`, { headers: { Authorization: token } })
        .then(fetchData)
        .catch((err) => console.error("Error deleting hotel:", err));
    }
  };

  return (
    <div className="hotel-admin">
      {/* Form */}
      <form onSubmit={handleSubmit} className="hotel-form">
        <input
          type="text"
          placeholder="Hotel Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <textarea
          placeholder="Amenities"
          value={form.amenities}
          onChange={(e) => setForm({ ...form, amenities: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <button type="submit">{editingId ? "Update" : "Add"} Hotel</button>
      </form>

      {/* Cards */}
      <div className="hotel-cards">
        {list.map((hotel) => (
          <div className="hotel-card" key={hotel._id}>
  <img src={hotel.image} alt={hotel.name} />
  
  <div className="card-body">
    <h3>{hotel.name}</h3>
    <p><span>Location:</span> {hotel.location}</p>
    <p><span>Price:</span> ₹{hotel.price}</p>
    <p>{hotel.amenities}</p>
  </div>

  {/* Note the class name must be card-actions to match CSS */}
  <div className="card-actions">
    <button
      onClick={() => handleEdit(hotel)}
      className="edit-btn"
    >
      <MdEdit />
    </button>
    <button
      onClick={() => handleDelete(hotel._id)}
      className="delete-btn"
    >
      <MdDelete />
    </button>
  </div>
</div>

        ))}
      </div>
    </div>
  );
}

export default Hotelmanagement;
