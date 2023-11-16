import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useRouter } from 'next/navigation';

const IssueShareSelect = () => {
    const router = useRouter();

    const statuses: { label: string, value: string }[] = [
        { label: 'All', value: 'ALL' },
        { label: 'Open', value: 'OPEN' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Close', value: 'CLOSE' },
    ];
    
  return (
    <Select onValueChange={(status) => {
        // const query = status === 'ALL' ? '' : `?status=${status}`;
        // router.push('/issues' + query);
    }}>
        <SelectTrigger className="w-[180px] [&_span]:flex [&_span]:items-center [&_span]:gap-2">
            <SelectValue placeholder="Share to" />
        </SelectTrigger>
        <SelectContent>
            {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value || 'ALL'} placeholder="Share to">{status.label}</SelectItem>
            ))}
        </SelectContent>
    </Select>
  )
}

export default IssueShareSelect