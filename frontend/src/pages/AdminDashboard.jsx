import React, { useEffect, useState } from "react";
import AddStudentForm from "../components/AddStudentForm";
import StudentTable from "../components/StudentTable";
import { api } from "../services/api";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
  {/* Left Column */}
  <div className="w-full md:w-1/3 p-4 bg-white shadow-md">
    <h2 className="text-xl font-bold mb-4">{editingStudent ? "Edit Student" : "Add Student"}</h2>
    <AddStudentForm
      fetchStudents={fetchStudents}
      editingStudent={editingStudent} 
      clearEditing={() => setEditingStudent(null)}
    />
  </div>

  {/* Right Column */}
  <div className="w-full md:w-2/3 p-4 bg-white shadow-md">
    <h2 className="text-xl font-bold mb-4">Student List</h2>
    <StudentTable
      students={students}
      fetchStudents={fetchStudents}
      setEditingStudent={setEditingStudent}
    />
  </div>
</div>
  );
};

export default AdminDashboard;