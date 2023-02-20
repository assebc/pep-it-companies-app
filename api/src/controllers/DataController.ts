import { Request, Response } from "express";
import { prisma } from "../prisma";
const data: any[] = require("../../companies.json");

class DataController {
  static formatData = () => {
    return data.reduce((acc, company) => {
      acc.push({
        name: company.EMPRESAS,
        reviews: company.INFORMAÇÕES,
        website_url: company.WEBSITE.slice(7, -1),
        votes: company.VOTAÇÕES !== "" ? +company.VOTAÇÕES : 0,
        created_by_id: 1,
      });

      return acc;
    }, []);
  };

  async import(_: Request, response: Response) {
    const formatedData = DataController.formatData();

    const created = await prisma.company.createMany({
      data: formatedData,
    });

    return response.status(201).json({ created }).end();
  }
}

export default new DataController();
