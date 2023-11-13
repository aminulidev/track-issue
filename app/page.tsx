'use client'

import UserWelcom from "@/components/UserWelcom";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
    const { status, data: session } = useSession();

    return (
        <>
            {status === 'authenticated' && (
                <div className="flex flex-col gap-5 bg-slate-100 p-5 rounded">
                    <UserWelcom />

                    {/* Issues Created by me */}
                    <div>
                        <h2 className="font-semibold">Issues Created by me:</h2>
                    </div>

                </div>
            )}

            {status === 'unauthenticated' && (
                <div className="flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-xl font-semibold mb-2">Welcom to Issue Tracker App!</h1>
                        <p className="mb-6">Here, you can track your daily issue!</p>

                        <Link href='/api/auth/signin' className={buttonVariants({ variant: 'default' })}>Sign in</Link>
                    </div>
                </div>

            )}
        </>

    )
}
