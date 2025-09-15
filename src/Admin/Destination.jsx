import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import "./Destination.css";

const token = "RTzcbSNYBybOqY1f";
const API_URL = "https://generateapi.techsnack.online/api/destination";

// Default destinations
const defaultDestinations = [
  {
    _id: "default-1",
    name: "Bali",
    region: "Asia",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Tropical paradise with stunning beaches and culture.",
  },
  {
    _id: "default-2",
    name: "Paris",
    region: "Europe",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    description: "The city of lights and romance.",
  },
];

const regions = ["Asia", "Europe", "Africa", "America", "Australia"];

function Destination() {
  const [form, setForm] = useState({
    name: "",
    region: "",
    description: "",
    imageFile: null,
  });
  const [list, setList] = useState(defaultDestinations);
  const [editingId, setEditingId] = useState(null);

  // Fetch API data + merge defaults
  const fetchData = () => {
    axios
      .get(API_URL, { headers: { Authorization: token } })
      .then((res) => {
        const apiData = res.data.Data || [];
        setList([...defaultDestinations, ...apiData]);
      })
      .catch(() => {
        setList(defaultDestinations);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // File upload
  const handleFileUpload = (e) => {
    setForm({ ...form, imageFile: e.target.files[0] });
  };

  // Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.region || !form.imageFile) {
      alert("Please fill all Details!");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("region", form.region);
    formData.append("description", form.description);
    formData.append("image", form.imageFile);

    if (editingId) {
      if (editingId.startsWith("default-")) {
        setList((prev) =>
          prev.map((item) =>
            item._id === editingId
              ? {
                ...item,
                name: form.name,
                region: form.region,
                description: form.description,
                image: form.imageFile
                  ? URL.createObjectURL(form.imageFile)
                  : item.image,
              }
              : item
          )
        );
      } else {
        axios
          .patch(`${API_URL}/${editingId}`, formData, {
            headers: { Authorization: token, "Content-Type": "multipart/form-data" },
          })
          .then(fetchData);
      }
      setEditingId(null);
    } else {
      axios
        .post(API_URL, formData, {
          headers: { Authorization: token, "Content-Type": "multipart/form-data" },
        })
        .then(fetchData);
    }

    setForm({ name: "", region: "", description: "", imageFile: null });
  };

  // Edit
  const handleEdit = (dest) => {
    setForm({
      name: dest.name,
      region: dest.region,
      description: dest.description,
      imageFile: null,
    });
    setEditingId(dest._id);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Delete this destination?")) {
      if (id.startsWith("default-")) {
        setList((prev) => prev.filter((item) => item._id !== id));
      } else {
        axios
          .delete(`${API_URL}/${id}`, { headers: { Authorization: token } })
          .then(fetchData);
      }
    }
  };

  return (
    <div className="destination-admin">
      {/* Form */}
      <form onSubmit={handleSubmit} className="destination-form">
        <input
          type="text"
          placeholder="Destination Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          value={form.region}
          onChange={(e) => setForm({ ...form, region: e.target.value })}
        >
          <option value="">Select Region</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">{editingId ? "Update" : "Add"} Destination</button>
      </form>

      {/* Cards Grid */}
      <div className="destination-cards">
        {list.map((dest) => (
          <div key={dest._id} className="destination-card">
            <img src={dest.image} alt={dest.name} />
            <h3>{dest.name}</h3>
            <p><b>Region:</b> {dest.region}</p>
            <p>{dest.description}</p>
            <div className="card-actions1">
              <button onClick={() => handleEdit(dest)} className="edit-btn">
                <MdEdit />
              </button>
              <button onClick={() => handleDelete(dest._id)} className="delete-btn">
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destination;
