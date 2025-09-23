import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import "./Review.css";

const token = "dPEwRulbwf8Ktfd3";
const API_URL = "https://generateapi.techsnack.online/api/review";

const Review = () => {
  const [reviews, setReviews] = useState([]);


  const fetchData = () => {
    axios
      .get(API_URL, { headers: { Authorization: token } })
      .then((res) => {
        const apiData = res.data.Data || res.data.data || [];
        setReviews(apiData);
      })
      .catch(() => setReviews([]));
  };

  useEffect(() => {
    fetchData();
  }, []);


  const deleteReview = (id) => {
    if (window.confirm("Delete this review?")) {
      axios
        .delete(`${API_URL}/${id}`, { headers: { Authorization: token } })
        .then(fetchData)
        .catch((err) => console.error("Delete failed:", err));
    }
  };

  return (
    <div className="reviews-container">
      <p>Total Reviews: {reviews.length}</p>

      <div className="review-list">
        {reviews.map((review) => (
          <div key={review._id} className="review-card">
            <h4>{review.name}</h4>
            <p>{review.message}</p>
            <small>{review.email}</small>
            <div className="review-actions">
              <button onClick={() => deleteReview(review._id)}>
                <MdDelete title="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
