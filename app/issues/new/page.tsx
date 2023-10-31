import { Button } from '@/components/ui/button'
import Link from 'next/link'
import IssueForm from '../_components/IssueForm'

const NewIssuePage = () => {
    return (
        <div>
            <Button><Link href='/issues'>Back</Link></Button>
            <IssueForm />
        </div>
    )
}

export default NewIssuePage