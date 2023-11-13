import BackButton from '@/components/BackButton'
import DataTable from '@/components/DataTable'
import IssueAction from '@/components/IssueAction'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { Toaster } from 'react-hot-toast'
import authOptions from '../auth/authOptions'
import getCurrentUser from '../hooks/getCurrentUser'

const IssuesPage = async ({ searchParams }: { searchParams: { status: Status } }) => {
    const currentUser = await getCurrentUser();

    const issues = await prisma.issue.findMany(
        {
            where: {
                userId: currentUser?.id,
                status: searchParams.status,
            },
            orderBy: { createdAt: 'desc' }
        }
    );

    const session = await getServerSession(authOptions);

    const tableCol = [
        { id: 1, title: 'Title' },
        { id: 2, title: 'Status' },
        { id: 3, title: 'Created' },
        { id: 4, title: 'Action' },
    ]

    return (
        <>
            <Toaster />
            <div className='space-y-3'>
                <div className='flex items-center justify-between space-x-6'>
                    <BackButton>Back</BackButton>
                    {session && <IssueAction />}
                </div>
                <div className='border rounded-md'>
                    <DataTable issues={issues} tableCol={tableCol} />
                </div>
            </div>
        </>
    )
}

export default IssuesPage