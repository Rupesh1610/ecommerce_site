import React from "react";
import "./reviewCard.css";
import StarIcon from "@mui/icons-material/Star";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <div>
        <img src={profilePng} alt="user" />
        <p>{review.name}</p>
      </div>
      <div>
        <div className="rating">
          {review.rating}
          <StarIcon sx={{ color: "white" }} />
        </div>
        <span> {review.comment}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
