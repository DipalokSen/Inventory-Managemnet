"use server"
import React from 'react'
import { getCurrentUser } from '../auth'
import { prisma } from '../prisma'

const deleteForm = async (formData:FormData) => {
   
   const user=getCurrentUser()
   
    const data=formData.get("Id")
    console.log("formData man ",data)
    
    await prisma.product.deleteMany({
        where:{
            id:String(data),userId:user.id
        }
    })
   
} 

export default deleteForm
