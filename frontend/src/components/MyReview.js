import { useState, useEffect } from "react";
import reviewService from "../services/review-service";
import { Link } from "react-router-dom";

const MyReview = () => {
  // State to store user reviews and loading status
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user reviews when the component mounts
  useEffect(() => {
    reviewService
      .getUserReview()
      .then((res) => {
        console.log(res)
        setReviews(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : // Display user reviews if available, otherwise show a message
      reviews.length > 0 ? (
        <ul className="list-group">
          {reviews.map((review, index) => (
            <li className="list-group-item" key={index}>
              <strong>
                {review.course.courseId} 
                {review.course.name}
              </strong>
              <p>{review.review}</p>

              {/* Link to edit the review */}
              <Link
                to={{
                  pathname: 
                  `/courses/${review.course._id}/review`
                  
                  ,
                  state: {
                    currentReview: review,
                  },
                }}
                className="btn btn-primary col-4 mx-1 mb-1"
              >
                Edit Review
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>No reviews</div>
      )}
    </div>
  );
};

export default MyReview;
