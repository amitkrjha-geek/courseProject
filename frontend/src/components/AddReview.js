import { useState } from 'react';
import { Link } from 'react-router-dom';
import reviewService from '../services/review-service';

const AddReview = (props) => {

	let initialReviewState = "";
	let editing = false;
	// const user = authSevice.getCurrentUser();
	
	if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.review
	}
	
	const [ submitted, setSubmitted] = useState(false);
	const [ review, setReview] = useState(initialReviewState);

	const handleInputChange = (event) =>{
		setReview(event.target.value);
	}

	const saveReview = () =>{
		let data  = {
			courseId: props.match.params.id,
			// userId: user.userId,
			review: review,
		};

		if(editing){
			data.reviewId = props.location.state.currentReview._id;
			reviewService.updateReview(data)
				.then(res => {
					setSubmitted(true);
				})
				.catch(err => {
					console.log(err);
				})
		}
		else{
			reviewService.createReview(data)
				.then(res => {
					setSubmitted(true);
				})
				.catch(err => {
					console.log(err);
				})
		}

		

	}
	
	return (
    <div>
      <div>
        {submitted ? (
          <div className="text-center mt-3">
            <h4>Sent successfully</h4>
            <Link
              to={`/courses/${props.match.params.id}`}
              className="btn btn-success"
            >
              Back to course
            </Link>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">
                {editing ? "Revise" : "New"}Experience
              </label>
              <textarea
                name="text"
                id="text"
                cols="30"
                rows="5"
                required
                className="form-control mt-3"
                value={review}
                placeholder="Class format,Class requirements,Learning content"
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={saveReview}
              className="btn btn-success mt-3 float-end"
            >
              send out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddReview;