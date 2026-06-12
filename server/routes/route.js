import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
// import { addItemInCart } from '../controller/cart-controller.js';
import { addPaymentGateway, paymentResponse, initiateRazorpayOrder, verifyRazorpayPayment } from '../controller/payment-controller.js';
import { saveOrder, getOrders } from '../controller/order-controller.js';

const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

// router.post('/cart/add', addItemInCart);

router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);
router.post('/payment/razorpay', initiateRazorpayOrder);
router.post('/payment/verify', verifyRazorpayPayment);

router.post('/order/create', saveOrder);
router.get('/orders/:userId', getOrders);

export default router;