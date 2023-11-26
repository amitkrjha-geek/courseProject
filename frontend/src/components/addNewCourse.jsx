import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const AddNewCourse = ({ createCourseModal, setCreateCourseModal }) => {
  const handleClose = () => {
    setCreateCourseModal(false);
  };

  const [courseId, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [dept, setDept] = useState("");
  const [time, setTime] = useState("");

  const createCourse = () => {
    const data = {
      courseId: courseId,
      name: name,
      teacher: teacher,
      dept: dept,
      time: time,
    };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .post(`http://localhost:5000/api/courses/create`, data, config)
      .then((res) => {
        alert("Course created successfully");
        setCreateCourseModal(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal show={createCourseModal} onHide={handleClose}>
        <Modal.Header className="modal-header">
          <span>Create Course</span>
          <button onClick={handleClose}>X</button>
        </Modal.Header>
        <Modal.Body className="review-modal">
          <input value={courseId} onChange={(e) => setCourseId(e.target.value)} className="my-2" type="text" placeholder="Enter course Id" />
          <input value={name} onChange={(e) => setName(e.target.value)} className="my-2" type="text" placeholder="Enter course Name" />
          <input value={teacher} onChange={(e) => setTeacher(e.target.value)} className="my-2" type="text" placeholder="Enter Teacher Name" />
          <input value={dept} onChange={(e) => setDept(e.target.value)} className="my-2" type="text" placeholder="Enter Dept" />
          <input value={time} onChange={(e) => setTime(e.target.value)} className="my-2" type="text" placeholder="Enter Time(2023-2024)" />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={createCourse}>Submit Review</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewCourse;
