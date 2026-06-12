import React, { useState, useContext } from 'react';

import { Box, Typography, Badge, Button, styled, useMediaQuery, useTheme } from '@mui/material';
import { ShoppingCart, Storefront, Apps, Person, ShoppingBag, PowerSettingsNew } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';

import Profile from './Profile';
import LoginDialog from '../Login/LoginDialog';

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
}));

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    margin: '0 0 0 auto',
    alignItems: 'center',
    paddingRight: '10px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: '20px 30px',
        width: '100%',
        gap: '20px'
    },
    '& > *': {
        marginRight: '25px !important',
        textDecoration: 'none',
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: 16,
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        padding: '6px 14px',
        borderRadius: '12px',
        [theme.breakpoints.down('sm')]: {
            color: '#2874f0',
            alignItems: 'center',
            display: 'flex',
            marginRight: '0 !important',
            padding: '10px 0',
            width: '100%',
        },
        '&:last-child': {
            marginRight: '0 !important'
        }
    }
}));

const LoginButton = styled(Button)(({ theme }) => ({
    color: '#ffffff',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: 16,
    borderRadius: 24,
    padding: '8px 32px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: 'none',
    letterSpacing: '0.5px',
    [theme.breakpoints.down('sm')]: {
        color: '#ffffff',
        background: '#2874f0',
        width: '100%',
        justifyContent: 'center',
        padding: '8px 0',
        marginTop: '10px',
        marginBottom: '10px'
    }
}));

const CustomButtons = () => {
    
    const { account, setAccount, open, setOpen } = useContext(LoginContext);

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const openDialog = () => {
        setOpen(true);
    }

    const logout = () => {
        setAccount('');
    }

    return (
        <Wrapper>
            {
                account ? (
                    isMobile ? (
                        <>
                            <Box>
                                <Person style={{ marginRight: 8, color: '#2874f0' }} />
                                <Typography style={{ fontWeight: 600, color: '#2874f0' }}>Hi, {account}</Typography>
                            </Box>
                            <Container to='/orders'>
                                <ShoppingBag style={{ marginRight: 8, color: '#2874f0' }} />
                                <Typography style={{ fontWeight: 600, color: '#2874f0' }}>My Orders</Typography>
                            </Container>
                            <Box onClick={logout}>
                                <PowerSettingsNew style={{ marginRight: 8, color: '#2874f0' }} />
                                <Typography style={{ fontWeight: 600, color: '#2874f0' }}>Logout</Typography>
                            </Box>
                        </>
                    ) : (
                        <Profile account={account} setAccount={setAccount} />
                    )
                ) : (
                    <LoginButton variant="contained" onClick={() => openDialog()}>
                        Login
                    </LoginButton>
                )
            }
            <Box onClick={() => alert('Feature coming soon!')}>
                <Storefront style={{ marginRight: 8 }} />
                <Typography>Become a Seller</Typography>
            </Box>
            
            <Box onClick={() => alert('Feature coming soon!')}>
                <Apps style={{ marginRight: 8 }} />
                <Typography>More</Typography>
            </Box>
            
            <Container to='/cart'>
                <Badge badgeContent={cartItems?.length} color="secondary" style={{ marginRight: 8 }}>
                    <ShoppingCart />
                </Badge>
                <Typography>Cart</Typography>
            </Container>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Wrapper>
    )
}

export default CustomButtons;