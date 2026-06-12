import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ecommerce.hhbbnpn.mongodb.net/ECOMMERCE?retryWrites=true&w=majority&appName=ecommerce`;

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(async () => {
        await mongoose.connection.db.dropDatabase();
        console.log("Dropped ECOMMERCE successfully");
        process.exit(0);
    })
    .catch(err => {
        console.error("Connection Failed:", err.message);
        process.exit(1);
    });
