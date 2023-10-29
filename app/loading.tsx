import Loader from '@/components/Loader/Loader'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen fixed inset-0 z-50 bg-slate-800/50  backdrop-blur-sm'>
        <Loader/>
    </div>
  )
}

export default Loading