import React from 'react'
import RatingStars from '../RatingStars/RatingStars'
import { Link } from 'react-router-dom'

import { addProductToCart } from '../../cartServices'


export default function Product({ product }) {


	

    


  return (
    <div  className="max-w-2xl mx-auto">
        
	<div className="bg-white shadow-sm hover:shadow-emerald-800 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
		 <Link to={"/ProductDetails/" + product._id}>
			<img className="rounded-t-lg p-8" src={product.imageCover}  alt="product image"/>
			</Link>
			<div className="px-5 pb-5">
				<Link to={"/ProductDetails/" + product._id}>
					<h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">{product.title}
						</h3>
            <p classNameName='line-clamp-2'>{product.description}</p>
				</Link>
				<div className='flex justify-between items-center '>
				<RatingStars rating={product?.ratingsAverage} />
				<button onClick={() => addProductToCart(product._id) }><i class="fa-solid fa-heart fa-1x"></i></button>
				</div>
               
				<div className="flex items-center justify-between">
					<span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
					<button onClick={() => addProductToCart(product._id) } href="#"
						className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
						to cart</button>
				</div>
			</div>
	</div>
</div>
  )
}
