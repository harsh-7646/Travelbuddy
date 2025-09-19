import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import "./Package.css";

const token = "K4OS0XNqsLR7enT6";
const API_URL = "https://generateapi.techsnack.online/api/package";

function PackagesManagement() {
  const [form, setForm] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    imageFile: null,
  });
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch packages from API
  const fetchData = () => {
    axios
      .get(API_URL, { headers: { Authorization: token } })
      .then((res) => {
        const apiData = res.data.Data || res.data.data || [];
        setList(apiData);
      })
      .catch(() => setList([]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileUpload = (e) => setForm({ ...form, imageFile: e.target.files[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.destination || !form.duration || !form.price) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("destination", form.destination);
    formData.append("duration", form.duration);
    formData.append("price", form.price);
    if (form.imageFile) formData.append("image", form.imageFile);

    if (editingId) {
      // Update existing package
      axios
        .patch(`${API_URL}/${editingId}`, formData, {
          headers: { Authorization: token, "Content-Type": "multipart/form-data" },
        })
        .then(fetchData);
      setEditingId(null);
    } else {
      // Add new package
      axios
        .post(API_URL, formData, {
          headers: { Authorization: token, "Content-Type": "multipart/form-data" },
        })
        .then(fetchData);
    }

    setForm({ name: "", destination: "", duration: "", price: "", imageFile: null });
  };

  const handleEdit = (pkg) => {
    setForm({
      name: pkg.name,
      destination: pkg.destination,
      duration: pkg.duration,
      price: pkg.price,
      imageFile: null,
    });
    setEditingId(pkg._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this package?")) {
      axios.delete(`${API_URL}/${id}`, { headers: { Authorization: token } }).then(fetchData);
    }
  };

  return (
    <div className="packages-admin">
      {/* ===== Form ===== */}
      <form onSubmit={handleSubmit} className="package-form">
        <input
          type="text"
          placeholder="Package Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Destination"
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <button type="submit">{editingId ? "Update" : "Add"} Package</button>
      </form>

      {/* ===== Card View ===== */}
      <div className="package-cards">
        {list.map((pkg) => (
          <div key={pkg._id} className="package-card">
            <img src={pkg.image} alt={pkg.name} />
            <div className="card-body">
              <h3>{pkg.name}</h3>
              <p><b>Destination:</b> {pkg.destination}</p>
              <p><b>Duration:</b> {pkg.duration}</p>
              <p><b>Price:</b> ₹{pkg.price}</p>
              <div className="card-actions">
                <button onClick={() => handleEdit(pkg)} className="edit-btn"><MdEdit /></button>
                <button onClick={() => handleDelete(pkg._id)} className="delete-btn"><MdDelete /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PackagesManagement;
