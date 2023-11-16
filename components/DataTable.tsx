import authOptions from '@/app/auth/authOptions'
import { Badge } from '@/components/ui/badge'
import { Issue, Status } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { AiFillDelete } from 'react-icons/ai'
import { BiEditAlt, BiSolidShow } from 'react-icons/bi'
import AlertCard from './AlertCard'
import Icon from './Icon'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import getCurrentUser from '@/app/hooks/getCurrentUser'

interface Props {
    issues: Issue[],
    tableCol: {
        id: number,
        title: string
    }[]

}

const DataTable = async ({ issues, tableCol }: Props) => {
    const currentUser = await getCurrentUser();
    
    return (
        <div className='bg-slate-100 p-5 rounded'>
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableCol.map(col => (
                            <TableHead key={col.id}>{col.title}</TableHead>
                        ))}
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
                                {currentUser && (
                                    <>
                                        <Icon href={`/issues/edit/${issue.id}`}><BiEditAlt className="text-xl hover:text-green-500 transition-colors" /></Icon>
                                        <AlertCard issueId={issue.id} title='Delete Issue' description='Are you want to "Delete" this issue?'>
                                            <Button variant='link' size='link'><AiFillDelete className="text-xl hover:text-destructive transition-colors" /></Button>
                                        </AlertCard>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default DataTable