import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";
import getCurrentUser from "@/app/hooks/getCurrentUser";

// Create List
export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { title } = body;

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

    const list = await prisma.list.create({
        data: {
            title,
            userId: currentUser.id,
        }
    });

    return NextResponse.json(list);
};

// GET Lists
export async function GET(request: NextRequest){
    const lists = await prisma.list.findMany({
        orderBy: {title: 'asc'}
    });

    return NextResponse.json(lists);
}