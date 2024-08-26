import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import logo from '/public/freshCart.png';

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  let { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  
  
  

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <link rel="icon" type="image/svg+xml" href={logo} />
      </Helmet>

      <div className="grid grid-cols-4 gap-3">
        {data?.data.data.map((categories) => {
          return (
            <div className="max-w-2xl mx-auto  ">
              <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 m-3 hover:shadow-green-800">
                <div className="image">
                  <img
                    className="rounded-t-lg p-8"
                    src={categories.image}
                    alt="categories-image"
                  />
                </div>

                <div className="title ">
                  <h2 className="text-green-700 text-center px-5 pb-5">
                    {categories.name}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
