import axios from 'axios';

const url = '';

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user)
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/signup`, user)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
        return error.response;
    }
}

export const getProductById = async (id) => {
    try {
        return await axios.get(`${url}/product/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}

export  const payUsingPaytm = async (data) => {
    try {
        let response = await axios.post(`${url}/payment`, data);
        return response.data;
    } catch (error) {
        console.log('Error', error);
    }
}

export const initiateRazorpayPayment = async (data) => {
    try {
        let response = await axios.post(`${url}/payment/razorpay`, data);
        return response.data;
    } catch (error) {
        console.log('Error initiating Razorpay order', error);
    }
}

export const verifyRazorpayPayment = async (data) => {
    try {
        let response = await axios.post(`${url}/payment/verify`, data);
        return response.data;
    } catch (error) {
        console.log('Error verifying Razorpay payment', error);
        throw error;
    }
}

export const saveOrder = async (data) => {
    try {
        let response = await axios.post(`${url}/order/create`, data);
        return response.data;
    } catch (error) {
        console.log('Error saving order', error);
        throw error;
    }
}

export const getOrders = async (userId) => {
    try {
        let response = await axios.get(`${url}/orders/${userId}`);
        return response.data;
    } catch (error) {
        console.log('Error getting orders', error);
        throw error;
    }
}