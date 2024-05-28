const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { route } = require("./userRouter");
const verifyToken = require("../middleware/verifyToken");

router.post("/admin/signup", adminController.adminSignupPost); //admin dignup
router.get("/admin/students", verifyToken, adminController.studentsGet); //students details get
router.post("/admin/addcourse", verifyToken, adminController.coursePost); //add course
router.get("/admin/courselist", verifyToken, adminController.courseGet); //course details
router.get("/admin/editcourse", verifyToken, adminController.editCourseGet); //edit course get
router.put("/admin/editcourse", verifyToken, adminController.editCoursePost); //edti course put ////
router.delete("/admin/deleteCourse", verifyToken, adminController.deleteCourse); //delete course //
router.post("/admintlogin",adminController.loginPost)

module.exports = router;
