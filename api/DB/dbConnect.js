import mongoose from 'mongoose'

const dbConnect = ()=>{
    try {
        mongoose.connect(process.env.MONGO_DB_URL).then(()=>console.log("connected to mongoDB successfull"))
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect