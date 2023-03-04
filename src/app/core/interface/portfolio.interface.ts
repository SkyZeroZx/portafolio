import { Technology } from "./technology.interface";

export interface PortfolioProject {
  id: string;
  name: string;
  logo : string;
  description: string;
  preview: string;
  repository: Repository[];
}

export interface Repository {
  type: string;
  link: string;
  technologies : Technology[];
}
