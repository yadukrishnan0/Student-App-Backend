const validation = require("../utilities/validation");
const bcrypt = require("bcrypt");
const adminModel = require("../models/adminSchema");
const userModel = require("../models/usersSchema");
const courseModel = require("../models/courseSchema");
module.exports = {
  adminSignupPost: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const exisistUser = await adminModel.findOne({ email: email });
      if (exisistUser) {
        return res.status(400).json("user already signuped");
      } else if (
        !validation.validationFields([name, email, password, confirmPassword])
      ) {
        return res.status(400).json("please fill the form");
      } else if (!validation.passwordValidation(password)) {
        return res.status(400).json("invalid password format");
      } else if (!validation.emailValidation(email)) {
        return res.status(400).json("invalid email format");
      } else if (!validation.ConfirmPassword(password, confirmPassword)) {
        return res
          .status(400)
          .json("password and confirmpassword is not match");
      } else {
        //password hashing
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new adminModel({
          name,
          email,
          password: hashedPassword,
        });
        await newUser.save();
        res
          .status(200)
          .json({ success: true, message: "user admin success is ture" });
      }
    } catch (Err) {
      console.log(" adminSignupPost", Err);
    }
  },
  studentsGet: async (req, res) => {
    try {
      const studentsDetails = await userModel.find({});
      res.status(200).json({ success: true, studentsDetails: studentsDetails });
    } catch (err) {
      console.log("students get", err);
    }
  },

  coursePost: async (req, res) => {
    try {
      console.log(req.body);
      const { Coursename, fee, Description, teachername } = req.body;
      const course = new courseModel({
        Coursename,
        fee,
        Description,
        teachername,
      });
      await course.save();
      res.status(200).json({ success: true });
    } catch (err) {
      console.log("course post", err);
    }
  },
  courseGet: async (req, res) => {
    try {
      const courseData = await courseModel.find({});
      res.status(200).json({ success: true, courseData: courseData });
    } catch (err) {
      console.log("courseGet", err);
      res.status(400).json({ success: false });
    }
  },
  editCourseGet: async (req, res) => {
    try {
      const id = req.query.courseId;
      const courseData = await courseModel.findOne({ _id: id });
      res.status(200).json({ success: true, courseData: courseData });
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false });
    }
  },
  editCoursePost: async (req, res) => {
    try {
      console.log("editeeee ciomeene");
      const id = req.query.courseId;
      console.log(id);
      const { Coursename, Description, fee, teachername } = req.body;
      const update = await courseModel.updateOne(
        { _id: id },
        {
          $set: {
            Coursename: Coursename,
            Description: Description,
            fee: fee,
            teachername: teachername,
          },
        },
        { new: true }
      );

      console.log(update);

      res.status(200).json({ success: true });
    } catch (err) {
      console.log(" editCoursePost", err);
    }
  },

  //deleting course
  deleteCourse: async (req, res) => {
    try {
      const id = req.query.courseId;
      await courseModel.deleteOne({ _id: id });
      res.status(200).json({ success: true });
    } catch (err) {
      console.log("deleteCourse", err);
    }
  },

  loginPost:async(req,res)=>{
    try {
      const { email, password } = req.body;
      const userExist = await  adminModel.findOne({ email: email });
      const passmatch = await bcrypt.compare(req.body.password, userExist.password);
      if (!userExist) {
        res
          .status(400)
          .json({ success: false, message: "please create account" });
      } else if (userExist && !passmatch) {
        res.status(400).json({ success: false, message: "incorrect password" });
      } else if (userExist && passmatch) {
        const payload = {
          userId: userExist._id,
          userName: userExist.userName,
          role: "user",
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ token });
      }
    } catch (err) {
      console.log("loginpost", err);
    }
  },
};
