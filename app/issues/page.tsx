import { Button } from '@/components/ui/button'
import prisma from '@/prisma/client'
import Link from 'next/link'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import delay from 'delay'
import IssueAction from '@/components/IssueAction'
import Loader from '@/components/Loader/Loader'

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();

    await delay(2000);

    return (
        <div className='space-y-3'>
            <IssueAction/>
            <div className='border rounded-md'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Issue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className='text-right hidden sm:table-cell'>Created</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {issues.map(issue => (
                            <TableRow key={issue.id}>
                                <TableCell>{issue.title}</TableCell>
                                <TableCell><Badge variant={issue.status === 'OPEN' ? 'destructive': `${issue.status === 'IN_PROGRESS' ? 'secondary': 'success'}`}>{issue.status}</Badge></TableCell>
                                <TableCell className="text-right hidden sm:table-cell">{issue.createdAt.toDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default IssuesPage