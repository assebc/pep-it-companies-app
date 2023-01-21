import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient = new PrismaClient({
  log: ["query", "error", "warn", "info"],
});
