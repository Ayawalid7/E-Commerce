import React, { useState } from 'react'
import {Input} from "@heroui/react";
import {Button} from "@heroui/react";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';;


export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()
  
  const initialValues = {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
}
  function onSubmit(values){
  setIsLoading(true)
  setErrMsg("")
 axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
 .then(({data})=>{
  if(data.message == "success"){
    navigate("/login")
  }
 }).catch((err)=>{
   setErrMsg(err.response.data.message);
 }).finally(()=>{
  setIsLoading(false)
 })

}

 const validationSchema = yup.object({
  name: yup.string().required("Name is required").min(3,"Name must be at latest 3 charasterst").max(20,"Name must be at most 20 charasterst"),
  email: yup.string().required("Email is required").email("Invaild email"),
  password: yup.string().required("password is required").min(8,"password must be at 8 characters"),
  rePassword: yup.string().required("Ressword is required").oneOf([yup.ref("password")]),
  phone: yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/,"Invalid phone number")

})

  const {values,handleChange,handleSubmit,errors,touched,handleBlur} = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  return (
    <div className='sm:w-2/3 mx-auto'>
      <h1 className='text-3xl font-bold'>Register Now</h1>
     <form onSubmit={handleSubmit}>
      <div className='py-5 grid md:grid-cols-2 gap-4'>
      <Input isInvalid={touched.name && errors.name} errorMessage={errors.name} name='name'value={ values.name} onChange={handleChange} onBlur={handleBlur} className='md:col-span-2' label="Name" type="text" variant='bordered' />
      <Input isInvalid={touched.email && errors.email} errorMessage={errors.email} name='email'value={ values.email}onChange={handleChange} onBlur={handleBlur} className='md:col-span-2' label="Email" type="email" variant='bordered' />
      <Input isInvalid={touched.password && errors.password} errorMessage={errors.password} name='password'value={ values.password} onChange={handleChange}onBlur={handleBlur} className='' label="Password" type="password" variant='bordered' />
      <Input isInvalid={touched.rePassword && errors.rePassword} errorMessage={errors.rePassword} name='rePassword'value={ values.rePassword} onChange={handleChange}onBlur={handleBlur} className=''     label="Ressword" type="password" variant='bordered' />
      <Input isInvalid={touched.phone && errors.phone} errorMessage={errors.phone} name='phone' value={ values.phone} onChange={handleChange}onBlur={handleBlur} className='md:col-span-2' label="Phone" type="tel" variant='bordered'/>
      <Button disabled={isLoading} type='submit' className='md:col-span-2' isLoading={isLoading} color="primary">
      Register
    </Button>
    {errMsg && <p className='text-red-500 text-sm'> {errMsg}</p>}
      </div>
     </form>
    </div>
  )
}
