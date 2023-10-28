import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const IssuesPage = () => {
  return (
    <div className='px-4'>
      <Button><Link href="/issues/new">New Issue</Link></Button>
    </div>
  )
}

export default IssuesPage