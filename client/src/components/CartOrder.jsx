import {Badge, Button, Flex, Heading, Stack, Text , useColorModeValue as mode} from '@chakra-ui/react'
import {FaArrowRight} from 'react-icons/fa'
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import {Link as ReactLink, useNavigate} from 'react-router-dom'
const CartOrder = () => {
  const [buttonLoading, setButtonLoading] = useState()
  const standardShipping= Number(4.99).toFixed(2)
  const cartItems =useSelector((state)=> state.cart)
  const {subtotal} = cartItems
  const navigate = useNavigate
  const checkoutHundler=() =>{
    setButtonLoading(true)
 
  }
  return (
    <Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' w='full'>
      <Heading size='md'>Order Summury</Heading>
      <Stack spacing={6}>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode('gray.600','gray.400')}>
            Subtotal
          </Text>
          <Text fontWeight='medium'>{subtotal} DT</Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode('gray.600','gray.400')}>
            Shipping
          </Text>
          <Text fontWeight='medium'>
            {subtotal <=1000 ?(
              standardShipping
            ):(
              <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                Free
              </Badge>
            ) }
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontSize="xl" fontWeight='extrabold'>
            Total
          </Text>
          <Text fontSize="xl" fontWeight='extrabold'>
        {subtotal <=1000 ? Number(subtotal)+ Number(standardShipping):subtotal}DT
          </Text>
        </Flex>
      </Stack>
      <Button as={ReactLink} to='/checkout' colorScheme='orange' size='lg' fontWeight='md' rightIcon={<FaArrowRight />} isLoading={buttonLoading}
              onClick={()=>checkoutHundler()}>
                Checkout
      </Button>
    </Stack>
  )
}

export default CartOrder