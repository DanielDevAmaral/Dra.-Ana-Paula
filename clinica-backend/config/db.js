const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); // You must await this call

        console.log(`MongoDB Connected on: ${conn.connection.host}`); // Now conn.connection.host will work
    } catch (error) {
        console.log(`Error connecting: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
