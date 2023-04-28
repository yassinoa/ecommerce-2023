import { createSlice } from "@reduxjs/toolkit"

export const initialState={
  loading:false,
  error:null,
  category:[]
}

export const categorysSlice= createSlice({
  name:'categorys',
  initialState,
  reducers:{
    setLoading:(state)=>{
      state.loading=true
    },
    setCategorys:(state,{payload})=>{
      state.loading=false;
      state.error=null;
      state.category=payload;
    },
    setError:(state,{payload})=>{
      state.error=payload;
      state.loading=false;
    }
  }
})

export const {setLoading,setError,setCategorys}=categorysSlice.actions;
export default categorysSlice.reducer;

export const categorysSelector=(state)=> state.categorys;