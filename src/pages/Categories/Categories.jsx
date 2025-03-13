import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Categories() {
  function getallCategories(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

 const {data} = useQuery({
  queryKey: ["Categories"],
  queryFn: getallCategories,
  select : (res) => res.data.data
 })

  return (
    <div>
      <h1>Categories</h1>
      <div className='grid grid-cols-5 gap-3'>
        {
          data?.map((category, index) => {
            return <div key={index}>
            <img src={category.image} alt="" />
            <h3>{category.name}</h3>
            </div>
          })
        }
      </div>
    </div>
  )
}


