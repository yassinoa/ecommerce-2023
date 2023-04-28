import { Box, Heading, Stack, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Shippinginfo from '../components/Chippinginfo';
import CheckoutOrder from '../components/CheckoutOrder';

const Checkout = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo ? (
    <Box
      minH='100vh'
      maxW={{ base: '3xl', lg: '7xl' }}
      mx='auto'
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}>
      <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
        <Stack spacing={{ base: '8', md: '10' }} flex='1.5' mb={{ base: '12', md: 'none' }}>
          <Heading fontSize='2xl' fontWeight='extrabold'>
            Shipping Information
          </Heading>
          <Stack spacing='6'>
            <Shippinginfo />
          </Stack>
        </Stack>
        <Flex direction='column' align='center' flex='1'>
          <CheckoutOrder />
        </Flex>
      </Stack>
    </Box>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default Checkout;
