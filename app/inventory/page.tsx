import Sidebar from "@/Components/Sidebar";
import deleteForm from "@/lib/Action/deleteForm";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import React from "react";

const page = async () => {
  
  const user = await getCurrentUser();
    const userId = user.id;
  
    const totalProducts = await prisma.product.findMany({
      where: { userId },
    });
  
  
    return (
    <div className="min-h-screen ">
      <Sidebar currentRoute="/inventory" />
      <div className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center ">
            <div>
              <h1 className="font-bold text-xl">Inventory</h1>
              <p className="text-gray-500 font-semibold text-sm">
                Manage Your Product from the prodcut table
              </p>
            </div>
          </div>
        </div>



        <div className="bg-white border-gray-400 rounded-lg overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border border-gray-400">
                        <th className="text-left p-4">Product Name</th>
                        <th className="text-left p-4">Sku</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Quantity</th>
                        <th className="text-left p-4">LowStockAt</th>
                        <th className="text-left p-4">
                            Action
                            
                            </th>

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                 {totalProducts.map((product,key)=>{
                    const number=Number(product.price);

                  
const stockLevel =
                product.quantity === 0
                  ? 0
                  : product.quantity < (product.lowStockAt || 0)
                  ? 1
                  : 2;

              const stockColor = [
                "bg-red-500",
                "bg-yellow-500",
                "bg-green-500",
              ];

              const stockText = [
                "text-red-500",
                "text-yellow-500",
                "text-green-500",
              ];


                    return(
                        <tr key={key}>
                           
                           <td className={`text-left p-4  text-sm font-semibold ${stockText[stockLevel]}` }>{product.name}</td>
                           <td className={`text-left p-4  text-sm font-semibold ${stockText[stockLevel]}` }> {product.sku || "-"}</td>
                           <td className={`text-left p-4  text-sm font-semibold ${stockText[stockLevel]}` }>${number}</td>
                           <td className={`text-left p-4  text-sm font-semibold ${stockText[stockLevel]}` }>{product.quantity}</td>
                           <td className={`text-left p-4  text-sm font-semibold ${stockText[stockLevel]}` }>{product.lowStockAt}</td>
                           <td className={`text-left p-4  text-sm font-semibold ${stockText[stockLevel]}` }>
                               
                               <form action={async (formData:FormData)=>{
                                "use server"
                                await deleteForm(formData)
                               }}>
                                <input type="hidden" name="Id" value={product.id} />
                                <button className="text-red-500">Delete</button>
                               </form>


                           </td>



                            



                        </tr>
                    )
                 })}
                </tbody>
            </table>
        </div>

      </div>
   
    </div>
  );
};

export default page;
