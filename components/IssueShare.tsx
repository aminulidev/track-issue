'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AlertCard from './AlertCard';
import { Button } from './ui/button';
import { FaShareAlt } from "react-icons/fa";
import IssueShareSelect from './IssueShareSelect';


interface Props {
    issueId: string
}

const IssueDelete = ({issueId}: Props ) => {
    const router = useRouter();

    const issueShareHandler = async () => {
        // try {
        //     await axios.delete('/api/issues/' + issueId);
        //     toast.success("issue deleted!");
        //     router.refresh();
        // } catch (error) {
        //     toast.error("issue delete failed!");
        //     router.refresh();
        // }
    }
    
    return (
        <AlertCard alertFun={issueShareHandler} title='Issue Share to' description={<IssueShareSelect/>}>
            <Button variant='link' size='link'><FaShareAlt className="text-xl hover:text-green-500 transition-colors" /></Button>
        </AlertCard>
    )
}

export default IssueDelete