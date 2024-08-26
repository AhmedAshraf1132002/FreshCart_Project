import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Contexts/AuthContext'


export default function Navbar() {

const [isOpen,setIsOpen]=useState(false)

let { userToken , setUserToken } = useContext(AuthContext)
const navigate = useNavigate()


function signOut()
{
  setUserToken("");
  localStorage.removeItem("token");
  navigate("/Login")
}

  return (
    <>
  
<header className="bg-green-800 absolute w-full  ">
  <nav className="container mx-auto px-6 py-3">
    <div className="flex items-center justify-between">
      <div className='flex items-center'>
      <div className="text-white font-bold text-xl me-8">
        <i className="fa-solid fa-cart-shopping mx-2 fa-1x"></i>
        <a href="#">FreshCart</a>
      </div>
      
      {userToken && <div className="hidden md:block">
        <ul className="flex items-center space-x-2">
        <li><NavLink to={"/"} className="block px-1 py-2 text-white">Home</NavLink></li>
        <li><NavLink to={"/Products"} className="block px-1 py-2 text-white ">Products</NavLink></li>
        <li><NavLink to={"/Categories"} className="block px-1 py-2 text-white ">Categories</NavLink></li>
        <li><NavLink to={"/Brands"} className="block px-1 py-2 text-white ">Brands</NavLink></li>
        <li><NavLink to={"/Cart"} className="block px-1 py-2 text-white ">Cart</NavLink></li>
        </ul>
      </div>}
      <div className="md:hidden">
        <button onClick={()=> setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
          <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      </div>
      <div className='flex gap-2 items-center'>
        <div className="social-icons">
        <a target='_blank' href="https://www.facebook.com/"><i className="fa-brands text-white hover:text-black mx-1 fa-facebook-f"></i></a>
        <a target='_blank' href="https://x.com/?lang=ar"><i className="fa-brands text-white hover:text-black mx-1 fa-twitter"></i></a>
        <a target='_blank' href="https://www.linkedin.com/feed/"><i className="fa-brands text-white hover:text-black mx-1 fa-linkedin"></i></a>
        <a target='_blank' href="https://www.youtube.com/"><i className="fa-brands text-white hover:text-black mx-1 fa-youtube"></i></a>
        <a target='_blank' href="https://www.tiktok.com/ar/"><i className="fa-brands text-white hover:text-black mx-1 fa-tiktok"></i></a>
        </div>
        <div>
      <ul className='flex gap-1 '>
       
      {!userToken && <>
       <li><NavLink to={"/Login"} className="block px-1 py-2 text-white ">Login</NavLink></li>
       <li><NavLink to={"/Register"} className="block px-1 py-2 text-white ">Register</NavLink></li>
       </>}

        {userToken && <li> <button onClick={signOut} className="block px-1 py-2 text-white ">SignOut</button> </li>}
      </ul>
        </div>
      </div>
    </div>
   {userToken && <div className={isOpen ? "mobile-menu md:hidden " : " mobile-menu md:hidden hidden "}>
      <ul className="mt-4 space-y-4">
        <li><NavLink to={"/"} className="block px-1 py-2 text-white bg-gray-900 rounded">Home</NavLink></li>
        <li><NavLink to={"/Products"} className="block px-1 py-2 text-white bg-gray-900 rounded">Products</NavLink></li>
        <li><NavLink to={"/Categories"} className="block px-1 py-2 text-white bg-gray-900 rounded">Categories</NavLink></li>
        <li><NavLink to={"/Brands"} className="block px-1 py-2 text-white bg-gray-900 rounded">Brands</NavLink></li>
        <li><NavLink to={"/Cart"} className="block px-1 py-2 text-white bg-gray-900 rounded">Cart</NavLink></li>
      </ul>
    </div>}
    
  </nav>
</header>


    </>
  )
}
