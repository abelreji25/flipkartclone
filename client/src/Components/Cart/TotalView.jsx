import { useState, useEffect } from 'react';

import { Box, Typography, styled } from '@mui/material';

const MainBox = styled(Box)`
    position: sticky;
    top: 85px;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    border: 1px solid #f1f5f9;
`;

const Header = styled(Box)`
    padding: 20px 24px;
    background: #f8fafc;
    border-bottom: 1px solid #f1f5f9;
`;

const Heading = styled(Typography)`
    color: #475569;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
`;

const Container = styled(Box)`
    padding: 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 15px;
        color: #334155;
    }
`;

const Price = styled(Typography)`
    float: right;
    font-weight: 500;
    color: #0f172a;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 700;
    border-top: 1px dashed #cbd5e1;
    padding: 20px 0;
    border-bottom: 1px dashed #cbd5e1;
    color: #0f172a;
    margin-bottom: 20px;
`;

const Discount = styled(Typography)`
    font-size: 15px;
    color: #10b981;
    font-weight: 600;
    background: rgba(16, 185, 129, 0.1);
    padding: 12px;
    border-radius: 8px;
    text-align: center;
`


const TotalView = ({ cartItems }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0)

    useEffect(() => {
        totalAmount();
    }, [cartItems]);
    
    const totalAmount = () => {
        let price = 0, discount = 0;
        cartItems.map(item => {
            const qty = item.quantity || 1;
            price += item.price.mrp * qty;
            discount += (item.price.mrp - item.price.cost) * qty;
        })
        setPrice(price);
        setDiscount(discount);
    }

    return (
        <MainBox>
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price ({cartItems?.length} item)
                    <Price component="span">&#8377;{price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span" style={{ color: '#10b981' }}>-&#8377;{discount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">&#8377;40</Price>
                </Typography>
                <TotalAmount>Total Amount
                    <Price>&#8377;{price - discount + 40}</Price>
                </TotalAmount>
                <Discount>You will save &#8377;{discount - 40} on this order</Discount>
            </Container>
        </MainBox>
    )
}

export default TotalView;