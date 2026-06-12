import React, { useState, useEffect } from 'react';

import { Dialog, DialogContent, TextField, Box, Button, Typography, styled, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { authenticateLogin, authenticateSignup } from '../../service/api';

const Component = styled(DialogContent)(({ theme }) => ({
    height: '80vh',
    width: '110vh',
    padding: 0,
    paddingTop: 0,
    background: '#f8fafc',
    borderRadius: '16px',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: '85vh',
        overflowY: 'auto'
    }
}));

const LoginButton = styled(Button)`
    text-transform: none;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    height: 54px;
    min-height: 54px;
    border-radius: 12px;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: 0 8px 25px -5px rgba(102, 126, 234, 0.4);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
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
    &:active {
        transform: translateY(-1px);
    }
`;

const RequestOTP = styled(Button)`
    text-transform: none;
    background: transparent;
    color: #667eea;
    height: 50px;
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.3s ease;
    &:hover {
        border-color: #667eea;
        background: rgba(102, 126, 234, 0.05);
        transform: translateY(-1px);
    }
`;

const Text = styled(Typography)`
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.5;
`;

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #667eea;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 2px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        transition: width 0.3s ease;
    }
    &:hover {
        color: #764ba2;
        &::after {
            width: 80%;
        }
    }
`;

const StyledTextField = styled(TextField)({
    marginTop: '12px !important',
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        fontSize: '15px',
        color: '#1e293b',
        backgroundColor: '#f8fafc',
        transition: 'all 0.3s ease',
        '& fieldset': {
            borderColor: '#e2e8f0',
            borderWidth: '1.5px',
            transition: 'all 0.3s ease',
        },
        '&:hover fieldset': {
            borderColor: '#667eea',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#667eea',
            borderWidth: '2px',
            boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
        },
        '&.Mui-focused': {
            backgroundColor: '#ffffff',
        }
    },
    '& .MuiInputLabel-root': {
        color: '#94a3b8',
        fontSize: '14px',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        '&.Mui-focused': {
            color: '#667eea',
            fontWeight: 600,
        }
    }
});

const Wrapper = styled(Box)(({ theme }) => ({
    padding: '45px 50px',
    display: 'flex',
    flex: 1,
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    animation: 'slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    '@keyframes slideIn': {
        '0%': { opacity: 0, transform: 'translateY(20px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' }
    },
    '& > div, & > button, & > p': {
        marginTop: '18px'
    },
    '& > div:nth-of-type(1)': { animationDelay: '0.1s' },
    '& > div:nth-of-type(2)': { animationDelay: '0.2s' },
    '& > div:nth-of-type(3)': { animationDelay: '0.3s' },
    [theme.breakpoints.down('sm')]: {
        padding: '25px 20px',
        overflow: 'visible'
    }
}));

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 1.2;
    margin-top: 10px;
    font-weight: 600;
`
// height: 70vh;
    
const Image = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, #0f172a 0%, #1e3a5f 30%, #667eea 70%, #764ba2 100%)`,
    backgroundSize: '400% 400%',
    animation: 'gradientShift 8s ease infinite',
    position: 'relative',
    overflow: 'hidden',
    width: '40%',
    height: '100%',
    padding: '50px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderTopLeftRadius: '16px',
    borderBottomLeftRadius: '16px',
    '@keyframes gradientShift': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' }
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '15%',
        right: '-20%',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'rgba(118, 75, 162, 0.3)',
        filter: 'blur(60px)',
        animation: 'floatOrb1 6s ease-in-out infinite',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: '10%',
        left: '-10%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'rgba(102, 126, 234, 0.25)',
        filter: 'blur(50px)',
        animation: 'floatOrb2 8s ease-in-out infinite',
    },
    '@keyframes floatOrb1': {
        '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
        '50%': { transform: 'translate(-30px, 40px) scale(1.1)' }
    },
    '@keyframes floatOrb2': {
        '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
        '50%': { transform: 'translate(20px, -30px) scale(1.15)' }
    },
    '& > h5': {
        color: '#FFFFFF',
        fontWeight: 700,
        fontSize: '30px',
        marginBottom: '20px',
        position: 'relative',
        zIndex: 1,
        letterSpacing: '-0.5px',
        lineHeight: 1.2,
        animation: 'fadeUp 0.8s ease forwards',
    },
    '& > p': {
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: '15px',
        lineHeight: 1.7,
        position: 'relative',
        zIndex: 1,
        animation: 'fadeUp 0.8s 0.2s ease forwards',
        opacity: 0,
    },
    '@keyframes fadeUp': {
        '0%': { opacity: 0, transform: 'translateY(15px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' }
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: '200px',
        borderBottomLeftRadius: 0,
        borderTopRightRadius: '16px'
    }
}));

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}

const getPasswordErrors = (password) => {
    if (!password) return [];
    const errors = [];
    if (password.length < 8) errors.push('8 characters');
    if (!/[A-Z]/.test(password)) errors.push('1 uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('1 lowercase letter');
    if (!/\d/.test(password)) errors.push('1 number');
    if (!/[@$!%*?&]/.test(password)) errors.push('1 special character');
    return errors;
}

const LoginDialog = ({ open, setOpen, setAccount }) => {
    const [ login, setLogin ] = useState(loginInitialValues);
    const [ signup, setSignup ] = useState(signupInitialValues);
    const [ error, showError] = useState('');
    const [ account, toggleAccount ] = useState(accountInitialValues.login);
    const [ showPassword, setShowPassword ] = useState(false);

    const passwordErrors = getPasswordErrors(signup.password);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        showError('');
    }, [login, signup])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async() => {
        let response = await authenticateLogin(login);
        if(!response || response.status !== 200) 
            showError('Invalid Login details');
        else {
            showError('');
            handleClose();
            setAccount(login.username);
        }
    }

    const signupUser = async() => {
        let response = await authenticateSignup(signup);
        if(!response || response.status !== 200) {
            const errorMsg = response?.data?.message || 'Registration failed! Please check your details.';
            showError(errorMsg);
            return;
        }
        showError('');
        handleClose();
        setAccount(signup.username);
    }
    
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setLogin(loginInitialValues);
        setSignup(signupInitialValues);
        showError('');
    }

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.35)' } }}>
            <Component>
                <Box sx={{ display: 'flex', height: { xs: 'max-content', md: '100%' }, flexDirection: { xs: 'column', md: 'row' } }}>
                    <Image>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{marginTop: 20}}>{account.subHeading}</Typography>
                    </Image>
                    {
                        account.view === 'login' ? 
                        <Wrapper>
                            <StyledTextField variant="outlined" value={login.username} onChange={(e) => onValueChange(e)} name='username' label='Enter Username' />
                            { error && <Error>{error}</Error> }
                            <StyledTextField 
                                variant="outlined" 
                                value={login.password} 
                                type={showPassword ? "text" : "password"} 
                                onChange={(e) => onValueChange(e)} 
                                name='password' 
                                label='Enter Password' 
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                            <LoginButton onClick={() => loginUser()} >Login</LoginButton>
                            <Text style={{textAlign:'center'}}>OR</Text>
                            <RequestOTP onClick={() => alert('Feature coming soon!')}>Request OTP</RequestOTP>
                            <CreateAccount onClick={() => toggleSignup()}>New to Flipkart? Create an account</CreateAccount>
                        </Wrapper> : 
                        <Wrapper>
                            <StyledTextField variant="outlined" value={signup.firstname} onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                            <StyledTextField variant="outlined" value={signup.lastname} onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                            <StyledTextField variant="outlined" value={signup.username} onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <StyledTextField variant="outlined" value={signup.email} onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            <StyledTextField 
                                variant="outlined" 
                                value={signup.password} 
                                type={showPassword ? "text" : "password"} 
                                onChange={(e) => onInputChange(e)} 
                                name='password' 
                                label='Enter Password' 
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <StyledTextField variant="outlined" value={signup.phone} onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                            { passwordErrors.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px', mt: '8px !important' }}>
                                    <Typography sx={{ fontSize: 10, color: '#ff6161', width: '100%', fontWeight: 600 }}>Password needs:</Typography>
                                    {passwordErrors.map((err, index) => (
                                        <Typography key={index} sx={{ fontSize: 9, color: '#ff6161', background: '#ffe6e6', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                                            {err}
                                        </Typography>
                                    ))}
                                </Box>
                            )}
                            { error && <Error>{error}</Error> }
                            <LoginButton disabled={passwordErrors.length > 0} onClick={() => signupUser()} >Continue</LoginButton>
                        </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;