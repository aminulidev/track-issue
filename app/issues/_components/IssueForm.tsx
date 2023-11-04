"use client";
import { issueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';


type IssueFormData = z.infer<typeof issueSchema>
const IssueForm = async ({ issue }: { issue?: Issue }) => {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmiting(true);
            if(issue){
                await axios.patch('/api/issues/' + issue.id, data);
                router.push('/issues');
                router.refresh();
            }else{
                await axios.post('/api/issues', data);
                router.push("/issues");
                router.refresh();
            }
                
        } catch (error) {
            setError('An unexpected error occurred!');
            setIsSubmiting(false);
        }
    });

    return (
        <div className='bg-slate-100 p-3 sm:p-5 rounded-sm max-w-xl mx-auto space-y-4'>
            {error && (
                <ErrorMessage title='Error' message='An unexpted error occurred!' />
            )}

            <form
                className='space-y-4'
                onSubmit={onSubmit}
            >
                <div className="space-y-2">
                    <Input defaultValue={issue?.title} placeholder='Title' {...register("title")} />
                    {errors.title && (<ErrorMessage message={errors.title.message} />)}
                </div>
                <div className="space-y-2">
                    <Textarea defaultValue={issue?.description} {...register("description")} />
                    {errors.description && (<ErrorMessage message={errors.description.message} />)}
                </div>
                <Button type='submit' disabled={isSubmiting}>{issue ? 'Update Issue': 'Submit New Issue'} {isSubmiting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm