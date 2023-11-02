import AlertCard from '@/components/AlertCard'
import Icon from '@/components/Icon'
import IssueAction from '@/components/IssueAction'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import prisma from '@/prisma/client'
import { AiFillDelete } from 'react-icons/ai'
import { BiEditAlt, BiSolidShow } from 'react-icons/bi'

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany(
        {
            orderBy: {createdAt: 'desc'}
        }
    );

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
                                    <Icon href={`/issues/${issue.id}`}><BiSolidShow className="text-xl hover:text-green-500 transition-colors" /></Icon>
                                    <Icon href={`/issues/${issue.id}/edit`}><BiEditAlt className="text-xl hover:text-green-500 transition-colors" /></Icon>
                                    {/* <Button variant='link' size='link'><AiFillDelete className="text-xl hover:text-green-500 transition-colors" /></Button> */}
                                    <AlertCard issueId={issue.id} title='Delete Issue' description='Are you want to "Delete" this issue?'>
                                        <Button variant='link' size='link'><AiFillDelete className="text-xl hover:text-destructive transition-colors" /></Button>
                                    </AlertCard>
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