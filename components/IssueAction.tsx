import Link from 'next/link'
import { Button } from './ui/button'
import SelectIssueFilter from '@/app/issues/_components/SelectIssueFilter'

const IssueAction = () => {
  return (
    <div className='flex items-center gap-5'>
        <SelectIssueFilter />
        <Button><Link href="/issues/new">New Issue</Link></Button>
    </div>
  )
}

export default IssueAction