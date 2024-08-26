import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import { Helmet } from 'react-helmet'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
// import logo from './src/assets/react.svg';


export default function Home() {

  const [products,setProducts] = useState([]) 
  const [IsLoading , setIsLoading] = useState(true)

useEffect(()=> {

  getProducts()
},[])

async function getProducts() {
  setIsLoading(true)
  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
  setProducts(data.data);
  setIsLoading(false)
}
if(IsLoading){
  return <LoadingScreen />
}



  return (
    
    <>
   <Helmet>
    <title>Home</title>
    {/* <link rel="icon" type="image/svg+xml" href={logo} /> */}
   </Helmet>

    <div className='grid grid-cols-4 gap-3'>
       
     {products.map((product,index) => {
       
    return <Product product={product} key={index} />



     })}
       
    </div>
    </>
  )
}
