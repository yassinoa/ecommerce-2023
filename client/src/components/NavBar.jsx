import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
  useToast,
  MenuButton,
  MenuDivider,
  Menu,
  MenuList,
  MenuItem,
  Input,
  FormControl,
} from '@chakra-ui/react';
import './NavBar.css'
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { CgProfile } from 'react-icons/cg';
import { MdLocalShipping, MdLogout, MdOutlineAdminPanelSettings } from 'react-icons/md'; 
import { FiShoppingCart } from 'react-icons/fi';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { useRef } from 'react';
import { setFilterInp } from '../redux/actions/productActions';


const ShoppingCartIcon = () => {
  const cartInfo = useSelector((state) => state.cart);
  
  const { cart } = cartInfo;
  return (
    <Flex>
      <Stack bg="red" h={5}  p={'5px'} rounded='100%'>

      <Text fontStyle='italic' as='sub' fontSize='xs' color="white" >
        {cart.length}
      </Text>
      </Stack>
      <Icon ml='-1.5' as={FiShoppingCart} h='4' w='7' alignSelf='center' />
      Cart
    </Flex>
  );
};


const links = [
  { linkName: "Products", path: "/productss" },
  { linkName: <ShoppingCartIcon />, path: "/cart" },
];

//creation modele navlink pour tous link

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    //border radius
    rounded="md"
    _hover={{ textDecoration: "none", bg: useColorModeValue("gray.200", "gray.700") }}
  >
    {children}
  </Link>
);

const NavBar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  
  const productList= useSelector((state)=>state.products)
  const {filterinp}=productList
  
  const dispatch = useDispatch();
  const toast = useToast();
  // const inputsearch= useRef();
  // + inputsearch.current.value
  // const navigate = usenavigate
  const logoutHandler =() =>{
    dispatch(logout())
    toast({description:'You have been logged out',status:'success',isClosable:true})
  }


  // const handleSub=(e)=>{
  //   e.preventDefault();
  // navigate('/products')
  // console.log("nav")
  // }
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} >
      {/* <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} style={{position:"fixed"}} w='100%'></Box> */}
      <Flex h={16} alignitems='center' justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        
            {/* Nav left */}
        <HStack>
          <Link as={ReactLink} to="/">
            {/* displayflex */}
            <Flex alignItems='center'>
              <img src='icon.png' height="40px" width="40px" alt='icon'  />
              <Text fontWeight="extrabold" ml="5px">Ecommerce</Text>
            </Flex>
          </Link>
          <HStack as="nav" spacing={4} display={{base:"none", md:"flex"}} >
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            

                
            <Box className='searchbar' size={'20px'} >

            
            
              <Input placeholder='search your product' size={0} className='searchInput' defaultValue={filterinp}   border={0} variant="unstyled" color={"gray.700"} 
              onChange={(e) => {
                dispatch(setFilterInp(e.target.value));
              }}
              />
              <Button as={ReactLink} to={'/products/'+filterinp} colorScheme='transparent'><SearchIcon color={"gray.700"}  /> </Button>
              
              
 
            </Box>
          </HStack>
          
        </HStack>

        <Flex alignItems="center">
          
            <Icon
              as={colorMode === "light" ? MoonIcon : SunIcon}
              alignSelf="center"
              onClick={() => toggleColorMode()}
            />
          {userInfo ? (
            <Menu>
              <MenuButton px='4' py='2' transition='all 0.3s' as={Button}>
                {userInfo.fullname} <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem as={ReactLink} to='/profile'>
                  <CgProfile />
                  <Text ml='2'>Profile</Text>
                </MenuItem>
                <MenuItem as={ReactLink} to='/your-orders'>
                  <MdLocalShipping />
                  <Text ml='2'>Your Orders</Text>
                </MenuItem>
                {userInfo.isAdmin === 'true' && (
                  <>
                    <MenuDivider />
                    <MenuItem as={ReactLink} to={'/admin-console'}>
                      <MdOutlineAdminPanelSettings />
                      <Text ml='2'>Admin Console</Text>
                    </MenuItem>
                  </>
                )}
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>
                  <MdLogout />
                  <Text ml='2'>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
             <>
          <Button as={ReactLink} to="/login" p={2} fontSize="sm" fontWeight={400} variant="link">
            Sign In
          </Button>
          <Button
            as={ReactLink}
            to="/registration"
            m={2}
            display={{base:"none",md:"inline-flex"}}
            fontSize="sm"
            fontWeight={600}
            _hover={{ bg: "orange.400" }}
            bg="orange.500"
            color="white"
            >
            Sign Up
          </Button>
            </> 
          )}
        </Flex>
      </Flex>
      
{/* nav bar mobile */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
            <NavLink key="sign up" path='/registration'>
              sign up
            </NavLink>
            <Box className='searchbar' size={'20px'}>

              <Input placeholder='search your product' size={0} className='searchInput' border={0} variant="unstyled" />
              <SearchIcon className='searchIcon' /> 
            </Box>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default NavBar;
