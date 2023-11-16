'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AiFillDelete } from 'react-icons/ai';
import AlertCard from './AlertCard';
import { Button } from './ui/button';

interface Props {
    issueId: string
}

const IssueDelete = ({issueId}: Props ) => {
    const router = useRouter();

    const issueDeleteHandler = async () => {
        try {
            await axios.delete('/api/issues/' + issueId);
            toast.success("issue deleted!");
            router.refresh();
        } catch (error) {
            toast.error("issue delete failed!");
            router.refresh();
        }
    }
    
    return (
        <AlertCard alertFun={issueDeleteHandler} title='Delete Issue' description='Are you want to "Delete" this issue?'>
            <Button variant='link' size='link'><AiFillDelete className="text-xl hover:text-destructive transition-colors" /></Button>
        </AlertCard>
    )
}

export default IssueDelete