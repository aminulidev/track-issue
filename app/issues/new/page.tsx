"use client";
import { Alert, AlertDescription, AlertTitle, } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import { error } from "console";
import { useState } from "react";


interface IssueForm {
    title: string;
    description: string;
}
const NewIssuePage = () => {
    const [error, setError] = useState('');
    const router = useRouter();
    const { register, handleSubmit } = useForm<IssueForm>();

    return (
        <div className='bg-slate-100 p-3 sm:p-5 rounded-sm max-w-xl mx-auto space-y-3'>
            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                </Alert>
            )}
            <form
                className='space-y-3'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data);
                        router.push("/issues");
                    } catch (error) {
                        setError('An unexpected error occurred!');
                    }
                })}
            >
                <Input placeholder='Title' {...register("title")} />
                <Textarea {...register("description")} />
                <Button type='submit'>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage