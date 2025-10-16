import Sidebar from '@/Components/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen bg-gray-50'>

        <Sidebar currentRoute='/dashboard'/>
      
    </div>
  )
}

export default page
