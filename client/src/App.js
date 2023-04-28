import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import Productss from './pages/Productss';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductProfile from './pages/ProductProfile';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
      <NavBar />
      
      <main>
        <Routes>
        <Route path='/' element={<Home/>} />
          <Route path='/products/:search' element={<Products/>} />
          <Route path='/productss' element={<Productss/>} />
          {/* <Route path='/productss' element={<Products/>} /> */}
          <Route path='/product/:id' element={<ProductProfile/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/registration' element={<Register/>} />
          {/* <Route path='/profile' element={<ProfileScreen/>} /> */}
          <Route path='/checkout' element={<Checkout/>} />
        </Routes>
         </main>
         <Footer/>
    </BrowserRouter>

  </ChakraProvider>
  );
}

export default App;
