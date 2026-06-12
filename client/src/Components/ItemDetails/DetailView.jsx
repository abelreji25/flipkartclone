import { useState, useEffect } from 'react';

import { styled, Box, Typography, Grid } from '@mui/material';

import ProductDetail from './ProductDetail';
import ActionItem from './ActionItem';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../service/api';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetails } from '../../redux/actions/productActions';

const Component = styled(Box)`
    margin-top: 55px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const RightContainer = styled(Grid)(({ theme }) => ({
    marginTop: 50,
    padding: '0 40px',
    [theme.breakpoints.down('md')]: {
        padding: '20px'
    }
}));

const Title = styled(Typography)`
    font-size: 28px;
    font-weight: 700;
    color: #1e293b;
    line-height: 1.3;
    margin-bottom: 8px;
`;

const RatingWrapper = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: #64748b;
    font-size: 14px;
    font-weight: 500;
`;

const PriceWrapper = styled(Box)`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
`;

const MainPrice = styled(Typography)`
    font-size: 36px;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -1px;
`;

const MRP = styled(Typography)`
    color: #94a3b8;
    font-size: 18px;
    text-decoration: line-through;
    font-weight: 500;
`;

const DiscountBadge = styled(Box)`
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    padding: 6px 12px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.5px;
`;

const DetailView = () => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
    
    const { id } = useParams();

    const { loading, product } = useSelector(state => state.getProductDetails);

    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if(product && id !== product.id)   
            dispatch(getProductDetails(id));
    }, [dispatch, product, id, loading]);

    return (
        <Component>
            <Box></Box>
            { product && Object.keys(product).length &&
                <Container container> 
                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                        <Title>{product.title.longTitle}</Title>
                        <RatingWrapper>
                            8 Ratings & 1 Reviews
                            <span><img src={fassured} style={{width: 77, marginLeft: 20}} alt="assured" /></span>
                        </RatingWrapper>
                        <PriceWrapper>
                            <MainPrice>₹{product.price.cost}</MainPrice>
                            <MRP>₹{product.price.mrp}</MRP>
                            <DiscountBadge>{product.price.discount} off</DiscountBadge>
                        </PriceWrapper>
                        <ProductDetail product={product} />
                    </RightContainer>
                </Container>
            }   
        </Component>
    )
}

export default DetailView;