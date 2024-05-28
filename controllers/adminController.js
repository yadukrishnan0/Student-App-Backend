const validation = require("../utilities/validation");
const bcrypt = require("bcrypt");
const adminModel = require("../models/adminSchema");
const userModel = require("../models/usersSchema");
const courseModel =require('../models/courseSchema')
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

  coursePost:async(req,res)=>{
    try{
      console.log(req.body);
      const{Coursename,fee, Description,teachername}=req.body
      const course =new courseModel({
        Coursename,
        fee,
        Description,
        teachername
      })
      await course.save();

    }catch(err){
      console.log('course post',err)
    }
  }
};
