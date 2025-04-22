import React from 'react';
import axios from 'axios';


export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "140px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "140px"
    },      
    {
        name: "Department",
        selector: (row) => row.dept_name,
        sortable: true,
        width: "140px"

    },
    {
        name: "Action",
        selector: (row) => row.action,
        width: "400px",
        center: true,
    }
];


export const AttendanceHelper = ({status, employeeId, statusChange}) => {
    const markEmployee = async (status, employeeId) => {
        const response = await axios.put(`http://localhost:5000/api/attendance/update/${employeeId}`, {status}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })

        if(response.data.success){

         statusChange()
    }
}
    
    return(
        <div>
            {status === null ? 
            <div className="flex space-x-8">
               <button
               className="px-4 py-2 bg-green-500 text-white"
               onClick={() => markEmployee("present", employeeId)}
               >
                Present
               </button>

               <button
               className="px-4 py-2 bg-red-500 text-white"
               onClick={() => markEmployee("absent", employeeId)}

               >Absent
               </button>

               <button
               className="px-4 py-2 bg-yellow-500 text-white"
               onClick={() => markEmployee("sick", employeeId)}
               >Sick
               </button>

               <button
               className="px-4 py-2 bg-blue-500 text-white"
               onClick={() => markEmployee("leave", employeeId)}
               >Leave
               </button>
                </div>
                :(
                    <p className="bg-red-500 text-white px-4 py-2 rounded">You are already marked as {status}</p>
                )
            }   
        </div>
    )
}

