import { Company } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prisma";

class CompaniesController {
  async create(request: Request, response: Response) {
    const { name, website_url, reviews } = request.body;

    if (!name || !website_url || !reviews) {
      return response.status(400).json({ error: "Invalid data!" });
    }

    //buscar o id do user pelo jwt

    const newCompany: Company = await prisma.company.create({
      data: {
        name,
        website_url,
        reviews,
        votes: 0,
        created_by_id: 2,
      },
    });

    return response.status(201).json(newCompany);
  }

  async listAll(_: Request, response: Response) {
    const companies: Company[] = await prisma.company.findMany();

    return response.json(companies);
  }

  async listOne(request: Request, response: Response) {
    const { id } = request.params;

    const company: Company | null = await prisma.company.findFirst({
      where: { id: +id },
    });

    return response.json(company ?? {});
  }

  async addVote(request: Request, response: Response) {
    const { id } = request.params;

    const company: Company | null = await prisma.company.findFirst({
      where: { id: +id },
    });

    if (!company) return response.status(400).end();

    const updatedCompany: Company = await prisma.company.update({
      where: { id: +id },
      data: { votes: { increment: 1 } },
    });

    return response.json(updatedCompany);
  }

  async update(request: Request, response: Response) {
    const { name, website_url, reviews, votes } = request.body;
    const { id } = request.params;

    const company: Company | null = await prisma.company.findFirst({
      where: { id: +id },
    });

    if (!company) return response.status(400).end();

    if (!name || !website_url || !reviews || !votes)
      return response.status(400).json({ error: "Invalid data!" });

    const updatedCompany: Company = await prisma.company.update({
      where: { id: +id },
      data: { name, website_url, reviews, votes },
    });

    return response.json(updatedCompany);
  }
}

export default new CompaniesController();
