import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import prisma from '@/prisma/client'
import delay from 'delay'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: params.id }
    });

    await delay(2000);

    if (!issue)
        notFound();

    return (
        <div>
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
        </div>
    )
}

export default IssueDetailsPage