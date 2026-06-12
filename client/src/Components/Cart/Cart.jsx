import { useEffect, useContext } from 'react';

import { Box, Typography, Button, Grid, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, emptyCart } from '../../redux/actions/cartActions';

import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { LoginContext } from '../../context/ContextProvider';

import { post } from '../../utils/paytm';
import { payUsingPaytm, initiateRazorpayPayment, verifyRazorpayPayment, saveOrder } from '../../service/api';

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 20px 24px;
    background: #fff;
    border-radius: 16px 16px 0 0;
    border-bottom: 1px solid #f1f5f9;
`;

const BottomWrapper = styled(Box)`
    padding: 20px 24px;
    background: #fff;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 -4px 15px 0 rgba(0,0,0,0.02);
    border-top: 1px solid #f1f5f9;
    display: flex;
    justify-content: flex-end;
`;

const StyledButton = styled(Button)`
    display: flex;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    border-radius: 12px;
    width: 250px;
    height: 51px;
    font-weight: 700;
    font-size: 16px;
    text-transform: none;
    box-shadow: 0 8px 25px -5px rgba(102, 126, 234, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 35px -5px rgba(102, 126, 234, 0.5);
    }
`;

const Cart = () => {
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const { id } = useParams();

    const dispatch = useDispatch();
    const { account, setOpen } = useContext(LoginContext);
    
    useEffect(() => {
        if(cartItems && id !== cartItems.id)   
            dispatch(addToCart(id));
    }, [dispatch, cartItems, id]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const buyNow = async () => {
        if (!account) {
            setOpen(true);
            return;
        }

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // Sum up total amount in cart
        let totalAmount = 0;
        cartItems.map(item => totalAmount += item.price.cost * (item.quantity || 1));

        const order = await initiateRazorpayPayment({ amount: totalAmount || 500 });
        if (!order) {
            alert("Server error. Are you online?");
            return;
        }

        const options = {
            key: order.key_id || "rzp_test_123456",
            amount: order.amount.toString(),
            currency: "INR",
            name: "E-Commerce",
            description: "Cart Checkout",
            order_id: order.id,
            handler: async function (response) {
                const data = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };
                try {
                    const result = await verifyRazorpayPayment(data);
                    if (result && result.status === 'SUCCESS') {
                        await saveOrder({
                            userId: account,
                            items: cartItems,
                            totalAmount: order.amount / 100,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id
                        });
                        dispatch(emptyCart());
                        alert("Payment successful! Your order has been placed.");
                    } else {
                        alert("Payment verification failed");
                    }
                } catch (err) {
                    alert("Payment verification failed");
                }
            },
            prefill: {
                name: account,
                email: "test@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#667eea",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
        { cartItems.length ? 
            <Component container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Header>
                        {   cartItems.map(item => (
                                <CartItem item={item} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                    <BottomWrapper>
                        <StyledButton onClick={() => buyNow()} variant="contained">Place Order</StyledButton>
                    </BottomWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems} />
                </Grid>
            </Component> : <EmptyCart />
        }
        </>

    )
}

export default Cart;