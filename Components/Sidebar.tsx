import { UserButton } from '@stackframe/stack';
import { BarChart2, BarChart3 ,Package,Plus,Settings} from 'lucide-react'
import Link from 'next/link';
import React from 'react'

const Sidebar = ({currentRoute="/dashboard"}:{currentRoute:string}) => {
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Inventory", href: "/inventory", icon: Package },
    { name: "Add Product", href: "/add-product", icon: Plus },
    { name: "Settings", href: "/settings", icon: Settings },
  ];
  
  return (
    <div className='fixed min-h-screen top-0 left-0 bg-gray-900 w-64 z-50'>
      
     <div className='mb-7'>

       <div className='flex items-center text-white mt-4 p-4'>
        <BarChart3 className='w-7 h-7'/>
        <span className='ml-2 font-bold text-xl'>Inventrory App</span>
       </div>


     </div>

    <nav className='space-y-2 '>
      <div className='text-gray-500 p-4 uppercase font-bold text-sm'>Inventroy</div>
    
    
    {navigation.map((item,index)=>{
      const Icon = item.icon;
      const isActive = currentRoute === item.href;
      return(
         
        <Link href={item.href} className={`flex items-center text-white py-3 px-2 space-x-2 rounded-sm ${isActive?"bg-gray-500":"hover:bg-gray-700"}  w-[90%]`} key={index}>
        
            
            <Icon className='w-6 h-6'/>
            <span className='text-sm'>{item.name}</span>

        </Link>


      )
    })}
    
    </nav>
 
    
     
     <div className='absolute bottom-0 right-0 left-0 text-white p-6'>

      <div className='flex items-center justify-between'>
        <UserButton showUserInfo/>
      </div>

     </div>


    </div>
  )
}

export default Sidebar
