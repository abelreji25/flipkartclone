import { useState, useContext } from 'react';

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { payUsingPaytm, initiateRazorpayPayment, verifyRazorpayPayment } from '../../service/api';

import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { LoginContext } from '../../context/ContextProvider';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '20px 40px 20px 0',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
        padding: '20px 0'
    }
}))

const ImageContainer = styled(Box)`
    padding: 30px;
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 16px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    width: 95%;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.02);
`;

const Image = styled('img')({
    width: '85%',
    height: 'auto',
    maxHeight: '350px',
    objectFit: 'contain'
});

const ButtonWrapper = styled(Box)`
    display: flex;
    justify-content: space-between;
    width: 95%;
`;

const AddToCartBtn = styled(Button)`
    width: 48%;
    border-radius: 12px;
    height: 54px;
    color: #667eea;
    background: transparent;
    border: 2px solid #667eea;
    font-weight: 700;
    font-size: 16px;
    text-transform: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    & > svg {
        margin-right: 8px;
    }
    &:hover {
        background: rgba(102, 126, 234, 0.05);
        transform: translateY(-3px);
        box-shadow: 0 10px 20px -5px rgba(102, 126, 234, 0.2);
    }
`;

const BuyNowBtn = styled(Button)`
    width: 48%;
    border-radius: 12px;
    height: 54px;
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-weight: 700;
    font-size: 16px;
    text-transform: none;
    box-shadow: 0 8px 25px -5px rgba(102, 126, 234, 0.4);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    & > svg {
        margin-right: 8px;
    }
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
    }
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 35px -5px rgba(102, 126, 234, 0.5);
        &::before {
            left: 100%;
        }
    }
`;

const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const { id } = product;
        
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { account, setOpen } = useContext(LoginContext);

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
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }

    const addItemToCart = () => {
        if (!account) {
            setOpen(true);
            return;
        }
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }

    return (
        <LeftContainer>
            <ImageContainer>
                <Image src={product.detailUrl} />
            </ImageContainer>
            <ButtonWrapper>
                <AddToCartBtn onClick={() => addItemToCart()}><Cart /> Add to Cart</AddToCartBtn>
                <BuyNowBtn onClick={() => buyNow()}><Flash /> Buy Now</BuyNowBtn>
            </ButtonWrapper>
        </LeftContainer>
    )
}

export default ActionItem;