import { useEffect, useState, useContext } from 'react';
import { Box, Typography, Grid, Card, styled } from '@mui/material';
import { getOrders } from '../../service/api';
import { LoginContext } from '../../context/ContextProvider';

const Component = styled(Box)`
    padding: 30px 135px;
    background: #f1f5f9;
    min-height: 80vh;
    @media (max-width: 900px) {
        padding: 15px;
    }
`;

const OrderCard = styled(Card)`
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

const HeaderBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 15px;
    margin-bottom: 15px;
`;

const ItemBox = styled(Box)`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 15px;
`;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { account } = useContext(LoginContext);

    useEffect(() => {
        const fetchOrders = async () => {
            if (account) {
                const data = await getOrders(account);
                if (data) {
                    setOrders(data);
                }
            }
        };
        fetchOrders();
    }, [account]);

    if (!account) {
        return (
            <Component>
                <Typography variant="h5" style={{ textAlign: 'center', marginTop: 50 }}>
                    Please login to view your orders.
                </Typography>
            </Component>
        );
    }

    return (
        <Component>
            <Typography variant="h4" style={{ fontWeight: 600, marginBottom: 25 }}>
                My Orders
            </Typography>
            {orders.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    You have no past orders.
                </Typography>
            ) : (
                orders.map((order, index) => (
                    <OrderCard key={index}>
                        <HeaderBox>
                            <Box>
                                <Typography style={{ color: '#64748b', fontSize: 14 }}>ORDER PLACED</Typography>
                                <Typography style={{ fontWeight: 500 }}>{new Date(order.createdAt).toLocaleDateString()}</Typography>
                            </Box>
                            <Box>
                                <Typography style={{ color: '#64748b', fontSize: 14 }}>TOTAL</Typography>
                                <Typography style={{ fontWeight: 500 }}>₹{order.totalAmount}</Typography>
                            </Box>
                            <Box>
                                <Typography style={{ color: '#64748b', fontSize: 14 }}>ORDER ID</Typography>
                                <Typography style={{ fontWeight: 500 }}>{order.razorpayOrderId}</Typography>
                            </Box>
                        </HeaderBox>
                        
                        <Grid container spacing={2}>
                            {order.items.map((item, idx) => (
                                <Grid item xs={12} md={6} key={idx}>
                                    <ItemBox>
                                        <img src={item.url} alt="product" style={{ width: 80, height: 80, objectFit: 'contain' }} />
                                        <Box>
                                            <Typography style={{ fontWeight: 600 }}>{item.title.shortTitle}</Typography>
                                            <Typography style={{ color: '#64748b', fontSize: 14 }}>Seller: SuperComNet</Typography>
                                            <Typography style={{ fontWeight: 600, marginTop: 5 }}>₹{item.price.cost}</Typography>
                                        </Box>
                                    </ItemBox>
                                </Grid>
                            ))}
                        </Grid>
                    </OrderCard>
                ))
            )}
        </Component>
    );
};

export default Orders;
