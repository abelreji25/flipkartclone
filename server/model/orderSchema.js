import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    razorpayOrderId: {
        type: String,
        required: true
    },
    razorpayPaymentId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'SUCCESS'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('order', orderSchema);

export default Order;
