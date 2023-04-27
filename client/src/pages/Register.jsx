import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
  AlertIcon,
  AlertTitle,
  Alert,
  AlertDescription,
  useToast,
  useColorModeValue,
  Flex,
  InputGroup,
  InputLeftAddon,
  Input,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import { register } from '../redux/actions/userActions';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = '/products';
  const toast = useToast();
  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  // const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });
  const boxBR = useColorModeValue('white', 'gray.700')
  const bgColor=useColorModeValue('gray.50', 'gray.800');

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({ description: 'Account created. Welcome aboard.', status: 'success', isClosable: true });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={{ email: '', password: '', fullname: '',phone:'' }}
      validationSchema={Yup.object({
        fullname: Yup.string().required('An name is required.'),
        email: Yup.string().email('Invalid email.').required('An email address is required.'),
        password: Yup.string()
          .min(1, 'Password is too short - must contain at least 1 character.')
          .required('Password is required.'),
        confirmPassword: Yup.string()
          .min(1, 'Password is too short - must contain at least 1 character.')
          .required('Password is required.')
          .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
        phone: Yup.string()
          .min(8, "too short")
  .required("required")
  .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
  .max(8, "too long"),
      })}
      onSubmit={(values) => {
        dispatch(register(values.fullname, values.email, values.password,values.phone,values.address,values.city,values.postalCode));
      }}>
      {(formik) => (
        <Flex  py={{ base: '12', md: '24' }}  px={{ base: '0', md: '8' }} minH='4xl' bg={bgColor} justifyContent="center" >
          <Stack spacing='8' w={"50%"}>
            <Stack spacing='6'>
              <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                <Heading size={headingBR}>Create an account.</Heading>
                <HStack spacing='1' justify='center'>
                  <Text color='muted'>Already a user? </Text>
                  <Button as={ReactLink} to='/registration' variant='link' colorScheme='orange'>
                    Sign in
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', md: '8' }}
              px={{ base: '4', md: '10' }}
              bg={ boxBR }
              rounded={'lg'}
              boxShadow={{ base: 'none', md: 'xl' }}>
              <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status='error'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'>
                    <AlertIcon />
                    <AlertTitle>We are sorry!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing='5'>
                  <FormControl>
                    <TextField type='text' name='fullname' placeholder='Your first and last name.' label='Full name' alt="req" />
                    <TextField type='text' name='email' placeholder='you@example.com' label='Email' alt="req" />
                    <PasswordTextField type='password' name='password' placeholder='your password' label='Password' alt="req" />
                    <PasswordTextField
                      type='password'
                      name='confirmPassword'
                      placeholder='Confirm your password'
                      label='Confirm your password'
                      alt="req"
                    />

                    
                      <TextField type='tel' name='phone' placeholder='phone number' label='Phone' alt="req" />
                  <TextField name='address' placeholder='Street Address' label='Street Address' alt="Nreq" />
                      <Flex>
                        <Box flex='1' mr='10'>
                          <TextField name='postalCode' placeholder='Postal Code' label='Postal Code' type='number' alt="Nreq" />
                        </Box>
                        <Box flex='2'>
                          <TextField name='city' placeholder='City' label='City' alt="Nreq" />
                        </Box>
                      </Flex>
                   
          
                  </FormControl>
                </Stack>
                <Stack spacing='6'>
                  <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      )}
    </Formik>
  );
};

export default Register;
