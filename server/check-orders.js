import mongoose from 'mongoose';
import Order from './model/orderSchema.js';

const URL = 'mongodb://user:codeforinterview@ecommerce-web-shard-00-00.wnaj9.mongodb.net:27017,ecommerce-web-shard-00-01.wnaj9.mongodb.net:27017,ecommerce-web-shard-00-02.wnaj9.mongodb.net:27017/ECOMMERCE?ssl=true&replicaSet=atlas-sjmqa0-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(async () => {
        console.log("Connected");
        const orders = await Order.find({});
        console.log("Orders count:", orders.length);
        console.log("Orders:", JSON.stringify(orders, null, 2));
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
