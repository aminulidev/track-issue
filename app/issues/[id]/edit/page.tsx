import { Button } from '@/components/ui/button'
import prisma from '@/prisma/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import IssueForm from '../../_components/IssueForm'

interface Props {
    params: { id: string }
}
const EditIssuePage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: params.id }
    })

    if (!issue) notFound();
    return (
        <div>
            <Button><Link href={`/issues/${issue.id}`}>Back</Link></Button>
            <IssueForm issue={issue} />
        </div>
    )
}

export default EditIssuePage