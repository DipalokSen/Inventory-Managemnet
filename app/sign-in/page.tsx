import { SignIn } from '@stackframe/stack'
import Link from 'next/link'
import React from 'react'

const oage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center mx-auto bg-gradient-to-br from-purple-50 to-purple-100 px-4 py-16'>
      <div>
<SignIn/>
<Link href="/" className='text-purple-600 hover:underline mt-4 block text-center'>Back to Home</Link>
      </div>
      
    </div>
  )
}

export default oage
