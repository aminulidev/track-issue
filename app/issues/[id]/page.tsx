import authOptions from '@/app/auth/authOptions'
import BackButton from '@/components/BackButton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { BsPencilSquare } from 'react-icons/bs'
import SelectAssigned from '../_components/SelectAssigned'

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: params.id }
    });

    if (!issue)
        notFound();

    const session = await getServerSession(authOptions);

    const user = await prisma.user.findUnique({
        where: { id: issue.assignedToUserID! }
    });

    return (
        <div className='space-y-6'>
            <Toaster />
            <div className='flex items-center justify-between space-x-6'>
                <BackButton>Back</BackButton>
                {session && (
                    <div className='flex items-center space-x-6'>
                        <Button>
                            <Link href={`/issues/edit/${issue.id}`} className='flex items-center gap-1.5'><BsPencilSquare /> Edit Issue</Link>
                        </Button>
                        <SelectAssigned issue={issue} />
                    </div>
                )}
            </div>
            <div>
                <Card className='relative max-w-3xl mx-auto'>
                    <CardHeader>
                        <Badge className='absolute right-6' variant={issue.status === 'OPEN' ? 'destructive' : `${issue.status === 'IN_PROGRESS' ? 'warning' : 'success'}`}>{issue.status}</Badge>
                        <CardTitle>{issue.title}</CardTitle>
                        <CardDescription>{issue.createdAt.toDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{issue.description}</p>

                        <div className='flex items-center gap-3 mt-5'>
                            <span className='font-bold'>Assigned to: </span>
                            <Avatar title={user?.name!}>
                                <AvatarImage src={user?.image!} />
                                <AvatarFallback>P</AvatarFallback>
                            </Avatar>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default IssueDetailsPage