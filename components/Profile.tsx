import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from 'next-auth/react';
import Link from "next/link";

const Profile = () => {
    const { status, data: session } = useSession();

    return (
        <>
            {status === 'authenticated' && (
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus-visible:outline-none">
                        <Avatar >
                            <AvatarImage src={session.user?.image!} />
                            <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="me-4">
                        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/issues">Issues</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/api/auth/signout">Logout</Link></DropdownMenuItem>
                        
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {status === 'unauthenticated' && <Link className='nav-link' href='/api/auth/signin'>Signin</Link>}
        </>

    )
}

export default Profile