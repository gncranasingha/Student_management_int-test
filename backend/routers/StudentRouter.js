const express = require("express");
const { createStudent, getStudent, getStudentById, updateStudent, deleteStudent } = require("../controllers/StudentController");
const upload = require("../middleware/uploadimagemiddleware");

const router = express.Router();


router.post("/", upload.single("image"), createStudent);


router.get("/", getStudent);
router.get("/:sid", getStudentById);
router.put("/:sid", upload.single("image"), updateStudent);
router.delete("/:sid", deleteStudent);

module.exports = router;