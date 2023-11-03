"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SelectAssigned = () => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 100, // 60s
        retry: 3
    });

    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assigned" />
            </SelectTrigger>
            <SelectContent>
                {users?.map(user => <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>)}
            </SelectContent>
        </Select>
    )
}

export default SelectAssigned