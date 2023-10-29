import { Button } from '@/components/ui/button'
import prisma from '@/prisma/client'
import Link from 'next/link'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();

    return (
        <div className='space-y-3'>
            <Button><Link href="/issues/new">New Issue</Link></Button>

            <div className='border rounded-md'>
                <Table>
                    {/* <TableCaption>Current issues</TableCaption> */}
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
                                <TableCell>{issue.status}</TableCell>
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