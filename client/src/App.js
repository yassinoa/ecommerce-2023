import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <ChakraProvider>
    <BrowserRouter>
      <NavBar />
      
      <main>
        <Routes>
        <Route path='/' element={<Home/>} />
          {/* <Route path='/products' element={<ProductsScreens/>} />
          <Route path='/product/:id' element={<ProductScreen/>} />
          <Route path='/cart' element={<CartScreen/>} /> */}
          <Route path='/login' element={<Login/>} />
          <Route path='/registration' element={<Register/>} />
          {/* <Route path='/profile' element={<ProfileScreen/>} />
          <Route path='/checkout' element={<CheckoutScreen/>} /> */}
        </Routes>
         </main>
         {/* <Footer/> */}
    </BrowserRouter>

  </ChakraProvider>
  );
}

export default App;
