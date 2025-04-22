import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext"; // Importing useAuth for authentication context

const View = () => {
    const { id } = useParams(); // getting :id from URL
    const [salaries, setSalaries] = useState(null);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    let sno = 1;
    const {user} = useAuth()

    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                console.log("Fetching salary for ID:", id);
                const response = await axios.get(`http://localhost:5000/api/salary/${id}/${user.role}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    setSalaries(response.data.salary);
                    setFilteredSalaries(response.data.salary);
                }
            } catch (error) {
                console.error("Salary fetch error:", error);
                if (error.response && !error.response.data.success) {
                    alert(error.message);
                }
            }
        };

        if (id) fetchSalaries(); // only call if ID exists
    }, [id, user?.role]);

    const filterSalaries = (e) => {
        const q = e.target.value;
        const filteredRecords = salaries.filter((leave) =>
            leave.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <>
            {filteredSalaries === null ? (
                <div> Loading... </div>
            ) : (
                <div className="overflow-x-auto p-5">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Salary History</h2>
                    </div>
                    <div className="flex justify-end my-3">
                        <input
                            type="text"
                            placeholder="Search By Emp ID"
                            className="border px-2 rounded-md py-0.5 border-gray-300"
                            onChange={filterSalaries}
                        />
                    </div>

                    {filteredSalaries.length > 0 ? (
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">SNO</th>
                                    <th className="px-6 py-3">Emp ID</th>
                                    <th className="px-6 py-3">Salary</th>
                                    <th className="px-6 py-3">Allowance</th>
                                    <th className="px-6 py-3">Deduction</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary) => (
                                    <tr
                                        key={salary._id}
                                        className="bg-white border-b bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-3">{sno++}</td>
                                        <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                                        <td className="px-6 py-3">{salary.basicSalary}</td>
                                        <td className="px-6 py-3">{salary.allowances}</td>
                                        <td className="px-6 py-3">{salary.deductions}</td>
                                        <td className="px-6 py-3">{salary.netSalary}</td>
                                        <td className="px-6 py-3">
                                            {new Date(salary.payDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No Records</div>
                    )}
                </div>
            )}
        </>
    );
};

export default View;
