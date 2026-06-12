import { useState, useEffect } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)(({ theme }) => ({
  borderRadius: 30,
  marginLeft: 30,
  marginRight: 20,
  width: '35%',
  minWidth: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:focus-within': {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3), 0 10px 30px -10px rgba(0,0,0,0.3)',
  },
  '&:focus-within input': {
      color: '#0f172a',
  },
  '&:focus-within svg': {
      color: '#3b82f6',
  },
  [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: 'unset',
      margin: '10px 0',
      '&:focus-within': {
          width: '100%',
      }
  }
}));

const SearchIconWrapper = styled(Box)`
  padding: 8px 16px;
  display: flex;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
    color: #ffffff;
  }
`;

const ListWrapper = styled(List)`
  position: absolute;
  top: 100%;
  left: 0;
  color: #000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin-top: 10px;
  border-radius: 16px;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.2);
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 0;
  overflow: hidden;
  z-index: 1000;
`;

const StyledListItem = styled(ListItem)`
  padding: 0;
  transition: all 0.2s ease;
  &:hover {
      background: rgba(59, 130, 246, 0.1);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #1e293b;
  width: 100%;
  padding: 12px 20px;
  font-weight: 500;
  display: block;
`;

const InputSearchBase = styled(InputBase)`
  font-size: 14px;
  width: 100%;
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
  &::placeholder {
      color: rgba(255, 255, 255, 0.6);
  }
`;

const Search = () => {
    const [ text, setText ] = useState();
    const [ open, setOpen ] = useState(true)

    const getText = (text) => {
        setText(text);
        setOpen(false)
    }

    const getProducts = useSelector(state => state.getProducts);
    const { products } = getProducts;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <SearchContainer>
            <InputSearchBase
              placeholder="Search for products, brands and more"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => getText(e.target.value)}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {
              text && 
              <ListWrapper hidden={open}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).length > 0 ? (
                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                      <StyledListItem key={product.id}>
                        <StyledLink 
                          to={`/product/${product.id}`} 
                          onClick={() => setOpen(true)}  
                        >
                          {product.title.longTitle}
                        </StyledLink>
                      </StyledListItem>
                    ))
                  ) : (
                    <StyledListItem style={{ padding: '12px 20px', color: '#64748b' }}>
                      No products found
                    </StyledListItem>
                  )
                }  
              </ListWrapper>
            }
        </SearchContainer>
    )
}

export default Search;