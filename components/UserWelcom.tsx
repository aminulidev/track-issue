import getCurrentUser from "@/app/hooks/getCurrentUser";
import { useSession } from "next-auth/react";

const UserWelcom = async () => {
    const currentUser = await getCurrentUser();

    return (
        <div>
            {currentUser && (
                <h1 className="text-2xl font-bold text-center">Hello, {currentUser.name?.split(' ')[0]}</h1>
            )}
        </div>
    )
}

export default UserWelcom