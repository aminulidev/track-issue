import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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
        <div className='text-center space-y-3'>
            <Card className='max-w-[450px] mx-auto relative'>
                <CardHeader>
                    <Badge className='absolute right-6' variant={issue.status === 'OPEN' ? 'destructive': `${issue.status === 'IN_PROGRESS' ? 'warning': 'success'}`}>{issue.status}</Badge>
                    <CardTitle>{issue.title}</CardTitle>
                    <CardDescription>{issue.createdAt.toDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{issue.description}</p>
                </CardContent>
            </Card>

            <Button><Link href='/issues'>Back</Link></Button>
        </div>
    )
}

export default IssueDetailsPage