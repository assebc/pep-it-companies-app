import { Prisma, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prisma";
import { hash } from "bcryptjs";

class UserController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ error: "Invalid data!" });
    }
    try {
      const hashedPW: string = await hash(password, +process.env.SALT);
      const newUser: User = await prisma.user.create({
        data: {
          email,
          password: hashedPW,
        },
      });

      return response.status(201).json(newUser);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return response
          .status(400)
          .json({ error: "Email already registered!" });
      }
    }
  }

  async listAll(_request: Request, response: Response) {
    const users: User[] = await prisma.user.findMany({
      where: {
        deleted: false,
      },
    });

    return response.json(users);
  }

  async updatePassword(request: Request, response: Response) {
    const { email, newPassword, confirmationPassword } = request.body;

    const user: User | null = await prisma.user.findFirst({
      where: {
        email,
        deleted: false,
      },
    });

    if (!user) return response.status(400).json({ error: "Email not found!" });

    if (!newPassword || !confirmationPassword)
      return response.status(400).json({ error: "Invalid data!" });

    if (!(newPassword === confirmationPassword))
      return response.status(400).json({ error: "Passwords don't match!" });

    const newPasswordHashed: string = await hash(
      newPassword,
      +process.env.SALT
    );

    const updatedUser: User = await prisma.user.update({
      where: { email },
      data: { password: newPasswordHashed },
    });

    return response.json(updatedUser);
  }

  async delete(request: Request, response: Response) {
    //TODO: implement soft delete from jwt token userID
  }
}

export default new UserController();
