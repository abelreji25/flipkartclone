import { Typography, Box, styled } from '@mui/material'; 

import { navData } from '../../constant/data';

const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 0 15px 0 !important',
    overflowX: 'auto',
    background: '#ffffff',
    padding: '12px 25px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    border: '1px solid rgba(226, 232, 240, 0.7)',
    '&::-webkit-scrollbar': {
        display: 'none'
    },
    [theme.breakpoints.down('lg')]: {
        margin: '0 10px 10px 10px !important',
        padding: '10px 15px'
    }
}))

const Container = styled(Box)`
    padding: 8px 12px;
    text-align: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-width: 90px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    & > div > img {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    &:hover {
        transform: translateY(-5px);
    }
    &:hover > div > img {
        transform: scale(1.08);
    }
    &:hover > p {
        color: #2563eb;
    }
`

const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    color: #475569;
    margin-top: 6px;
    transition: color 0.2s ease;
`;

const NavBar = () => {
    return (
        <Component>
            {
                navData.map(temp => (
                    <Container key={temp.text}>
                        <Box style={{ height: 85, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <img src={temp.url} style={{ width: 85 }} alt={temp.text} />
                        </Box>
                        <Text>{temp.text}</Text>
                    </Container>
                ))
            }
        </Component>
    )
}

export default NavBar;