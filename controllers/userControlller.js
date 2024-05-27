
const validation=require('../utilities/validation')
const bcrypt = require("bcrypt");
const UsersModel=require('../models/usersSchema')
module.exports = {
  userSignupPost: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const exisistUser = await UsersModel.findOne({ email: email });
        if (exisistUser) {
          return res.status(400).json("user already signuped");
        } else if (
          !validation.validationFields([
            name,
            email,
            password,
            confirmPassword ,
          ])
        ) {
          return res.status(400).json("please fill the form");
        } else if (!validation.passwordValidation(password)) {
          return res.status(400).json("invalid password format");
        } else if (!validation.emailValidation(email)) {
          return res.status(400).json("invalid email format");
        } else if (!validation.ConfirmPassword(password,confirmPassword )) {
          return res
            .status(400)
            .json("password and confirmpassword is not match");
        }else{
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
};
