'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AlertCard from './AlertCard';
import { Button } from './ui/button';
import { FaShareAlt } from "react-icons/fa";
import IssueShareSelect from './IssueShareSelect';
import { Issue } from '@prisma/client';


interface Props {
    issueId: string;
    issue: Issue
}

const IssueShare = ({issueId, issue}: Props ) => {
    const router = useRouter();

    const issueShareHandler = async () => {
        try {
            await axios.patch('/api/issues/' + issue.id, { sharedBy: issue.userId || null });
            toast.success("issue updated!");
            router.refresh();
        } catch (error) {
            toast.error("issue update failed!");
            router.refresh();
        }
    }
    
    return (
        <AlertCard alertFun={issueShareHandler} title='Issue Share to' description={<IssueShareSelect issue={issue} />}>
            <Button variant='link' size='link'><FaShareAlt className="text-xl hover:text-green-500 transition-colors" /></Button>
        </AlertCard>
    )
}

export default IssueShare