const express =require('express')
 const router =express.Router();

 const useController =require('./../controllers/userControlller');
const userControlller = require('./../controllers/userControlller');
 router.post('/signup',userControlller.userSignupPost)
 module.exports =router;