import { Alert, AlertDescription, AlertIcon, AlertTitle, Radio, RadioGroup, Select, Spinner, Stack, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getCategorys } from '../redux/actions/categoryActions'
import { setFilterCat, setFilterRate } from '../redux/actions/productActions';

const FilterProduct = () => {
  const dispatch = useDispatch()
  const categoryList= useSelector((state)=>state.categorys)
  const {loading,error,category}=categoryList
  

  const [value, setValue] = useState('1')

  useEffect(()=>{
    dispatch(getCategorys())
  },[dispatch])
 

  return (
    <VStack bg={useColorModeValue("gray.100", "gray.700")} width={"25%"} h={"500px"} pt={5} rounded="lg">
      {loading ? (
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
        </Stack>
      ): error ? (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
      ):(
        <>
        <Stack spacing={2 } direction={{base:'column',md:'row'}} display={"flex"} alignItems={"center"}>
          <Text fontWeight='bold'>Category :</Text>
          <Select maxW='200px' placeholder='All Category' onChange={(e)=>{
            dispatch(setFilterCat(e.target.value))
            
          }
            }  >
            {category.map((categorys)=>(

              <option key={categorys._id} value={categorys._id}>{categorys.name}</option>
              )
              )}
            
          </Select>
        </Stack>

        <Stack spacing={2 } direction={{base:'column',md:'row'}} >
          <Text fontWeight='bold' >Rate :</Text>
          <RadioGroup onChange={(e)=>{
            console.log(e)
            dispatch(setFilterRate(e))
            }} >
          <Stack direction={'column'}>
          <Radio value='5'><StarIcon color='orange.500' /><StarIcon color='orange.500' /><StarIcon color='orange.500' /><StarIcon color='orange.500' /><StarIcon color='orange.500' /></Radio>
            <Radio value='4'><StarIcon color='orange.500' /><StarIcon color='orange.500' /><StarIcon color='orange.500' /><StarIcon color='orange.500' /><StarIcon color='gray.200' /> & UP</Radio>
            <Radio value='3'><StarIcon color='orange.500' /><StarIcon color='orange.500' /><StarIcon color='orange.500' /><StarIcon color='gray.200' /><StarIcon color='gray.200' /> & UP</Radio>
            <Radio value='2'><StarIcon color='orange.500' /><StarIcon color='orange.500' /><StarIcon color='gray.200' /><StarIcon color='gray.200' /><StarIcon color='gray.200' /> & UP</Radio>
            <Radio value='1' defaultChecked ><StarIcon color='orange.500' /><StarIcon color='gray.200' /><StarIcon color='gray.200' /><StarIcon color='gray.200' /><StarIcon color='gray.200' /> & UP</Radio>
          </Stack>
          </RadioGroup>
        </Stack>
              </>
      )}
      </VStack>
  )
}

export default FilterProduct