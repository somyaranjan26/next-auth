import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log(`MongoDB Connected: ${connection.host}`);
        });

        connection.on('error', (error) => {
            console.error(`Error: ${error!.message}`);
            process.exit(1);
        });
    
    } catch (error) {
        console.error(`Error: ${error!}`);
        process.exit(1);
    }
};
