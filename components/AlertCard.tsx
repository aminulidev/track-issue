"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { buttonVariants } from "./ui/button";

interface Props {
    children: React.ReactNode;
    title: string;
    description: string;
    issueId: string;
}

const AlertCard = ({ children, title, description, issueId }: Props) => {
    const router = useRouter();

    const issueDeleteHandler = async () => {
        await axios.delete('/api/issues/' + issueId);
        router.push('/issues');
        router.refresh();
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => issueDeleteHandler()} className={buttonVariants({ variant: 'destructive' })}>Confirme</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertCard