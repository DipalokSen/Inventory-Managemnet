import Sidebar from '@/Components/Sidebar'
import { addProduct } from '@/lib/Action/deleteForm'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      
      <Sidebar currentRoute="/add-product" />

        <div className='ml-64 p-8'>
            <div className=''>
                <h1 className='text-lg  font-semibold'>Add product</h1>
                <p className='text-gray-500 text-xs'>Add a new Product To your Inventory</p>
            </div>


             <div className='mt-4'>
                <div className='max-w-2xl'>
                    <div className='bg-white rounded-xl'>
                        
                       <form action={addProduct} className='p-5'>

                         <label htmlFor="Product Name" className='text-lg block mt-4'>Product Name *</label>

                         <input type="text" name='name' required placeholder='Enter The Product Name' className='w-full p-2 border border-blue-200 mt-2 rounded-lg'/>


                           <div className='grid grid-cols-2 gap-4'>

                            <div>
                                 <label htmlFor="Product Name" className='text-lg block mt-4'>Quantity *</label>

                         <input type="number" name='quantity' required min={0} defaultValue="0" className='w-full p-2 border border-blue-200 mt-2 rounded-lg'/>
                            
                            </div>

                            <div>
                                <label htmlFor="Product Name" className='text-lg block mt-4'>Price*</label>

                         <input type="number" name='price' step={0.1} required defaultValue="0.0" className='w-full p-2 border border-blue-200 mt-2 rounded-lg '/>
                            </div>
                           </div>



                            <label htmlFor="Product Name" className='text-lg block mt-4'>Sku(optional) *</label>

                         <input type="text" name='sku'  className='w-full p-2 border border-blue-200 mt-2 rounded-lg'/>
                           
                           
                            <label htmlFor="Product Name" className='text-lg block mt-4'>Low Stock At(optional) *</label>

                         <input type="text" name='lowStockAt' defaultValue="0"    step="0.1" className='w-full p-2 border border-blue-200 mt-2 rounded-lg'/>




                         <div className='flex items-center gap-2 mt-4'>
                            <button className='px-5 py-3 bg-purple-600  rounded-lg text-white cursor-pointer'>Add Item</button>
                            <button className='px-5 py-3 bg-gray-300 rounded-lg cursor-pointer'>Cancel</button>

                         </div>



                       </form>



                    </div>
                </div>
             </div>







        </div>
    
    </div>
  )
}

export default page
