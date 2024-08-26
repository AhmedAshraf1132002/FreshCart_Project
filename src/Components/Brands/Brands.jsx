import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  let { data } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
  console.log(data);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h1 className="text-center font-bold my-11 Brands">All Brands</h1>
      <div className="grid grid-cols-4 gap-3">
        {data?.data.data.map((brands) => {

         return <div className="max-w-2xl mx-auto ">
            <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 m-3 shadow-sm hover:shadow-emerald-800">
              <div className="card-image">
                <img className="p-5" src={brands.image} alt="brand-image" />
              </div>
              <div className="barnds-title text-center">
                <h2 className="text-green-800 p-5 brandName font-bold">{brands.name}</h2>
              </div>
            </div>
          </div>;
        })}
      </div>
    </>
  );
}
