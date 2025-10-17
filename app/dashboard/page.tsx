import Sidebar from '@/Components/Sidebar'
import { getCurrentUser } from '@/lib/auth'


import { prisma } from '@/lib/prisma'
import { TrendingUp } from 'lucide-react'
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

    const lowStock=await prisma.product.findMany({
      where:{
        userId,
        lowStockAt:{not:null},
        quantity:{lte:5}
      }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4 mt-4">
          <div className='bg-white rounded-xl p-4'>
            <span className='font-semibold text-black text-lg'>Key Metrics</span>


             
              <div className='grid grid-cols-3 mt-4'>
                
               <div className='text-center'>
                <div className='font-bold text-2xl'>{totalProducts}</div>
                <div className='text-sm text-gray-800'>Total Products</div>
                <div className='flex items-center justify-center gap-1 text-green-600'>
                  <div className='text-xs'>+{totalProducts}</div>
                   <TrendingUp className='w-4 h-4'/>
                  

                </div>

               </div>




               <div className='text-center'>
                <div className='font-bold text-2xl'>${totalPrice}</div>
                <div className='text-sm text-gray-800'>Total Value</div>
                <div className='flex items-center justify-center gap-1 text-green-600'>
                  <div className='text-xs'>+{totalPrice}</div>
                   <TrendingUp className='w-4 h-4'/>
                  









                </div>













               </div>





              <div className='text-center'>
                <div className='font-bold text-2xl'>
                  {lowStock.length>0?lowStock.length:"0"}
                </div>
                <div className='text-sm text-gray-800'>Low Stock</div>
                <div className='flex items-center justify-center gap-1 text-green-600'>
                  <div className='text-xs'>+ {lowStock.length>0?lowStock.length:"0"}</div>
                   <TrendingUp className='w-4 h-4'/>
                  

                </div>

               </div>








              



              </div>
             




          </div>
        </div>
        </div>
      
    </div>
  )
}

export default page
