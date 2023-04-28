import { Box, Heading, VStack, FormControl, Flex, Stack, Text, Radio, RadioGroup, Tooltip } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { useDispatch, useSelector } from 'react-redux';
import { setExpress } from '../redux/actions/cartActions';
import { useState } from 'react';
import { setShippingAddress, setShippingAddressError } from '../redux/actions/orderActions';

const Shippinginfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [formStateChanged, setFormStateChanged] = useState(false);

  const setErrorState = (input, data) => {
    if (!input) {
      dispatch(setShippingAddress(data));
    }
    if ((!formStateChanged && !input) || (formStateChanged && input)) {
      return;
    } else {
      setFormStateChanged(input);
      dispatch(setShippingAddressError(input));
    }
  };

  return (
    <Formik
      initialValues={{ address: '', postalCode: '', city: ''}}
      validationSchema={Yup.object({
        address: Yup.string().required('This field is required.').min(2, 'This address is too short.'),
        postalCode: Yup.string().required('This field is required.').min(2, 'This postal code is too short.'),
        city: Yup.string().required('This field is required.').min(2, 'This city is too short.'),
        
      })}>
      {(formik) => (
        <VStack as='form'>
          <FormControl
            onChange={
              Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length >= 2
                ? setErrorState(false, formik.values)
                : setErrorState(true)
            }>
             
            <TextField name='address' value={userInfo.shippingAddress.address} placeholder='Street Address' label='Street Address' />
            <Flex>
              <Box flex='1' mr='10'>
                <TextField name='postalCode' defaultValue={userInfo.shippingAddress.postalCode} placeholder='Postal Code' label='Postal Code' type='number' />
              </Box>
              <Box flex='2'>
                <TextField name='city' defaultValue={userInfo.shippingAddress.city} placeholder='City' label='City' />
              </Box>
            </Flex>
            
          </FormControl>
          <Box w='100%' h='180px' pr='5'>
            <Heading fontSize='2xl' fontWeight='extrabold' mb='10'>
              Shipping Method
            </Heading>
            <RadioGroup
              defaultValue='false'
              onChange={(e) => {
                dispatch(setExpress(e));
              }}>
              <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
                <Stack pr='10' spacing={{ base: '8', md: '10' }} flex='1.5'>
                  <Box>
                    <Radio value='true'>
                      <Text fontWeight='bold'>Express 14.99 DT</Text>
                      <Text>Dispatched in 24 hours.</Text>
                    </Radio>
                  </Box>
                  <Stack spacing='6'>Express</Stack>
                </Stack>
                <Radio value='false'>
                  <Tooltip label='Free shipping for orders of 1000DT or more!'>
                    <Box>
                      <Text fontWeight='bold'>Standard 4.99DT</Text>
                      <Text>Dispatched in 2 - 3 days</Text>
                    </Box>
                  </Tooltip>
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </VStack>
      )}
    </Formik>
  );
};

export default Shippinginfo;
