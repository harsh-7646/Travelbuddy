  import React, { useState } from 'react';
  import './Review.css';
  import { MdDelete, MdThumbUp, MdThumbDown } from 'react-icons/md';

  export const reviewData = [
    { id: 1, user: 'Amit Patel', comment: 'Amazing trip! Highly recommend.', approved: true },
    { id: 2, user: 'Sneha Shah', comment: 'Service was good but can be better.', approved: false },
    { id: 3, user: 'Rahul Mehta', comment: 'Loved the hotel and sightseeing.', approved: true },
    { id: 4, user: 'Priya Iyer', comment: 'Decent experience overall.', approved: false },
    { id: 5, user: 'Jay Joshi', comment: 'Superb arrangements and hospitality!', approved: true },
    { id: 6, user: 'Neha Rathi', comment: 'Not satisfied with transportation.', approved: false },
    { id: 7, user: 'Ravi Kumar', comment: 'Excellent guides and support staff.', approved: true },
    { id: 8, user: 'Tanvi Desai', comment: 'Trip was smooth and hassle-free.', approved: true },
    { id: 9, user: 'Deepak Thakur', comment: 'Room service needs improvement.', approved: false },
    { id: 10, user: 'Komal Verma', comment: 'Loved the beach resort experience.', approved: true },
    { id: 11, user: 'Karan Singh', comment: 'Food quality could be better.', approved: false },
    { id: 12, user: 'Pooja Bhatt', comment: 'Perfect honeymoon package, thank you!', approved: true },
  ];

  const Review = () => {
    const [reviews, setReviews] = useState(reviewData);

    const toggleApproval = (id) => {
      setReviews(reviews.map(r => r.id === id ? { ...r, approved: !r.approved } : r));
    };

    const deleteReview = (id) => {
      setReviews(reviews.filter(r => r.id !== id));
    };

    return (
      <div className="reviews-container">
        <p>
          Total Reviews: {reviews.length} | Approved: {reviews.filter(r => r.approved).length}
        </p>

        <div className="review-list">
          {reviews.map((review) => (
            <div key={review.id} className={`review-card ${review.approved ? 'approved' : ''}`}>
              <h4>{review.user}</h4>
              <p>{review.comment}</p>
              <div className="review-actions">
                <button onClick={() => toggleApproval(review.id)}>
                  {review.approved ? <MdThumbDown title="Disapprove" /> : <MdThumbUp title="Approve" />}
                </button>
                <button onClick={() => deleteReview(review.id)}>
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
