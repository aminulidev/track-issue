"use client";


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from 'zod';
import ErrorMessage from '@/components/ErrorMessage';
import Spinner from '@/components/Spinner';


type IssueForm = z.infer<typeof createIssueSchema>
const NewIssuePage = () => {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmiting(true);
            await axios.post('/api/issues', data);
            router.push("/issues");
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
                    <Input placeholder='Title' {...register("title")} />
                    {errors.title && (<ErrorMessage message={errors.title.message} />)}
                </div>
                <div className="space-y-2">
                    <Textarea {...register("description")} />
                    {errors.description && (<ErrorMessage message={errors.description.message} />)}
                </div>
                <Button type='submit' disabled={isSubmiting}>Submit New Issue {isSubmiting && <Spinner/>}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage