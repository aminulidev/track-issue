import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import getCurrentUser from "@/app/hooks/getCurrentUser";

export async function POST(request: NextRequest) {
    const currentUser = await getCurrentUser();
    console.log(currentUser)
    if (!currentUser) {
        return NextResponse.error();
    }

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });

    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
            userId: body.currentUser.id
        }
    });

    return NextResponse.json(newIssue, { status: 201 });
}