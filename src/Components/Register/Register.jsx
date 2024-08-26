import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
export default function Register() {

  const [isLoading,setIsLoading] = useState(false)
  const [errorMsg,setErrorMsg] = useState("")
  const [successMsg,setsuccessMsg] = useState("")
const navigate = useNavigate()

let { handleSubmit,values,handleChange,errors,touched,handleBlur } = useFormik({
    initialValues: {
        "name":   "",
        "email":   "",
        "password": "",
        "rePassword": "",
        "Phone":""
    },
    onSubmit:register,
    validationSchema: Yup.object({

        name: Yup.string().required("Name is required").min(3,"Name length must be more than 2 lenght").max(20,"Name length must be lessthan 20"),
        email: Yup.string().required("email is required").email("enter valid email"),
        password: Yup.string().required("password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Minimum eight characters, at least one letter, one number and one special character"),
        rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref("password")],"password and rePassword must ba matched"),
        Phone: Yup.string().required("Phone is required")

    })
})



 async function register()
{
  setErrorMsg("");
  setsuccessMsg("");
  setIsLoading(true);

   let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then(({data})=> {
    setIsLoading(false);
    setsuccessMsg(data.message)
   setTimeout(() => {
    navigate("/Login")
   }, 500);
   }).catch((err)=> {
    setIsLoading(false);
    setErrorMsg(err.response.data.message)
    
   })
   
   
}



  return (
    
<>
   <Helmet>
   <title>
     Register
   </title>
 </Helmet>
  <div className='min-h-screen flex justify-center items-center'>
    <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to FreshCart</h1>
    <form onSubmit={handleSubmit}  className="w-full flex flex-col gap-4">

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.name} type="text" id="name" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
        {touched.name && errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

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
    
      <div className="flex items-start flex-col justify-start">
        <label htmlFor="confirmPassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Confirm Password:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.rePassword} type="password" id="confirmPassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-800"/>
        {touched.rePassword && errors.rePassword && <p className="text-red-500">{errors.rePassword}</p>}
      </div>

      <div className="flex items-start flex-col justify-start">
        <label htmlFor="Phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone Number:</label>
        <input onBlur={handleBlur} onChange={handleChange} value={values.Phone} type="tel" id="Phone" name="Phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-green-800"/>
        {touched.Phone && errors.Phone && <p className="text-red-500">{errors.Phone}</p>}
      </div>

      <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled={isLoading}>Register {isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>
      {errorMsg && <p className='text-red-500 text-center'>{errorMsg}</p>}
      {successMsg && <p className='text-green-500 text-center'>{successMsg}</p>}
    </form>

    <div className="mt-4 text-center">
      <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
      
      <Link to={"/Login"} className="text-green-700 hover:text-green-800">Login</Link>
    </div>
    </div>
  </div>

  </>
  )
}
