import { Company } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prisma";
import { writeFile } from "fs";
const data: any[] = require("../../import.json");

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

  async download(_: Request, response: Response) {
    const companies: Partial<Company>[] = await prisma.company.findMany({
      where: { deleted: false },
      select: { name: true, reviews: true, website_url: true, votes: true },
    });

    const fileHeader = `# pep-it-portugal-companies\n\nIT Companies Portugal\n\n`;
    const tableHeader = `| EMPRESAS | INFORMAÇÕES | WEBSITE | VOTAÇÕES |\n| --- | --- | --- | --- |\n`;
    let tableData: string = "";

    companies.forEach(
      (company: Partial<Company>) =>
        (tableData += `| ${company.name} | ${company.reviews} | [LINK](${company.website_url}) | ${company.votes}\n`)
    );
    const file = `${fileHeader} ${tableHeader} ${tableData}`;

    writeFile(`companies_${Date.now()}.md`, file, (err) => {
      if (err) console.log(err);
    });

    return response.json({ message: "Ficheiro criado com sucesso" }).end();
  }
}

export default new DataController();
