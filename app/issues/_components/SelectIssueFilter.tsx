"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

const statuses: { label: string, value: Status | string }[] = [
    { label: 'All', value: 'ALL' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Close', value: 'CLOSE' },
];

const SelectIssueFilter = () => {
    const router = useRouter();

    return (
        <Select onValueChange={(status) => {
            const query = status === 'ALL' ? '' : `?status=${status}`;
            router.push('/issues' + query);
        }}>
            <SelectTrigger className="w-[180px] [&_span]:flex [&_span]:items-center [&_span]:gap-2">
                <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
                {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value || 'ALL'} placeholder="Filter by status">{status.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SelectIssueFilter