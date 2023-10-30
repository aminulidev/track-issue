import ErrorMessage from '@/components/ErrorMessage'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center min-h-[450px]'>
        <ErrorMessage title='Not Found!' message='Sorry, your requested file not found.' />
    </div>
  )
}

export default NotFoundPage