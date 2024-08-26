import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../Contexts/AuthContext';
import { Helmet } from 'react-helmet';
export default function Login() {

  const [isLoading,setIsLoading] = useState(false)
  const [errorMsg,setErrorMsg] = useState("");
  const navigate =useNavigate();
let {setUserToken} = useContext(AuthContext)



const validationSchema=Yup.object({

    email: Yup.string().required("email is required").email("enter valid email"),
    password: Yup.string().required("password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Minimum eight characters, at least one letter, one number and one special character"),
    
})

const initialValues={
    "email":   "",
    "password": ""
};

let { handleSubmit,values,handleChange,errors,touched,handleBlur } = useFormik({
    initialValues,
    onSubmit,
    validationSchema
    })




 async function onSubmit()
{

  setErrorMsg("");
  setIsLoading(true)
   let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then(({data})=> {
   setIsLoading(false)
   setUserToken(data.token);
   localStorage.setItem("token",data.token)
   if(location.pathname == "/Login")
   {
    navigate("/")
   }else{
    navigate(location.pathname)
   }
   navigate(location.pathname)
  

   }).catch((err)=> {

   setIsLoading(false)
   setErrorMsg(err.response.data.message)
   })
   
}

  return (
   <>
    <Helmet>
    <title>
      Login
    </title>
  </Helmet>

  <div className='py-24 flex justify-center items-center'>
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
    <form onSubmit={handleSubmit}  className="w-full flex flex-col gap-4">

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
       <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-800"/>
      {touched.email && errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-800"/>
        {touched.password && errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400 " disabled={isLoading} >Login {isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>
     {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
    </form>

    <div className="mt-4 text-center">
      <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
      <Link to={"/Register"} className="text-green-700 hover:text-green-800">Register</Link>
    </div>
    </div>
  </div>
  </> 
    
  )
}
