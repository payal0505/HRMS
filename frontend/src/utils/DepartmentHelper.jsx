import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dept_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action,
    }
];

export const DepartmentButtons = ({ DepId, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Do you want to delete this department?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:5000/api/department/${DepId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                onDepartmentDelete();  // Update UI state
                alert("Department deleted successfully!");
            } else {
                alert("Failed to delete department.");
            }
        } catch (error) {
            console.error("Delete Error:", error);
            alert(error.response?.data?.error || "An error occurred while deleting.");
        }
    };

    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-green-600"
                onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-red-500"
                onClick={handleDelete}
            >Delete</button>
        </div>
    );
};
