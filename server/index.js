import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js'; 
import leaveRouter from './routes/leave.js';
import settingRouter from './routes/setting.js';
import attendanceRouter from './routes/attendance.js';
import dashboardRouter from './routes/dashboard.js';
import connectDB from './db/db.js';
import admin_settingRouter from './routes/admin_setting.js';
import projectRouter from './routes/project.js';


dotenv.config();


connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/salary', salaryRouter)
app.use('/api/leaves', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/attendance', attendanceRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/admin_setting', admin_settingRouter)
app.use('/api/projects', projectRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
