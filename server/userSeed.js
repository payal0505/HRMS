import User from './models/User.js'
import bcrypt from 'bcrypt'
import connectDB from './db/db.js'

const userRegister = async () => {
    connectDB()
    try{
        const hashPassword = await bcrypt.hash("admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password:"admin",
            role: "admin"
        })
        await newUser.save()
    }
    catch(error){
        console.log(error)

    }
    }

    userRegister();
// This script will create a new user with the name Admin, email
    