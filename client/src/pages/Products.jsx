import { Flex, HStack, Select, Stack, Text, VStack,Wrap,useColorModeValue as mode } from '@chakra-ui/react'
import React from 'react'
import FilterProduct from '../components/FilterProduct'
import Product from './Product'

const Products = () => {
  return (
    <Flex bg={"gray300"} justifyContent={'space-around'}>
      <FilterProduct/>
      <Wrap width={"70%"} bg={'orange.100'}>
        <Product />
      </Wrap>
    </Flex>
  )
}

export default Products