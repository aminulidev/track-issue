import getCurrentUser from '@/app/hooks/getCurrentUser';
import { Badge } from '@/components/ui/badge';
import { Issue } from '@prisma/client';
import { AiFillDelete } from 'react-icons/ai';
import { BiEditAlt, BiSolidShow } from 'react-icons/bi';
import AlertCard from './AlertCard';
import Icon from './Icon';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import IssueDelete from './IssueDelete';
import IssueShare from './IssueShare';

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
                            <TableHead className={`${col.title === 'Action' ? 'text-right': ''}`} key={col.id}>{col.title}</TableHead>
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
                                        <IssueShare issueId={issue.id} />
                                        <IssueDelete issueId={issue.id} />
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