export const ACCESS_TOKEN_KEY: string = "accessToken";

export interface ICompany {
  id: number;
  name: string;
  website_url: string;
  reviews: string;
  votes: number;
  created_by_id: number;
  deleted: boolean;
}

export interface ICreateUpdateCompanyData {
  id: number;
  name: string;
  website_url: string;
  reviews: string;
  votes?: number;
}
