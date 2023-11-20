"use client";
import { issueSchema, listSchema, todoListSchema } from "@/app/validationSchema";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, List, Status, TodoList, UserType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { z } from 'zod';

type TodoListFormData = z.infer<typeof todoListSchema>

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

const TodoListForm = async ({ todolist }: { todolist?: TodoList }) => {
    const { data: lists, isLoading } = useQuery<List[]>({
        queryKey: ['lists'],
        queryFn: () => axios.get("/api/lists").then(res => res.data),
        staleTime: 60 * 100, // 60s
        retry: 3
    });

    const [isSubmiting, setIsSubmiting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const form = useForm<TodoListFormData>({
        resolver: zodResolver(issueSchema),
    });

    const onSubmit = async (data: TodoListFormData) => {
        try {
            setIsSubmiting(true);
            if (todolist) {
                await axios.patch('/api/todolists/' + todolist.id, data);
                setIsSubmiting(false);
                router.push('/');
                router.refresh();
                // toast.success("List update successfully!");
            } else {
                await axios.post('/api/todolists', data);
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
                                    <Input placeholder="List Title" defaultValue={todolist?.title} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {lists?.map(item => (
                                        <SelectItem key={item.id} value={item.title}>{item.title}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit' disabled={isSubmiting}>{todolist ? 'Update List' : 'Create List'} {isSubmiting && <Spinner />}</Button>
                </form>
            </Form>
        </div>

    )
}

export default TodoListForm