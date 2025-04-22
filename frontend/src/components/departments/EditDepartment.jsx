import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({});
    const [depLoading, setDepLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);
                if (response.data.success) {
                    setDepartment(response.data.data);
                }
            } catch (error) {
                if (error.response && error.response.data && !error.response.data.success) {
                    alert(error.response.data.error);
                } else {
                    alert("An error occurred while fetching the department.");
                }
            } finally {
                setDepLoading(false);
            }
        };
        fetchDepartment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                console.log("Department updated:", response.data.department);
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            } else {
                alert("An error occurred while updating the department.");
            }
        }
    };

    return (
        <>
            {depLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                    <h3 className="text-2xl font-bold mb-6">Edit Department</h3>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="dept_name"
                                onChange={handleChange}
                                value={department?.dept_name || ""}
                                placeholder="Department Name"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                placeholder="Description"
                                onChange={handleChange}
                                value={department?.description || ""}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                rows="4"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Edit Department
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditDepartment;
