import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerReviewDetail = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/customerreviews/${id}`);
        console.log(response.data); // Log response data for debugging
        setReview(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching review:", error);
        setLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (!review) return <div>No review found</div>;

  return (
    <div className="container-fluid">
      <div className="card">
        <img src={`http://localhost:5000${review.imageUrl}`} className="card-img-top" alt="Review" />
        <div className="card-body">
          <h5 className="card-title">Review</h5>
          <p className="card-text">{review.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewDetail;
