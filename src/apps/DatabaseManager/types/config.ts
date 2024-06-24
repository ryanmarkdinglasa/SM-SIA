export interface Config {
    server: string;
    name: string;
    user: string;
    password: string;
    port: number;
  }

export const initialValues: Config = {
  server: '',
  name: '',
  user: '',
  password: '',
  port: 0,
};