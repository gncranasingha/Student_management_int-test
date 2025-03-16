import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const AddStudentForm = ({ fetchStudents, editingStudent, clearEditing }) => {
  const [formData, setFormData] = useState({
    sid: "",
    name: "",
    email: "",
    age: "",
    status: "Active",
    image: null,
  });

  

  useEffect(() => {
    if (editingStudent) {
      // editing student details
      setFormData({
        sid: editingStudent.sid,
        name: editingStudent.name,
        email: editingStudent.email,
        age: editingStudent.age,
        status: editingStudent.status,
        image: null, 
      });
    } else {
      
      setFormData({
        sid: "",
        name: "",
        email: "",
        age: "",
        status: "Active",
        image: null,
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    
    if (formData.name) formDataToSend.append("name", formData.name);
    if (formData.email) formDataToSend.append("email", formData.email);
    if (formData.age) formDataToSend.append("age", formData.age);
    if (formData.status) formDataToSend.append("status", formData.status);
    if (formData.image) formDataToSend.append("image", formData.image);
  
    try {
      if (editingStudent) {
        await api.put(`/students/${editingStudent.sid}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Student updated successfully!");
      } 
      else {
        formDataToSend.append("sid", formData.sid); 
        await api.post("/students", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Student added successfully!");
        setFormData({
          sid: "",
          name: "",
          email: "",
          age: "",
          status: "Active",
          image:"",
        });
      }
      clearEditing(); 
      fetchStudents(); 

      

    }
     catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert(`Failed to submit: ${error.response?.data?.message || "Unknown error"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
  <input
    type="text"
    name="sid"
    placeholder="Student ID"
    value={formData.sid}
    onChange={handleChange}
    required
    readOnly={!!editingStudent}
    className="w-full p-2 border rounded"
  />
  <input
    type="text"
    name="name"
    placeholder="Name"
    value={formData.name}
    onChange={handleChange}
    required
    className="w-full p-2 border rounded"
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    required
    className="w-full p-2 border rounded"
  />
  <input
    type="number"
    name="age"
    placeholder="Age"
    value={formData.age}
    onChange={handleChange}
    required
    className="w-full p-2 border rounded"
  />
  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
    className="w-full p-2 border rounded"
  >
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
  </select>
  <input
    type="file"
    name="image"
    onChange={handleImageChange}
    className="w-full p-2 border rounded"
  />
  <button
    type="submit"
    className="w-full bg-gradient-to-r from-blue-900 to-green-300 text-white p-2 rounded hover:bg-green-600"
  >
    {editingStudent ? "Update Student" : "Add Student"}
  </button>
</form>
  );
};

export default AddStudentForm;