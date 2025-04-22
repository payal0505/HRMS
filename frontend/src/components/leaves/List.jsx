import React  from 'react'
import { Link , useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/authContext'

const List= () => {
    const [leaves, setleaves] = useState(null);
    let sno = 1;
    

    const { id } = useParams();
    const { user} = useAuth()



    const fetchleaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leaves/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });


            if (response.data.success) {
                setleaves(response.data.leaves);
            }
        } catch (error) {
            if (error.response && !error.response.data.success){
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchleaves();
    }, []);

    if(!leaves){
        return (
            <div> Loading </div>
        )
    }
    return(
        <div className='p-6'>
            <div className="text-center">
            <h3 className="text-2xl font-bold">Manage leaves</h3>
        
        </div>
        <div className="flex justify-between items-center">
            <input
            type="text"
            placeholder="Search By Dept Name"
            className="px-4 py-0.5 border"

            />

            <Link
            to="/employee-dashboard/add-leaves"
            className="px-4 py-1 bg-teal-600 rounded text-white"
            >
                Add New leaves
            </Link>
        </div>
        
        <table className="w-full text-sm text-left text-gray-500 mt-6">
                                <thead className="text-xs text-gray-700 uppercse bg-gray-50 border border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3"> SNO </th>
                                        <th className="px-6 py-3"> leaves Type </th>
                                        <th className="px-6 py-3"> From </th>
                                        <th className="px-6 py-3"> To </th>
                                        <th className="px-6 py-3"> Description </th>
                                        <th className="px-6 py-3"> Status </th>

                                    </tr>
                                </thead>
                               
                                <tbody>
                                    
                                    {leaves.map((leaves) => (
                                        <tr
                                        key={leaves._id}
                                        className="bg-white border-b bg-gray-600 dark:border-gray-700"
                                        >
                                            <td className="px-6 py-3">{sno++}</td>
                                            <td className="px-6 py-3">{leaves.leaveType}</td>
                                            <td className="px-6 py-3">
                                            {new Date(leaves.startDate).toLocaleDateString()}
                                            </td>
                                            

                                                <td className="px-6 py-3">{new Date(leaves.endDate).toLocaleDateString()}</td>
                                               <td className="px-6 py-3">{leaves.reason}</td>
                                                <td className="px-6 py-3">{leaves.status}</td>
                                                </tr>
                                    ))}
                                </tbody>
                            </table>
        </div>
    )
    }


export default List
