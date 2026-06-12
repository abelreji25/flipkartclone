
import { Box, styled } from '@mui/material';

import { bannerData } from '../../constant/data';
import Carousel from 'react-multi-carousel';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Image = styled('img')(({ theme }) => ({
    width: '100%',
    height: 260,
    objectFit: 'cover',
    display: 'block',
    animation: 'zoomIn 20s infinite alternate linear',
    '@keyframes zoomIn': {
        '0%': { transform: 'scale(1.03)' },
        '100%': { transform: 'scale(1.1)' }
    },
    [theme.breakpoints.down('sm')]: {
        objectFit: 'cover',
        height: 180
    }
}));

const CarouselWrapper = styled(Box)`
    overflow: hidden;
    margin: 10px 0 20px 0;
    border-radius: 16px;
    box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.1);
    background: #FFFFFF;
    position: relative;
    border: 1px solid rgba(226, 232, 240, 0.6);
    & .carousel-container {
        width: 100%;
        margin: 0;
        padding: 0;
    }
    & .react-multi-carousel-item--active {
        z-index: 10;
        position: relative;
    }
    & .react-multi-carousel-item {
        padding: 0;
    }
`;

const Banner = () => {
    return (
        <CarouselWrapper>
            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                showDots={false}
                slidesToSlide={1}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
            >
                {
                    bannerData.map(image => (
                        <Image src={image.url} alt="banner" id={image.id} key={image.id} />
                    ))
                }
            </Carousel>
        </CarouselWrapper>
    )
}

export default Banner;