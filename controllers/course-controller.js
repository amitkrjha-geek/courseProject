const Joi = require("joi");
const Course = require("../models/course");
const mongoose = require("mongoose");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.json({ message: err });
  }
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "reviews",
          let: {
            id: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$course", "$$id"],
                },
              },
            },
          ],
          as: "reviews",
        },
      },
      {
        $addFields: {
          reviews: "$reviews",
        },
      },
    ]);

    res.json(course[0]);
  } catch (err) {
    res.status(404).json({ error: "Not found" });
  }
};

const postCourse = async (req, res) => {
  const courses = req.body.courses;
  try {
    const result = await Course.insertMany(courses);
    // console.log(result)
    res.json({ message: `Insert ${result.length} documents success` });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const createCourse = async (req, res) => {
  const courseSchema = Joi.object({
    courseId: Joi.string().required(),
    name: Joi.string().required(),
    teacher: Joi.string().required(),
    dept: Joi.string().required(),
    time: Joi.string().required(),
  });

  const { error } = courseSchema.validate(req.body);
  if (error) {
    next(error);
  }

  const { courseId, name, teacher, dept, time } = req.body;
  const doc = await Course.findOne({ courseId, name, teacher, dept, time });
  if (doc) {
    return res.status(404).json({ message: "THis course already exist" });
  }
  Course.create({courseId, name, teacher, dept, time}).then(() => {
    return res.status(201).json({ message: "Course created successfully" });
  }).catch(err => {
    console.log(err.message)
    return res.status(500).json({ message: err.message});
  })
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  postCourse,
  createCourse
};
