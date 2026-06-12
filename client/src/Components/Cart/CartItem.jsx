import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { Card, Box, Typography, Button, styled } from '@mui/material';

import { addEllipsis } from '../../utils/util';
import GroupButton from './GroupButton';

const Component = styled(Card)`
    border-bottom: 1px solid #f1f5f9;
    border-radius: 0px;
    display: flex;
    background: #fff;
    transition: background 0.3s ease;
    box-shadow: none;
    &:hover {
        background: #f8fafc;
    }
`;

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SmallText = styled(Typography)`
    color: #64748b;
    font-size: 14px;
    margin-top: 10px;
    display: flex;
    align-items: center;
`;

const Cost = styled(Typography)`
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
`;

const MRP = styled(Typography)`
    color: #94a3b8;
    font-size: 15px;
`;

const Discount = styled(Typography)`
    color: #10b981;
    font-weight: 600;
    background: rgba(16, 185, 129, 0.1);
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 13px;
`;

const Remove = styled(Button)`
    margin-top: 15px;
    font-size: 15px;
    font-weight: 600;
    color: #ef4444;
    text-transform: none;
    transition: all 0.2s ease;
    padding: 6px 12px;
    border-radius: 8px;
    &:hover {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
    }
`;

const CartItem = ({ item, removeItemFromCart }) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const dispatch = useDispatch();

    const handleQuantityChange = (newQuantity) => {
        dispatch(addToCart(item.id, newQuantity));
    }

    return (
        <Component>
            <LeftComponent>
                <img src={item.url} style={{ height: 110, width: 110 }} />
                <GroupButton quantity={item.quantity} setQuantity={handleQuantityChange} />
            </LeftComponent>
            <Box style={{ margin: 20 }}>
                <Typography style={{ fontSize: 16, fontWeight: 500, color: '#1e293b' }}>{addEllipsis(item.title.longTitle)}</Typography>
                <SmallText>Seller: SuperComNet
                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} alt="assured" /></span>
                </SmallText>
                <Box style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Cost component="span">&#8377;{item.price.cost}</Cost>
                    <MRP component="span"><strike>&#8377;{item.price.mrp}</strike></MRP>
                    <Discount component="span">{item.price.discount} off</Discount>
                </Box>
                <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
            </Box>
        </Component>
    )
}

export default CartItem;