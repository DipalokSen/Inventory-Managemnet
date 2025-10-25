"use server"
import React from 'react'
import { getCurrentUser } from '../auth'
import { prisma } from '../prisma'
import { z } from 'zod'
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

 
 const addProductSchema=z.object({
 name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
 })

export const addProduct=  async (FormData:FormData)=>{

    const parsedData=addProductSchema.parse({
        name:FormData.get("name"),
        quantity:FormData.get("quantity"),  
        price:FormData.get("price"),
        sku:FormData.get("sku") || undefined,
        lowStockAt:FormData.get("lowStockAt") || undefined
    })

    if(!parsedData){
        throw new Error("Invalid form data")
    }
    
    const user= await getCurrentUser()

    await prisma.product.create({
        data:{...parsedData,userId:user.id}

    })

}



export default deleteForm
