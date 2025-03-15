// routes/StudentRoutes.js
const express = require("express");
const { createStudent,  getStudent, getStudentById, updateStudent, deleteStudent } = require("../controllers/StudentController");
const verifyToken = require("../middleware/authmiddleware");

const router = express.Router();

router.use(verifyToken);


router.post("/", createStudent);
router.get("/", getStudent);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);


module.exports = router;

