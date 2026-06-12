
import { useNavigate } from 'react-router-dom';
import { Typography, Box, styled, Button } from '@mui/material';

const Component = styled(Box)`
    width: 80%;
    background: #fff;
    margin: 80px auto;
    border-radius: 16px;
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    padding: 60px 0;
`;

const Container = styled(Box)`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Image = styled('img')({
    width: '20%',
    minWidth: '200px',
    marginBottom: '30px'
});

const Title = styled(Typography)`
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 10px;
`;

const SubText = styled(Typography)`
    font-size: 16px;
    color: #64748b;
    margin-bottom: 30px;
`;

const ShopNowBtn = styled(Button)`
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: #fff;
    padding: 12px 35px;
    border-radius: 30px;
    font-weight: 600;
    font-size: 16px;
    text-transform: none;
    box-shadow: 0 8px 20px -5px rgba(59, 130, 246, 0.4);
    transition: all 0.3s ease;
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 25px -5px rgba(59, 130, 246, 0.5);
    }
`;

const EmptyCart = () => {
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
    const navigate = useNavigate();
    
    return (
        <Component>
            <Container>
                <Image src={imgurl} alt="empty cart" />
                <Title>Your cart is empty!</Title>
                <SubText>Looks like you haven't added anything to your cart yet.</SubText>
                <ShopNowBtn onClick={() => navigate('/')}>Shop Now</ShopNowBtn>
            </Container>
        </Component>
    )
}

export default EmptyCart;