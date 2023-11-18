import { NextResponse } from "next/server";

import prisma from "@/prisma/client";
import getCurrentUser from "@/app/hooks/getCurrentUser";
import { todoListSchema } from "@/app/validationSchema";

export async function POST(
    request: Request,
) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { title, category } = body;

    // if (sharedBy) {
    //     const user = await prisma.user.findUnique({
    //         where: { id: sharedBy },
    //     });
    //     if (!user) return NextResponse.json({ error: 'Invalid User!' }, { status: 400 })
    // }

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const todoList = await prisma.todoList.create({
        data: {
            title,
            category,
        }
    });

    return NextResponse.json(todoList);
}