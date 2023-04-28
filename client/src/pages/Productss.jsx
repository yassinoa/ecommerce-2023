import { Flex, HStack, Select, Stack, Text, VStack,Wrap,useColorModeValue as mode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import FilterProduct from '../components/FilterProduct'
import Productt from './Productt'

const Productss = () => {
  return (
    <Flex bg={"gray300"} justifyContent={'space-around'} pt={5}>
      <FilterProduct/>
      <Wrap width={"70%"} bg={useColorModeValue("gray.100", "gray.700")} rounded="lg">
        <Productt />
      </Wrap>
    </Flex>
  )
}

export default Productss