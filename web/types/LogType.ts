import GenerateRandomString from "../helpers/GenerateRandomString";

type LogType = {
  id: string;
  image?: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  authorEmail?: string;
  content: string;
  category: string;
  tags?: string[];
  publishDate?: Date;
}

export type LogCategoryType = {
  name: string;
  slug: string;
  textColor: string;
  backgroundColor: string;
}

export default LogType;
