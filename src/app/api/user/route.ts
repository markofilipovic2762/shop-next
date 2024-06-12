import db from "@/db/db"
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    
    try {
        await db?.$connect();
        const users = await db?.user.findFirst();
        console.log(users);
        return NextResponse.json(users)
        db.$disconnect();
    } catch (error) {
        db.$disconnect();
    }
}