const express =require('express')
 const router =express.Router();
const adminController=require('../controllers/adminController');
const { route } = require('./userRouter');
router.post('/admin/signup',adminController.adminSignupPost) //admin dignup
router.get('/admin/students',adminController.studentsGet)//students details get
router.post('/admin/addcourse',adminController.coursePost)//add course
 module.exports =router;