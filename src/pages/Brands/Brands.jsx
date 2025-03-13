import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Categories() {
  function getallBrands(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

 const {data} = useQuery({
  queryKey: ["Brands"],
  queryFn: getallBrands,
  select : (res) => res.data.data
 })

  return (
    <div>
      <h1>Brands</h1>
      <div className='grid grid-cols-5 gap-3'>
        {
          data?.map((brand, index) => {
            return <div key={index}>
            <img src={brand.image} alt="" />
            <h3>{brand.name}</h3>
            </div>
          })
        }
      </div>
    </div>
  )
}


