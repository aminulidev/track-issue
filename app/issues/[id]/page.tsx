import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/prisma/client'
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

    return (
        <div className='space-y-3'>
            <Button><Link href='/issues'>Back</Link></Button>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
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

                <div>
                    <Button><Link href={`/issues/${issue.id}/edit`} className='flex items-center gap-1.5'><BsPencilSquare /> Edit Issue</Link></Button>
                </div>
            </div>

        </div>
    )
}

export default IssueDetailsPage