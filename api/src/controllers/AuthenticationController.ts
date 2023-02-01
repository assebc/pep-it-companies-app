import { User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

class AuthenticationController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password)
      return response.status(400).json({ error: "Invalid data!" });

    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return response.status(400).json({ error: "Invalid credentials!" });

    if (!(await compare(password, user.password)))
      return response.status(400).json({ message: "Invalid creadentials" });

    const token: string = sign({}, process.env.JWT_SECRET, {
      subject: String(user.id),
      expiresIn: "1d",
    });

    return response.json(token);
  }
}

export default new AuthenticationController();
