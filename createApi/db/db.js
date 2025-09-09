import mongoose from "mongoose"

export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connected Successfully.")
    })
    .catch(error=>console.log("DB error:", error))
}