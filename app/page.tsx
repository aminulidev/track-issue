
import DataTable from "@/components/DataTable";
import UserWelcom from "@/components/UserWelcom";
import { Button, buttonVariants } from "@/components/ui/button";
import prisma from "@/prisma/client";
import Link from "next/link";
import getCurrentUser from "./hooks/getCurrentUser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default async function Home() {
    const currentUser = await getCurrentUser();

    const tableCol = [
        { id: 1, title: 'Title' },
        { id: 2, title: 'Status' },
        { id: 3, title: 'Created' },
        { id: 4, title: 'Action' },
    ];

    const listCreatedMe = await prisma.list.findMany(
        {
            where: {
                userId: currentUser?.id,
            },
            orderBy: { createdAt: 'desc' },
        }
    );

    const issuesSharedByMe = await prisma.issue.findMany(
        {
            where: {
                sharedBy: currentUser?.id,
            },
            orderBy: { createdAt: 'desc' },
        }
    );

    const issuesSharedWithMe = await prisma.issue.findMany(
        {
            where: {
                sharedBy: currentUser?.id,
            },
            orderBy: { createdAt: 'desc' },
        }
    );

    return (
        <>
            {currentUser && (
                <div className="flex flex-col gap-10">
                    <UserWelcom />

                    {/* Created by me */}
                    <div>

                        {listCreatedMe && (
                            <div>
                                <Button><Link href="/lists/new">Add List</Link></Button>

                                <div className="flex justify-between mt-5">
                                    <h2 className="text-xl font-semibold mb-5">Created by me</h2>
                                    {/* <Link href="/lists">View All</Link> */}
                                </div>

                                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                    {listCreatedMe.map(listItem => (
                                        <Card key={listItem.id} className="bg-slate-100">
                                            <CardHeader>
                                                <CardTitle>{listItem.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex flex-col gap-2">
                                                <p>Card Content</p>
                                                <p>Card Content</p>
                                                <p>Card Content</p>
                                            </CardContent>
                                            <CardFooter>
                                                <Button><Link href="/todolists/new">Add Item</Link></Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>

                            </div>
                        )}

                        {!listCreatedMe && (
                            <div className="text-center">
                                <h1 className="text-xl font-semibold mb-2">Your not created any lists!</h1>
                                <p className="mb-6">Create your first lists.</p>

                                <Link href='/lists/new'>Create issue</Link>
                            </div>
                        )}
                    </div>

                    {/* Shared by me */}
                    <div>
                        {issuesSharedByMe && (
                            <>
                                <h2 className="text-xl font-semibold mb-5">Shared by me</h2>
                                <DataTable issues={issuesSharedByMe} tableCol={tableCol} />
                            </>
                        )}
                    </div>

                    {/* Shared with me */}
                    <div>
                        {!issuesSharedWithMe && (
                            <>
                                <h2 className="text-xl font-semibold mb-5">Shared with me</h2>
                                <DataTable issues={issuesSharedWithMe} tableCol={tableCol} />
                            </>
                        )}
                    </div>

                </div>
            )}

            {!currentUser && (
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-xl font-semibold mb-2">Welcom to Issue Tracker App!</h1>
                        <p className="mb-6">Here, you can track your daily issue!</p>

                        <Link href='/api/auth/signin'>Sign in</Link>
                    </div>
                </div>
            )}
        </>


    )
}
