import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connect on: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Erro to connect: ${error.message}`);
        process.exit(1);
    }
}