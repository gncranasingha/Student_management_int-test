import React from "react";
import { api } from "../services/api";

const StudentTable = ({ students, fetchStudents, setEditingStudent }) => {
  const handleDelete = async (sid) => {
    try {
      await api.delete(`/students/${sid}`);
      fetchStudents();
      alert("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Age</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Image</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student._id} className="text-center">
            <td className="p-2 border">{student.sid}</td>
            <td className="p-2 border">{student.name}</td>
            <td className="p-2 border">{student.email}</td>
            <td className="p-2 border">{student.age}</td>
            <td className="p-2 border">{student.status}</td>
            <td className="p-2 border">
              {student.image && (
                <img
                  src={`http://localhost:5004/${student.image}`}
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
            </td>
            <td className="p-2 border space-x-2">
              <button
                onClick={() => setEditingStudent(student)} 
                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.sid)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;