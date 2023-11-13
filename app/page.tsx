
import DataTable from "@/components/DataTable";
import UserWelcom from "@/components/UserWelcom";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma/client";
import Link from "next/link";
import getCurrentUser from "./hooks/getCurrentUser";

export default async function Home() {
    const currentUser = await getCurrentUser();

    const tableCol = [
        { id: 1, title: 'Title' },
        { id: 2, title: 'Status' },
        { id: 3, title: 'Created' },
        { id: 4, title: 'Action' },
    ];

    const issues = await prisma.issue.findMany(
        {
            where: {
                userId: currentUser?.id,
            },
        }
    );

    return (
        <>
            {currentUser && (
                <div className="flex flex-col gap-10">
                    <UserWelcom />

                    {/* Created by me */}
                    <div>

                        {issues && (
                            <div>
                                <h2 className="text-xl font-semibold mb-5">Created by me</h2>
                                <DataTable issues={issues} tableCol={tableCol} />
                            </div>
                        )}

                        {!issues && (
                            <div className="text-center">
                                <h1 className="text-xl font-semibold mb-2">You'r not created any issue!</h1>
                                <p className="mb-6">Create your first issue.</p>

                                <Button variant='default'><Link href='/issues/new'>Create issue</Link></Button>
                            </div>
                        )}
                    </div>

                    {/* Shared by me */}
                    <div>
                        <h2 className="text-xl font-semibold mb-5">Shared by me</h2>
                        {/* <DataTable issues={issues} tableCol={tableCol} /> */}
                    </div>

                    {/* Shared with me */}
                    <div>
                        <h2 className="text-xl font-semibold mb-5">Shared with me</h2>
                        {/* <DataTable issues={issues} tableCol={tableCol} /> */}
                    </div>

                </div>
            )}

            {!currentUser && (
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-xl font-semibold mb-2">Welcom to Issue Tracker App!</h1>
                        <p className="mb-6">Here, you can track your daily issue!</p>

                        <Button variant='default'><Link href='/api/auth/signin'>Sign in</Link></Button>
                    </div>
                </div>

            )}
        </>

    )
}
