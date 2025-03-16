const Student = require("../models/Student");
const upload = require("../middleware/uploadimagemiddleware");

const createStudent = async (req, res) => {
    try {
      const { sid, name, email, age, status } = req.body;
      const image = req.file ? req.file.path : ""; 
      const validStatus = status === "Inactive" ? "Inactive" : "Active";
  
      
      const existStudent = await Student.findOne({ sid });
      if (existStudent) {
        return res.status(400).json({ message: "Student with this SID already exists" });
      }
  
      
      if (!sid || !name || !email || !age || !status) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      
      const student = new Student({ sid, name, email, age, image, status: validStatus });
      await student.save();
      res.status(201).json({ message: "Student created", student });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

const getStudent = async (req, res)=>{

    try {

        const student = await Student.find()
        res.status(200).json(student);
        
    } 
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }

}

const getStudentById = async (req, res)=>{
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const updateStudent = async (req, res) => {
    try {
      const { sid } = req.params;
      const { name, email, age, status } = req.body;
      const image = req.file ? req.file.path : undefined;
  
     
      const existingStudent = await Student.findOne({ sid });
      if (!existingStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
     
      if (name) existingStudent.name = name;
      if (email) existingStudent.email = email;
      if (age) existingStudent.age = age;
      if (status && ["Active", "Inactive"].includes(status)) existingStudent.status = status;
      if (image) existingStudent.image = image;
  
     
      await existingStudent.save();
      res.status(200).json({ message: "Student updated", student: existingStudent });
    } catch (error) {
      console.error("Error updating student:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
const deleteStudent = async (req, res)=>{
    const { sid } = req.params;
    try {
        const student = await Student.findOneAndDelete({sid});
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = {createStudent, getStudent, getStudentById, updateStudent, deleteStudent}

