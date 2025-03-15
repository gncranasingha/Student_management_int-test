const Student = require("../models/Student");
const upload = require("../middleware/uploadimagemiddleware");

const createStudent = async (req , res) =>{

    upload.single("image")
    const { sid ,name , email, age, status } = req.body;
    const image = req.file ? req.file.path : "";
    const validStatus = status === "Inactive" ? "Inactive" : "Active";

    try {
         const existStudent = await Student.findOne({sid})
        
                if(existStudent){
                    return(
                        res.status(400).json({message : "User Already exists"})
                    )
                }

        const student = new Student({ 
            sid,
            name, 
            email, 
            age, 
            image,
            status: validStatus 
          });
    
          await student.save();
          res.status(201).json({ message: "Student created", student });
        
    }
     catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

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

const updateStudent = async (req, res)=>{
    
    upload.single("image")
    const { id } = req.params;
    const {sid, name, email, age, status } = req.body; 
    const image = req.file ? req.file.path : undefined;

    try {
        
        const existingStudent = await Student.findById(id);
        if (!existingStudent) return res.status(404).json({ message: "Student not found" });
  
       
        if (status && !["Active", "Inactive"].includes(status)) {
          return res.status(400).json({ message: "Invalid status value" });
        }
  
        if (sid) existingStudent.sid = sid;
        if (name) existingStudent.name = name;
        if (email) existingStudent.email = email;
        if (age) existingStudent.age = age;
        if (image) existingStudent.image = image;
        if (status) existingStudent.status = status; 
  
        await existingStudent.save();
        res.status(200).json({ message: "Student updated", student: existingStudent });
      } catch (error) {
        res.status(500).json({ message: "Server error", error }); 
    }

}
const deleteStudent = async (req, res)=>{
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = {createStudent, getStudent, getStudentById, updateStudent, deleteStudent}

