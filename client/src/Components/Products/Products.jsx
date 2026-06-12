import React, { useEffect } from 'react';
import { Box, Typography, Grid, styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const Component = styled(Box)`
    padding: 10px 2%;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    min-height: 100vh;
`;

const PageHeader = styled(Box)`
    margin-bottom: 25px;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const ProductCard = styled(Box)`
    padding: 25px 15px;
    margin: 15px 10px;
    border-radius: 16px;
    text-align: center;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid rgba(226, 232, 240, 0.4);
    box-shadow: 0 4px 15px rgba(0,0,0,0.02);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    height: 100%;
    &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.15);
        border-color: rgba(37, 99, 235, 0.3);
    }
    &:hover img {
        transform: scale(1.08);
    }
`;

const Image = styled('img')({
    width: 'auto',
    height: 150,
    objectFit: 'contain',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
});

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 6px;
    color: #1e293b;
`;

const DiscountBadge = styled(Box)`
    background: rgba(22, 163, 74, 0.08);
    color: #16a34a;
    padding: 2px 10px;
    border-radius: 20px;
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    margin-top: 5px;
    border: 1px solid rgba(22, 163, 74, 0.12);
`;

const Products = () => {
    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!products || products.length === 0) {
            dispatch(listProducts());
        }
    }, [dispatch, products]);

    return (
        <Component>
            <PageHeader>
                <Typography variant="h4" style={{ fontWeight: 600, color: '#0f172a' }}>
                    All Products
                </Typography>
                <Typography style={{ color: '#64748b', marginTop: 5 }}>
                    Discover our entire collection
                </Typography>
            </PageHeader>

            <Grid container spacing={2}>
                {products && products.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                            <ProductCard>
                                <Image src={product.url} alt={product.title.shortTitle} />
                                <Text style={{ fontWeight: 600 }}>{product.title.shortTitle}</Text>
                                <DiscountBadge>{product.discount}</DiscountBadge>
                                <Text style={{ color: '#64748b', opacity: 0.85, fontSize: 13, marginTop: 5 }}>
                                    {product.tagline}
                                </Text>
                            </ProductCard>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Component>
    );
};

export default Products;
