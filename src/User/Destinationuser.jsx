import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Destinationuser.css";
import Footer from "./Footer";

const token = "RTzcbSNYBybOqY1f"; 
const API_URL = "https://generateapi.techsnack.online/api/destination";

// Default fallback
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

const DestinationUser = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: token },
    });
    const apiData = res.data?.Data || [];

    // Always include default + API data together
    setList([...defaultDestinations, ...apiData]);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    setList(defaultDestinations);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="destinations-page">
        <div className="page-header">
          <h1>Explore Destinations</h1>
          <p>Find your perfect getaway from around the world</p>
        </div>

        {loading ? (
          <p className="loading">Loading destinations...</p>
        ) : (
          <div className="destinations-grid">
            {list.length > 0 ? (
              list.map((dest) => (
                <div key={dest._id || dest.name} className="destination-card">
                  <img src={dest.image} alt={dest.name} />
                  <div className="card-content">
                    <h3>{dest.name}</h3>
                    <p className="region">{dest.region}</p>
                    <p>{dest.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">No destinations found.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DestinationUser;
