import BackButton from '@/components/BackButton'
import DataTable from '@/components/DataTable'
import IssueAction from '@/components/IssueAction'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { Toaster } from 'react-hot-toast'
import authOptions from '../auth/authOptions'
import getCurrentUser from '../hooks/getCurrentUser'
import UsersTable from '@/components/UsersTable'

const UsersPage = async () => {
    const session = await getServerSession(authOptions);
    const currentUser = await getCurrentUser();

    const users = await prisma.user.findMany({
        orderBy: {name: 'asc'}
    });

    const tableCol = [
        { id: 1, title: 'Title' },
        { id: 2, title: 'Status' },
        { id: 3, title: 'Created' },
        { id: 4, title: 'Action' },
    ];

    return (
        <>
            <Toaster />
            <div className='space-y-3'>
                <div className='flex items-center justify-between space-x-6'>
                    <BackButton>Back</BackButton>
                </div>
                <div className='border rounded-md'>
                    <UsersTable users={users} tableCol={tableCol} />
                </div>
            </div>
        </>
    )
}

export default UsersPage