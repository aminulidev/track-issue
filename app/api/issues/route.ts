import { NextResponse } from "next/server";

import prisma from "@/prisma/client";
import getCurrentUser from "@/app/hooks/getCurrentUser";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        status,
        sharedTo,
        sharedBy
    } = body;

    if (sharedBy) {
        const user = await prisma.user.findUnique({
            where: { id: sharedBy },
        });
        if (!user) return NextResponse.json({ error: 'Invalid User!' }, { status: 400 })
    }

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const issue = await prisma.issue.create({
        data: {
            title,
            description,
            status,
            sharedTo,
            sharedBy: currentUser.id,
            userId: currentUser.id,
        }
    });

    return NextResponse.json(issue);
}