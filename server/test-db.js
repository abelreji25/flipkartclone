import mongoose from 'mongoose';

const URL = 'mongodb+srv://abelrejicherian70_db_user:Y47K1f0Nb0yyOydM@ecommerce.hhbbnpn.mongodb.net/ECOMMERCE?retryWrites=true&w=majority&appName=ecommerce';

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(async () => {
        console.log("Connected Successfully to User's DB");
        process.exit(0);
    })
    .catch(err => {
        console.error("Connection Failed:", err.message);
        process.exit(1);
    });
