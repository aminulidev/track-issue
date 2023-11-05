"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Issue, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const SelectAssigned = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 100, // 60s
        retry: 3
    });

    return (
        <>
            <Select defaultValue={issue.assignedToUserID || ""} onValueChange={async (userId) => {
                try {
                    await axios.patch('/api/issues/' + issue.id, { assignedToUserID: userId || null });
                    toast.success('Assigned Success!');
                } catch (error) {
                    toast.error('Assigned not saved!');
                }
            }}>
                <SelectTrigger className="w-[180px] [&_span]:flex [&_span]:items-center [&_span]:gap-2 ">
                    <SelectValue placeholder="Assigned" />
                </SelectTrigger>
                <SelectContent>
                    {users?.map(user =>
                        <SelectItem className="flex items-center justify-between space-x-2" key={user.id} value={user.id}>
                            <Avatar className="w-5 h-5">
                                <AvatarImage src={user.image} />
                                <AvatarFallback>P</AvatarFallback>
                            </Avatar>
                            {user.name}
                        </SelectItem>)}
                </SelectContent>
            </Select>
            <Toaster />
        </>
    )
}

export default SelectAssigned