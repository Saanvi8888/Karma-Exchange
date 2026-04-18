const mongoose = require("mongoose")

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Server conencted:${conn.connection.host}`);
        
    } catch (error) {
        console.error('Db connection error',error.message);
        process.exit(1);
        
    }
}

module.exports= connectDB;