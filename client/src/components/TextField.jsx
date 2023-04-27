import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Field, useField } from 'formik';
import{Box, Flex, InputGroup,InputLeftAddon, Stack, Text} from '@chakra-ui/react';

const TextField = ({ label, type, name, placeholder,alt }) => {
  const [field, meta] = useField({ type, name, placeholder,alt });
  
  return (
    <FormControl isInvalid={meta.error && meta.touched} mb='6'>
      <FormLabel > <Flex  >{label}<Box ml={2} color="red">{alt==="req" && " *"}</Box></Flex></FormLabel>
      <InputGroup >
                      {type==="tel" && <InputLeftAddon children='+216' />}
      <Field as={Input} {...field} type={type} name={name} placeholder={placeholder} />
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
