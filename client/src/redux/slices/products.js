import { createSlice } from "@reduxjs/toolkit"

export const initialState={
  loading:false,
  error:null,
  products:[],
  product:null,
  filterinp:"",
  filterrate:1,
  catName:"all",
  catId:""
}

export const productsSlice= createSlice({
  name:'products',
  initialState,
  reducers:{
    setLoading:(state)=>{
      state.loading=true
    },
    setProducts:(state,{payload})=>{
      state.loading=false;
      state.error=null;
      state.products=payload;
    },
    setProduct:(state,{payload})=>{
      state.product=payload
      state.loading=false
      state.error=null

    },
    setError:(state,{payload})=>{
      state.error=payload;
      state.loading=false;
    },
    setFilterI: (state, { payload }) => {
      state.filterinp = payload;
    },
    setFilterR: (state, { payload }) => {
      state.filterrate = payload;
    },
    setFilterC: (state, { payload }) => {
      state.catId = payload;
    }
  }
})

export const {setLoading,setError,setProducts,setProduct,setFilterI,setFilterR,setFilterC}=productsSlice.actions;
export default productsSlice.reducer;

export const productsSelector=(state)=> state.products;