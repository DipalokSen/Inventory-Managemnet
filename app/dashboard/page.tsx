import Sidebar from '@/Components/Sidebar'
import { getCurrentUser } from '@/lib/auth'

import { prisma } from '@/lib/prisma'
import React from 'react'

const page = async () => {
  

  const user=await getCurrentUser()
    const userId=user.id

    const totalProducts=await prisma.product.count({
        where:{userId}
    })


    const recentProduct=await prisma.product.findMany({
        where:{userId},
        orderBy:{createdAt:"desc"},
        take:5
    })

    const allProduct=await prisma.product.findMany({
        where:{userId},
        select:{price:true,quantity:true,createdAt:true},
    })
    
    const totalPrice=allProduct.reduce((sum,product)=>sum +Number(product.price) * Number(product.quantity),0)


    console.log("total",totalProducts)
    console.log("recent",recentProduct)
    console.log("all",allProduct)
    console.log("total price",totalPrice)
    return (
    
    
    <div className='min-h-screen bg-gray-50'>

        <Sidebar currentRoute='/dashboard'/>


        <div className='ml-64 p-8'>
         <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back! Here is an overview of your inventory.
              </p>
            </div>
          </div>
        </div>
        </div>
      
    </div>
  )
}

export default page
