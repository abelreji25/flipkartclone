import Order from '../model/orderSchema.js';

export const saveOrder = async (request, response) => {
    try {
        const order = new Order(request.body);
        await order.save();
        response.status(200).json({ message: 'Order saved successfully', order });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

export const getOrders = async (request, response) => {
    try {
        const { userId } = request.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        response.status(200).json(orders);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};
