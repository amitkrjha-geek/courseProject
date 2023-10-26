import React, { useState, useEffect } from 'react';
import courseService from '../services/course-service';

const Course = (props) =>  {

	const [isLoading, setIsLoading] = useState(true);
	const [course, setCourse] = useState({}); 
	const [error, setError] = useState("");

	const getCourse = (id) => {
		courseService.getSingleCourse(id)
			.then(res => {
				// console.log(res.data);
				setCourse(res.data);
				setIsLoading(false);
			})
			.catch(err => {
				setError("Course is not found")
				setIsLoading(false);
				console.log(err);
			})
	}

	useEffect(() => {
		getCourse(props.match.params.id);
			
	}, [props.match.params.id]);

	return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          {error ? (
            <span>{error}</span>
          ) : (
            <div className="mt-3">
              <h4>
                {course.courseId} {course.name}
              </h4>
              {/* <Link to={`/courses/${props.match.params.id}/review`} className="btn btn-success">Add new experience</Link> */}
              <h5 className="mt-3">Course experience</h5>
              <ul className="list-group">
                {course.reviews.length > 0 ? (
                  course.reviews.map((review, index) => {
                    return (
                      <li className="list-group-item mt-2" key={index}>
                        <p>{review.review}</p>
                      </li>
                    );
                  })
                ) : (
                  <div className="col-sm-4">
                    <p>No idea yet</p>
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Course;