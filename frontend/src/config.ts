export interface Empresa {
  key: string;
  name: string;
  website_url: string;
  reviews: string;
  votes: number;
}

export const companiesData: Empresa[] = [
  {
    key: "1",
    name: "Critical Techworks",
    reviews:
      'Oportunidade de Carreira / Tecnologias de Ponta / Excelente Ambiente de Equipa / Formação Constante / Empresa excelente, muitos benefícios / malta top (Depende do projeto onde calhas) / Os aumentos são bons, Organização boa / os salarios nao sao muito bons, por vezes nao acompanha o crescimento da pessoa / Estrutura muito horizontal, equipas scrum auto geriveis com foco na autonomia. Somos incentivados a ser "donos do produto" e nao apenas alguem que faz o que mandam',
    website_url: "https://www.criticaltechworks.com/",
    votes: 11,
  },
  {
    key: "2",
    name: "Blip",
    reviews:
      "Boa equipa, boas condiçoes, bons salarios, usam tech recente e bons beneficios",
    website_url: "https://www.blip.pt/",
    votes: 3,
  },
  {
    key: "3",
    name: "Deloitte",
    reviews:
      "Excelente para primeiro trabalho, aposta na formação e é uma empresa que dá a oportunidade de se trabalhar com muitas tecnologias diferentes e tem um ambiente de trabalho top entre colegas e equipas. (falo por experiência própria) / Os salários são normais mas exigem demais dos colaboradores / deloitte nao é ma como entry, 1 ano e estas set para entrar facilmente noutro sitio / facilidade de transitar entre stack",
    website_url: "https://www2.deloitte.com/pt/pt.html",
    votes: 3,
  },
];
