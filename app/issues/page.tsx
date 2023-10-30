import IssueAction from '@/components/IssueAction'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import prisma from '@/prisma/client'
import Link from 'next/link'
import { BiSolidShow } from 'react-icons/bi'

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();

    return (
        <div className='space-y-3'>
            <IssueAction />
            <div className='border rounded-md'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Issue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className='hidden sm:table-cell'>Created</TableHead>
                            <TableHead className='text-right'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {issues.map(issue => (
                            <TableRow key={issue.id}>
                                <TableCell>{issue.title}</TableCell>
                                <TableCell><Badge variant={issue.status === 'OPEN' ? 'destructive' : `${issue.status === 'IN_PROGRESS' ? 'warning' : 'success'}`}>{issue.status}</Badge></TableCell>
                                <TableCell className="hidden sm:table-cell">{issue.createdAt.toDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/issues/${issue.id}`} className='flex items-center justify-end'><BiSolidShow className="text-xl hover:text-green-500 transition-colors" /></Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default IssuesPage