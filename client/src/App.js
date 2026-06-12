import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, NotFound } from './Components/default';
import { styled, Box } from '@mui/material';

//components
import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Orders from './Components/Orders/Orders';

const MainContainer = styled(Box)(({ theme }) => ({
  marginTop: 100,
  [theme.breakpoints.down('md')]: {
    marginTop: 115
  }
}));

function App() {
  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <MainContainer>
            <Routes>
              <Route path= '/' element={<Home />} />
              <Route path= '/cart' element={<Cart />} />
              <Route path= '/products' element={<Products />} />
              <Route path= '/product/:id' element={<DetailView />} />
              <Route path= '/orders' element={<Orders />} />
              <Route path= '*' element={<NotFound />} />
            </Routes>
          </MainContainer>
        </BrowserRouter>
      </ContextProvider>
    </TemplateProvider>
  );
}

export default App;
