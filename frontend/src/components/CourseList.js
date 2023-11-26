import { useHistory } from 'react-router-dom';
import Search from './search';
import NewReview from './NewReview';
import { useState } from 'react';
import AddNewCourse from './addNewCourse';
const CourseList = ({courses}) => {
  const [createCourseModal,setCreateCourseModal] = useState(false)

  const history = useHistory();
  console.log(courses)
  
  return ( 
    <div>
      {createCourseModal && <AddNewCourse createCourseModal={createCourseModal} setCreateCourseModal={setCreateCourseModal}/>}
      <Search courses={courses}/>
      <NewReview courses={courses}/>
      <button onClick={()=>{
        console.log("first")
        setCreateCourseModal(true)}}>Add Course</button>
      <div className="list-group mt-3">
        
      {
        courses.map((course) => {
          return (
            <li
              onClick={() => history.push(`/courses/${course._id}`)}
              className="list-group-item course-item"
              key={course._id}
            >
              <strong>
                {course.courseId} {course.name}
              </strong>
              <p>
                {course.dept} - {course.teacher} - {course.time}
              </p>
              {/* <Link to={`/courses/${course._id}`} className="btn btn-primary ">View experience</Link>  */}
            </li>
          );
        })
      }

      

        
      </div>
    </div>
    
  );
}

export default CourseList;