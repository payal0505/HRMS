import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredAttendance, setFilterAttendance] = useState([]);

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const selectedDate = new Date().toISOString().split('T')[0];

            const response = await axios.get(`http://localhost:5000/api/attendance?date=${selectedDate}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.attendance.map((att) => ({
                    sno: sno++,
                    employeeId: att.employeeId.employeeId,
                    dept_name: att.employeeId.department?.dept_name || "N/A",
                    name: att.employeeId.userId?.name || "N/A",
                    status: att.status || "N/A"
                }));

                setAttendance(data);
                setFilterAttendance(data);
            }
        } catch (error) {
            console.error("Error fetching attendance:", error);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleFilter = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const records = attendance.filter((emp) =>
            emp.dept_name.toLowerCase().includes(searchValue)
        );
        setFilterAttendance(records);
    };

    const handleStatusChange = async (employeeId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/attendance/update/${employeeId}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            fetchAttendance(); // refresh data
        } catch (error) {
            console.error("Error updating attendance:", error);
            alert("Failed to update attendance");
        }
    };

    const columns = [
        {
            name: "S.No",
            selector: row => row.sno,
            sortable: true,
            width: "70px"
        },
        {
            name: "Employee ID",
            selector: row => row.employeeId,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Department",
            selector: row => row.dept_name,
            sortable: true
        },
        {
            name: "Status",
            selector: row => row.status,
            cell: row => (
                <select
                    value={row.status === "N/A" ? "" : row.status}
                    onChange={(e) => handleStatusChange(row.employeeId, e.target.value)}
                    className="px-2 py-1 border rounded"
                >
                    <option value="">Mark</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Sick">Sick</option>
                </select>
            )
        }
    ];

    return (
        <div className='p-6'>
            <div className="text-center mb-4">
                <h3 className="text-2xl font-bold">Manage Attendance</h3>
            </div>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search By Department"
                    className="px-4 py-1 border rounded"
                    onChange={handleFilter}
                />

                <p className="text-lg">
                    Mark Employees for{" "}
                    <span className="font-semibold">
                        {new Date().toISOString().split('T')[0]}
                    </span>
                </p>

                <Link
                    to="/admin-dashboard/attendance-report"
                    className="px-4 py-1 bg-teal-600 rounded text-white"
                >
                    Attendance Report
                </Link>
            </div>

            <div className='mt-4'>
                <DataTable
                    columns={columns}
                    data={filteredAttendance}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                />
            </div>
        </div>
    );
};

export default Attendance;
