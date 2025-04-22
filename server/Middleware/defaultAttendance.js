import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";




const defaultAttendance = async (req, res, next) => { 
    try {
      const date = new Date().toISOString().split("T")[0];
  
      const employees = await Employee.find({});
      const existingRecords = await Attendance.find({ date });
  
      // Get a list of employee IDs who already have attendance
      const existingEmployeeIds = existingRecords.map(record => record.employeeId.toString());
  
      // Filter employees who don't have attendance yet
      const newAttendances = employees
        .filter(emp => !existingEmployeeIds.includes(emp._id.toString()))
        .map(employee => ({
          date,
          employeeId: employee._id,
          status: null,
        }));
  
      if (newAttendances.length > 0) {
        await Attendance.insertMany(newAttendances);
      }
  
      next();
    } catch (error) {
      console.error("defaultAttendance error:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };
  

export default defaultAttendance;
