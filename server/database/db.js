import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-iuevtl1-shard-00-01.hhbbnpn.mongodb.net:27017,ac-iuevtl1-shard-00-00.hhbbnpn.mongodb.net:27017,ac-iuevtl1-shard-00-02.hhbbnpn.mongodb.net:27017/ecommerce?authSource=admin&replicaSet=atlas-8bv2zd-shard-0&retryWrites=true&w=majority&ssl=true`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;