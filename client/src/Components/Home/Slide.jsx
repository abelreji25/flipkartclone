

import { Button, Divider, Box, Typography, styled } from '@mui/material';

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Countdown from 'react-countdown';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Component = styled(Box)`
    margin-top: 15px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(226, 232, 240, 0.6);
    overflow: hidden;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 16px 24px;
    align-items: center;
`

const DealText = styled(Typography)`
    font-size: 20px;
    font-weight: 700;
    line-height: 32px;
    margin-right: 20px;
    color: #0f172a;
`

const Timer = styled(Box)`
    color: #ef4444;
    margin-left: 10px;
    display: flex;
    align-items: center;
    background: rgba(239, 68, 68, 0.08);
    padding: 6px 14px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 13px;
    border: 1px solid rgba(239, 68, 68, 0.1);
    & > img {
        margin-right: 6px;
        filter: invert(38%) sepia(58%) saturate(3501%) hue-rotate(338deg) brightness(99%) contrast(92%);
    }
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 20px;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
    text-transform: none;
    transition: all 0.2s ease;
    color: #ffffff;
    display: flex;
    align-items: center;
    &:hover {
        background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
        transform: translateY(-1px);
        box-shadow: 0 6px 15px rgba(37, 99, 235, 0.25);
    }
    & svg {
        transition: transform 0.3s ease;
    }
    &:hover svg {
        transform: translateX(4px);
    }
`;

const ProductCard = styled(Box)`
    padding: 25px 15px;
    text-align: center;
    cursor: pointer;
    background: #ffffff;
    border-radius: 16px;
    margin: 15px 8px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(226, 232, 240, 0.8);
        background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
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
})

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 6px;
`

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

const TaglineText = styled(Typography)`
    color: #64748b;
    opacity: 0.85;
    font-size: 13px;
    margin-top: 5px;
`;

const RenderTimer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));
      
const MultiSlide = ({ data, timer, title }) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    const navigate = useNavigate();

    const renderer = ({ hours, minutes, seconds }) => {
        return <RenderTimer variant="span">{hours} : {minutes} : {seconds}  Left</RenderTimer>;
    };
    
    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {
                    timer && <Timer>
                                <img src={timerURL} style={{ width: 24 }} alt='time clock' />
                                <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                        </Timer>
                }
                <ViewAllButton onClick={() => navigate('/products')}>
                    View All <KeyboardArrowRightIcon fontSize="small" />
                </ViewAllButton>
            </Deal>
            <Divider />
            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                centerMode={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    data.map(temp => (
                        <ProductCard 
                            key={temp.id}
                            onClick={() => navigate(`/product/${temp.id}`)}
                        >
                            <Image src={temp.url} />
                            <Text style={{ fontWeight: 600 }}>{temp.title.shortTitle}</Text>
                            <DiscountBadge>{temp.discount}</DiscountBadge>
                            <TaglineText>{temp.tagline}</TaglineText>
                        </ProductCard>
                    ))
                }
            </Carousel>
        </Component>
    )
}

const Slide = (props) => {
    return (
        <>
            {
                props.multi === true && <MultiSlide {...props} />
            }
        </>
    )
}

export default Slide;