import BackButton from '@/components/BackButton'
import { Toaster } from 'react-hot-toast'
import IssueForm from '../_components/IssueForm'

const NewIssuePage = () => {
    return (
        <>
            <Toaster />
            <div>
                <BackButton>Back</BackButton>
                <IssueForm />
            </div>
        </>
    )
}

export default NewIssuePage