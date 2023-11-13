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
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const issue = await prisma.issue.create({
        data: {
            title,
            description,
            userId: currentUser.id
        }
    });

    return NextResponse.json(issue);
}