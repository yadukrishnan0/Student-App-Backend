const express =require('express')
 const router =express.Router();
 const verifyToken = require("../middleware/verifyToken");

 const useController =require('./../controllers/userControlller');
const userControlller = require('./../controllers/userControlller');
 router.post('/signup',userControlller.userSignupPost)
 router.post ('/studentlogin',userControlller.loginPost)
 module.exports =router;