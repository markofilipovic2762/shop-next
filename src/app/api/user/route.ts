import db from "@/db/db"
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    
    try {
        await db?.$connect();
        const users = await db?.user.findMany();
        console.log(users);
        return NextResponse.json(users)
    } catch (error) {
        db.$disconnect();
    } finally {
        await db?.$disconnect();
    }
}

export async function POST(req:NextApiRequest, res: NextApiResponse) {
    const newUser = req?.body;

    // const newUser = {
    //     name: 'Marko',
    //     email: 'rjwZt@example.com',
    //     password: 'password',
    //     isAdmin: true
    // }


    try {
        await db.$connect();
        const user = await db.user.create({ data: {  ...newUser} });
        return NextResponse.json(user);
    } catch (error) {
        db.$disconnect();
        return NextResponse.json({ error: (error as Error).message });
    } finally {
        await db.$disconnect();
    }
}