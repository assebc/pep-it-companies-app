declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    SALT: number;
    JWT_SECRET: string;
  }
}
