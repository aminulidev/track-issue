"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'

interface IssueForm {
    title: string;
    description: string;
}
const NewIssuePage = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<IssueForm>();

    return (
        <div>
            <form
                className='bg-slate-100 p-3 sm:p-5 rounded-sm max-w-xl mx-auto space-y-3'
                onSubmit={handleSubmit( async (data) => {
                    await axios.post('/api/issues', data);
                    router.push("/issues");
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