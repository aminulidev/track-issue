import { Button } from '@/components/ui/button'
import Link from 'next/link'
import IssueForm from '../_components/IssueForm'
import BackButton from '@/components/BackButton'

const NewIssuePage = () => {
    return (
        <div>
            <BackButton>Back</BackButton>
            <IssueForm />
        </div>
    )
}

export default NewIssuePage