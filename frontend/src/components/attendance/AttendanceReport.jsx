import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
    const [report, setReport] = useState({});
    const [limit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [dateFilter, setDateFilter] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams({ limit, skip });
            if (dateFilter) {
                query.append('date', dateFilter);
            }

            const response = await axios.get(`http://localhost:5000/api/attendance/report?${query.toString()}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                if (skip === 0) {
                    setReport(response.data.groupData);
                } else {
                    setReport((prevData) => ({ ...prevData, ...response.data.groupData }));
                }
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [skip, dateFilter]);

    const handleLoadMore = () => {
        setSkip((prevSkip) => prevSkip + limit);
    }

    return (
        <div className="min-h-screen p-10 bg-white">
            <h2 className="text-center text-2xl font-bold mb-6">Attendance Report</h2>

            <div className="mb-6">
                <label className="text-xl font-semibold block mb-2">Filter by Date</label>
                <input
                    type="date"
                    className="border bg-gray-100 p-2 rounded"
                    value={dateFilter}
                    onChange={(e) => {
                        setDateFilter(e.target.value)
                        setSkip(0); // Reset skip when date filter changes
                    }}
                />
            </div>

            {loading ? (
                <div className="text-center text-lg">Loading...</div>
            ) : (
                Object.entries(report).map(([date, record]) => (
                    <div key={date} className="mt-4">
                        <h2 className="text-lg font-semibold mb-3">
                        {new Date(date).toISOString().split('T')[0]}
                        </h2>
                        <table className="w-full border border-gray-300 text-left">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-2 border">S No</th>
                                    <th className="p-2 border">Employee ID</th>
                                    <th className="p-2 border">Name</th>
                                    <th className="p-2 border">Department</th>
                                    <th className="p-2 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.map((data, index) => (
                                    <tr key={data.employeeId} className="hover:bg-gray-50">
                                        <td className="p-2 border">{index + 1}</td>
                                        <td className="p-2 border">{data.employeeId}</td>
                                        <td className="p-2 border">{data.employeeName}</td>
                                        <td className="p-2 border">{data.departmentName}</td>
                                        <td className="p-2 border">{data.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                ))
            )}
    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleLoadMore}>Load More</button>

        </div>
    );
};

export default AttendanceReport;
