const validation = require("../utilities/validation");
const bcrypt = require("bcrypt");
const UsersModel = require("../models/usersSchema");
const usersModel = require("../models/usersSchema");
const jwt = require("jsonwebtoken");
module.exports = {
  //user signup
  userSignupPost: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const exisistUser = await UsersModel.findOne({ email: email });
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UsersModel({
          name,
          email,
          password: hashedPassword,
        });
        await newUser.save();
      }
    } catch (Err) {
      console.log(Err);
    }
  },
  loginPost: async (req, res) => {
    
    try {
      const { email, password } = req.body;
      const userExist = await usersModel.findOne({ email: email });
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
