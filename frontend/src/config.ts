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

// TODO: check if needed
export interface IUser {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  password: string;
  confirmPassword: string;
}