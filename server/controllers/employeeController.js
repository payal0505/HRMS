import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import multer from "multer"
import path from "path"
import employeeRouter from '../routes/employee.js';
import Department from '../models/Department.js';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({storage: storage})

const addEmployee = async (req, res) => {

    console.log("Received file:", req.file);
    console.log("Received body:", req.body);


    try { 
    const {
        name,
        email,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        password,
        role,
    } = req.body;
    console.log(req.body)

    const user = await User.findOne({email})
    if(user) {
     return res.status(400).json({success: false, error: "User already registered in employee"});
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
    name,
    email,
    password: hashPassword,
    role,
    profileImage: req.file ? req.file.filename : "",
    
})

    const savedUser = await newUser.save()

    const newEmployee = new Employee({
        userId: savedUser._id,
        employeeId,
        name,  
        email, 
        role, 
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary
    })

    await newEmployee.save()
    return res.status(200).json({success: true, message: "employee created"})

} catch (error){
    console.log(error.message)
         return res.status(500).json({success: false, error: "server error in adding employee"})
}
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
        .populate('userId', {password: 0})
        .populate("department")
        return res.status(200).json({success: true, employees})
        
    }catch (error){
        return res.status(500).json({success: false, error:"get employees server error"})
    }

}


const getEmployee = async (req, res) => {
    const { id } = req.params;
    console.log("Fetching employee with ID:", id);  // Debugging line

    try {
        let employee;
        employee = await Employee.findById(id)
            .populate('userId', { password: 0 })
            .populate("department");

        if (!employee) {
            console.log("Employee not found by ID, trying userId...");
            employee = await Employee.findOne({ userId: id })
                .populate("userId", { password: 0 })
                .populate("department");
        }

        if (!employee) {
            console.log("Employee still not found!");
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Error fetching employee:", error);
        return res.status(500).json({ success: false, error: "Server error in fetching employee" });
    }
};




const fetchEmployeesByDepId = async (req,res) => {
    const {id} = req.params;
    try {
        const employees = await Employee.find({department: id})
        return res.status(200).json({success: true, employees})
        
    }catch (error){
        return res.status(500)
        .json({success: false, error:"get employeesbyDepId server error"})
    }
}


const updateEmployee = async(req, res) => {
    try {
        const {id} = req.params;
        const{
            name,  
            maritalStatus,
            designation,
            department,
            salary
        }= req.body;

        console.log("Received Update Request:", req.body);

        const employee = await Employee.findById(id)
        if(!employee){
            return res
            .status(404)
            .json({success: false, error: "employee not found"})
        }
        
        const user = await User.findById(employee.userId)
        if(!user){
            return res
            .status(404)
            .json({success: false, error: "user not found"})
        }

        const updateUser = await User.findByIdAndUpdate(employee.userId, { name }, { new: true });
        const updateEmployee = await Employee.findByIdAndUpdate(id, {
            maritalStatus,
            designation,
            salary,
            department
        }, { new: true });
        
        
        if(!updateEmployee || !updateUser) {
            return res
            .status(404)
            .json({success: false, error: "document not found"})
        }
        console.log("Updated Employee Data:", updateEmployee);

        return res.status(200).json({success: true, message: "employee updated"})

    }catch(error) {
        console.error("Error updating employee:", error);
        return res.status(500)
        .json({success: false, error: "update employees server error"})
    
    }
}
export {addEmployee, upload, getEmployees, getEmployee, fetchEmployeesByDepId, updateEmployee}
