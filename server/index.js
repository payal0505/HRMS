import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js'
import connectDB from './db/db.js'

dotenv.config();


connectDB()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

