import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ecommerce.hhbbnpn.mongodb.net/ECOMMERCE?retryWrites=true&w=majority&appName=ecommerce`;

console.log("URL is:", URL);

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(async () => {
        console.log("Connected Successfully to User's DB");
        process.exit(0);
    })
    .catch(err => {
        console.error("Connection Failed:", err.message);
        process.exit(1);
    });
