import getCurrentUser from '@/app/hooks/getCurrentUser';
import { Badge } from '@/components/ui/badge';
import { User } from '@prisma/client';
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

interface Props {
    users: User[],
    tableCol: {
        id: number,
        title: string
    }[]

}

const UsersTable = async ({ users, tableCol }: Props) => {
    
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
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell><Badge variant='success'>{user.userType}</Badge></TableCell>
                            <TableCell className="hidden sm:table-cell">{user.createdAt.toDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Icon href={`/user/${user.id}`}><BiSolidShow className="text-xl hover:text-green-500 transition-colors" /></Icon>
                                {currentUser && (
                                    <>
                                        <Icon href={`/user/edit/${user.id}`}><BiEditAlt className="text-xl hover:text-green-500 transition-colors" /></Icon>
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

export default UsersTable