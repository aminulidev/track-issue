"use client";
import { issueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status, UserType } from "@prisma/client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>

const statuses: { label: string, value: Status | string }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Close', value: 'CLOSE' },
];

const userTypes: { label: string, value: UserType | string }[] = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Editor', value: 'EDITOR' },
    { label: 'Viewer', value: 'VIEWER' },
];

const IssueForm = async ({ issue }: { issue?: Issue }) => {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState('');

    const form = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
    });

    const onSubmit = async (data: IssueFormData) => {
        try {
            setIsSubmiting(true);
            if (issue) {
                await axios.patch('/api/issues/' + issue.id, data);
                setIsSubmiting(false);
                toast.success("Issue update successfully!");
            } else {
                await axios.post('/api/issues', data);
                setIsSubmiting(false);
                toast.success("Issue created successfully!");
            }

        } catch (error) {
            setError('An unexpected error occurred!');
            setIsSubmiting(false);
            toast.error("Issue save failed!");
        }
    };

    return (

        <div className='bg-slate-100 p-3 sm:p-5 rounded-sm max-w-xl mx-auto space-y-4'>
            {error && (
                <ErrorMessage title='Error' message='An unexpted error occurred!' />
            )}

            {/* <form
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
                <div className="flex justify-between">
                    <Select>
                        <SelectTrigger className="w-[180px] [&_span]:flex [&_span]:items-center [&_span]:gap-2 ">
                            <SelectValue placeholder="Assigned" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses?.map(status =>
                                <SelectItem className="flex items-center justify-between space-x-2" key={status.label} value={status.value}>
                                    {status.label}
                                </SelectItem>)}
                        </SelectContent>
                    </Select>
                    {errors.description && (<ErrorMessage message={errors.description.message} />)}
                </div>

                <Button type='submit' disabled={isSubmiting}>{issue ? 'Update Issue' : 'Submit New Issue'} {isSubmiting && <Spinner />}</Button>
            </form> */}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" defaultValue={issue?.title} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" defaultValue={issue?.description} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {statuses.map(item => (
                                        <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sharedTo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Share to</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select User" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {userTypes.map(item => (
                                        <SelectItem key={item.label} value={item.value}>{item.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit' disabled={isSubmiting}>{issue ? 'Update Issue' : 'Submit New Issue'} {isSubmiting && <Spinner />}</Button>
                </form>
            </Form>
        </div>

    )
}

export default IssueForm