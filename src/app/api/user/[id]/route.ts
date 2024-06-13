import db from "@/db/db";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * GET /api/user/{id}
 * @param {object} ctx - The Next.js context object.
 * @param {object} ctx.params - The route parameters.
 * @param {string} ctx.params.id - The ID of the user.
 * @returns {Promise<NextResponse>} A promise that resolves to the JSON response containing the user.
 * @throws {Error} If the user is not found.
 */
export async function GET({
  params,
}: {
  params: { id: string };
}): Promise<NextResponse> {
  const id: string = params?.id;

  try {
    await db.$connect();
    const user: User | null = await db.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json(user);
  } catch (error) {
    db.$disconnect();
    return NextResponse.json({ error: (error as Error).message });
  } finally {
    await db.$disconnect();
  }
}


