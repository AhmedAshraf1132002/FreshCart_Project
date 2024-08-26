import axios from 'axios'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';

export default function Orders() {




  const [orders , setOrders] = useState([])

function getUserOrder()
{
 axios.get("https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17")
 setOrders(data.data);

}
let { data } = useQuery({
  queryKey: ["orders"],
  queryFn: getUserOrder,
});



  return (
    <>
    <Helmet>
      <title>
         All Orders
      </title>
    </Helmet>

    
   
    </>
  )
}
