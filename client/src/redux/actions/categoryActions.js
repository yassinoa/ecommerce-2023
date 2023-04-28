import axios from "axios"
import {setCategorys,setError,setLoading, } from "../slices/categorys"

export const getCategorys=()=> async(dispatch)=>{
  dispatch(setLoading(true))
  try {
    const {data}= await axios.get('/api/categorys')
    dispatch( setCategorys(data))
  } catch (error) {
    console.log(error);
    dispatch(
      setError(
        error.response && error.response.data.message
          ?error.response.data.message
          :error.message
          ?error.message
          :"An unaxepted error has occured. Please try again later"
      )
    )
  }
}

