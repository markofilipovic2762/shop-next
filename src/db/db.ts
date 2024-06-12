import { PrismaClient } from "@prisma/client";

const PrismaClientSingleton = () => new PrismaClient();

declare global {
    var prisma: undefined | ReturnType<typeof PrismaClientSingleton>;
}

const prisma = globalThis.prisma || PrismaClientSingleton();

export default prisma;
