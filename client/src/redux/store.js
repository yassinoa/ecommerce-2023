import {combineReducers, configureStore} from "@reduxjs/toolkit"
import products from "./slices/products"
import cart from "./slices/cart"
import user from "./slices/user"
import order from "./slices/order"
import categorys from "./slices/categorys"
const reducer = combineReducers({ 
  products,
  cart,
  user,
  order,
  categorys
})

export default configureStore({
  reducer
})