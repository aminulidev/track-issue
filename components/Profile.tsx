import getCurrentUser from "@/app/hooks/getCurrentUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Profile = async () => {
    const currentUser = await getCurrentUser();

    return (
        <>
            {currentUser && (
                <DropdownMenu>
                    <DropdownMenuTrigger className="focus-visible:outline-none">
                        <Avatar >
                            <AvatarImage src={currentUser.image} />
                            <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="me-4">
                        <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/issues">Issues</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link href="/api/auth/signout">Logout</Link></DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {!currentUser && <Link className='nav-link' href='/api/auth/signin'>Sign in</Link>}
        </>

    )
}

export default Profile