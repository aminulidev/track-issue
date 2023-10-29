import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const IssueAction = () => {
  return (
    <div>
        <Button><Link href="/issues/new">New Issue</Link></Button>
    </div>
  )
}

export default IssueAction