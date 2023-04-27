import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Field, useField } from 'formik';
import { useState } from 'react';
import { InputRightElement, Button, InputGroup, Flex, Box } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const PasswordTextField = ({ label, type, name, placeholder ,alt }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({ type, name, placeholder ,alt });
  return (
    <FormControl isInvalid={meta.error && meta.touched} mb='6'>
      <FormLabel noOfLines={1}><Flex  >{label}<Box ml={2} color="red">{alt==="req" && " *"}</Box></Flex></FormLabel>
      <InputGroup>
        <Field as={Input} {...field} type={showPassword ? 'text' : type} name={name} placeholder={placeholder} />
        <InputRightElement h='full'>
          <Button variant='ghost' onClick={() => setShowPassword((showPassword) => !showPassword)}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordTextField;
