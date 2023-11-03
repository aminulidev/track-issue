import authOptions from '@/app/auth/authOptions'
import BackButton from '@/components/BackButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BsPencilSquare } from 'react-icons/bs'

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

    return (
        <div className='space-y-3'>
            <div className='flex items-center justify-between space-x-6'>
                <BackButton>Back</BackButton>
                {session && <Button>
                    <Link href={`/issues/edit/${issue.id}`} className='flex items-center gap-1.5'><BsPencilSquare /> Edit Issue</Link>
                </Button>}
            </div>
            <div>
                <Card className='relative'>
                    <CardHeader>
                        <Badge className='absolute right-6' variant={issue.status === 'OPEN' ? 'destructive' : `${issue.status === 'IN_PROGRESS' ? 'warning' : 'success'}`}>{issue.status}</Badge>
                        <CardTitle>{issue.title}</CardTitle>
                        <CardDescription>{issue.createdAt.toDateString()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{issue.description}</p>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default IssueDetailsPage