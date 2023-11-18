"use client";
import { issueSchema, listSchema } from "@/app/validationSchema";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, List, Status, UserType } from "@prisma/client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { z } from 'zod';

type ListFormData = z.infer<typeof listSchema>

// const statuses: { label: string, value: Status | string }[] = [
//     { label: 'Open', value: 'OPEN' },
//     { label: 'In Progress', value: 'IN_PROGRESS' },
//     { label: 'Close', value: 'CLOSE' },
// ];

// const userTypes: { label: string, value: UserType | string }[] = [
//     { label: 'Admin', value: 'ADMIN' },
//     { label: 'Editor', value: 'EDITOR' },
//     { label: 'Viewer', value: 'VIEWER' },
// ];

const ListForm = async ({ list }: { list?: List }) => {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const form = useForm<ListFormData>({
        resolver: zodResolver(issueSchema),
    });

    const onSubmit = async (data: ListFormData) => {
        try {
            setIsSubmiting(true);
            if (list) {
                await axios.patch('/api/lists/' + list.id, data);
                setIsSubmiting(false);
                router.push('/');
                router.refresh();
                // toast.success("List update successfully!");
            } else {
                await axios.post('/api/lists', data);
                setIsSubmiting(false);
                router.push('/');
                router.refresh();
                // toast.success("List created successfully!");
            }

        } catch (error) {
            setError('An unexpected error occurred!');
            setIsSubmiting(false);
            // toast.error("List save failed!");
        }
    };

    return (

        <div className='bg-slate-100 p-3 sm:p-5 rounded-sm max-w-xl mx-auto space-y-4'>
            {error && (
                <ErrorMessage title='Error' message='An unexpted error occurred!' />
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>List Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="List Title" defaultValue={list?.title} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* <FormField
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
                    /> */}

                    {/* <FormField
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
                    /> */}

                    <Button type='submit' disabled={isSubmiting}>{list ? 'Update List' : 'Submit New List'} {isSubmiting && <Spinner />}</Button>
                </form>
            </Form>
        </div>

    )
}

export default ListForm