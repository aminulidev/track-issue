'use client'

import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useRouter } from 'next/navigation';
import { Issue, UserType } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast';

const IssueShareSelect = ({ issue }: { issue: Issue }) => {
    
  return (
    <Select onValueChange={async (userId) => {
        try {
            await axios.patch('/api/issues/' + issue.id, { sharedBy: userId || null });
            toast.success('Assigned Success!');
        } catch (error) {
            toast.error('Assigned not saved!');
        }
    }}>
        <SelectTrigger className="w-[180px] [&_span]:flex [&_span]:items-center [&_span]:gap-2">
            <SelectValue placeholder="Share to" />
        </SelectTrigger>
        <SelectContent>
            {/* {userTypes.map((userType) => (
                <SelectItem key={userType.value} value={userType.value || 'ALL'} placeholder="Share to">{userType.label}</SelectItem>
            ))} */}
        </SelectContent>
    </Select>
  )
}

export default IssueShareSelect