import { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = ({ courses }) => {
  const [text, setText] = useState("");
  const [coursesFiltered, setCoursesFiltered] = useState([]);

  let history = useHistory();

  // Function to update search input and filter courses based on input
  const updateInput = (text) => {
    const filtered = courses.filter((course) => {
      return course.name.includes(text);
    });

    setText(text);
    setCoursesFiltered(filtered);
  };

  // Function to handle click on filtered course and navigate to its details page
  const courseClick = (id) => {
    setCoursesFiltered([]);
    setText("");
    history.push(`/courses/${id}`);
  };

  return (
    <div className="container mt-3">
      <div className="col-md-4 offset-md-4">
        {/* Search input */}
        <input
          className="row"
          type="search"
          id="header-search"
          placeholder="Search for courses"
          name="search"
          value={text}
          onChange={(e) => updateInput(e.target.value)}
        />

        {/* Filtered courses list */}
        <ul className="filtered-list mt-1">
          {coursesFiltered.length > 0 && text ? (
            coursesFiltered.map((course, index) => {
              return (
                <li
                  className="filtered-item"
                  onClick={() => courseClick(course._id)}
                  key={index}
                >
                  {course.courseId} {course.name}
                </li>
              );
            })
          ) : (
            <div className="px-2">{text && <p>No matching keywords</p>}</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Search;
