
import { Box, Typography, Table, TableBody, TableRow, TableCell, styled } from '@mui/material';
import { LocalOffer as Badge } from '@mui/icons-material';

const SectionTitle = styled(Typography)`
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 15px;
    margin-top: 10px;
`;

const OffersBox = styled(Box)`
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 30px;
`;

const OfferItem = styled(Box)`
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
    color: #334155;
    font-size: 14px;
    line-height: 1.5;
    &:last-child {
        margin-bottom: 0;
    }
`;

const StyledBadge = styled(Badge)`
    margin-right: 12px;
    color: #3b82f6;
    font-size: 18px;
    margin-top: 2px;
`;

const DetailCard = styled(Box)`
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 25px;
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 20px;
    margin-bottom: 15px;
    align-items: center;
    transition: box-shadow 0.3s ease;
    &:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
`;

const Label = styled(Typography)`
    color: #64748b;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const Value = styled(Box)`
    color: #0f172a;
    font-size: 15px;
    font-weight: 500;
    & p {
        margin: 4px 0 0 0;
        font-size: 14px;
        color: #475569;
    }
`;

const ProductDetail = ({ product }) => {
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const date = new Date(new Date().getTime()+(5*24*60*60*1000));
    
    return (
        <>
            <SectionTitle>Available offers</SectionTitle>
            <OffersBox>
                <OfferItem><StyledBadge />Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</OfferItem>
                <OfferItem><StyledBadge />Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply</OfferItem>
                <OfferItem><StyledBadge />Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs</OfferItem>
                <OfferItem><StyledBadge />Partner Offer Extra 10% off upto ₹500 on next furniture purchase</OfferItem>
            </OffersBox>
            
            <SectionTitle>Product Details</SectionTitle>
            <DetailCard>
                <Label>Delivery</Label>
                <Value>
                    <span style={{ fontWeight: 700 }}>Delivery by {date.toDateString()}</span> | ₹40
                </Value>
            </DetailCard>

            <DetailCard>
                <Label>Warranty</Label>
                <Value>No Warranty</Value>
            </DetailCard>

            <DetailCard style={{ alignItems: 'flex-start' }}>
                <Label style={{ marginTop: 2 }}>Seller</Label>
                <Value>
                    <span style={{ color: '#3b82f6', fontWeight: 700, fontSize: 16 }}>SuperComNet</span>
                    <p>GST invoice available</p>
                    <p>View more sellers starting from ₹329</p>
                </Value>
            </DetailCard>

            <Box style={{ marginBottom: 20, borderRadius: 16, overflow: 'hidden' }}>
                <img src={adURL} style={{ width: '100%', maxWidth: 400, display: 'block' }} alt="ad" />
            </Box>

            <DetailCard style={{ alignItems: 'flex-start', border: 'none', background: '#f8fafc', padding: 20 }}>
                <Label style={{ marginTop: 2 }}>Description</Label>
                <Value style={{ lineHeight: 1.6 }}>{product.description}</Value>
            </DetailCard>
        </>
    )
}

export default ProductDetail;