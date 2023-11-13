'use client'

import { useSession } from "next-auth/react";

const UserWelcom = () => {
    const { status, data: session } = useSession();
    return (
        <div>
            {status === 'authenticated' && (
                <h1 className="text-xl font-semibold text-center">Hello, {session.user?.name?.split(' ')[0]}</h1>
            )}
        </div>
    )
}

export default UserWelcom