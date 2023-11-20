
import DataTable from "@/components/DataTable";
import UserWelcom from "@/components/UserWelcom";
import { Button, buttonVariants } from "@/components/ui/button";
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

    const issuesCreatedMe = await prisma.issue.findMany(
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

                        {issuesCreatedMe && (
                            <div>
                                <div className="flex justify-between">
                                    <h2 className="text-xl font-semibold mb-5">Created by me</h2>
                                    <Link href="/issues">View All</Link>
                                </div>
                                <DataTable issues={issuesCreatedMe} tableCol={tableCol} />
                            </div>
                        )}

                        {!issuesCreatedMe && (
                            <div className="text-center">
                                <h1 className="text-xl font-semibold mb-2">You'r not created any issue!</h1>
                                <p className="mb-6">Create your first issue.</p>

                                <Link href='/issues/new'>Create issue</Link>
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
