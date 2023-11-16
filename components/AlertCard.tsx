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
import toast from "react-hot-toast";
import { buttonVariants } from "./ui/button";
import React from "react";

interface Props {
    children: React.ReactNode;
    title: string;
    description: string | React.ReactNode;
    alertFun: () => {};
}

const AlertCard = ({ children, title, description, alertFun }: Props) => {

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
                    <AlertDialogAction onClick={() => {alertFun()}} className={buttonVariants({ variant: 'destructive' })}>Confirme</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertCard