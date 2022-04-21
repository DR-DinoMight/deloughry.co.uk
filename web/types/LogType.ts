import GenerateRandomString from "../helpers/GenerateRandomString";

type LogType = {
  id: string;
  image?: string;
  title: string;
  intro: string;
  author: string;
  date: string;
  content: string;
  category: string;
  tags?: string[];
}

export type LogCategoryType = {
  name: string;
  slug: string;
  textColor: string;
  backgroundColor: string;
}

export const SampleLogData: LogType[] = [
  {
    id: GenerateRandomString(5),
    title: 'Boost your conversion rate',
    intro: 'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    author: 'Matthew Peck-Deloughry',
    date: '2022-01-29',
    content: 'I learnt something today',
    category: 'til',
  },
  {
    id: GenerateRandomString(5),
    title: 'Til some messages',
    intro: 'Optio cum necessitatibus dolor voluptatum provident commodi et. Qui aperiam fugiat nemo cumque.',
    author: 'Matthew Peck-Deloughry',
    date: '2022-01-28',
    content: 'I learnt something today',
    category: 'backend',
  },
  {
    id: GenerateRandomString(5),
    title: 'Improve your customer experience',
    intro: 'Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus. Voluptas iusto libero adipisci rem et corporis.',
    author: 'Matthew Peck-Deloughry',
    date: '2022-01-27',
    content: 'I learnt something today',
    category: 'life',
  },
  {
    id: GenerateRandomString(5),
    title: 'Writing effective landing page copy',
    intro: 'Ipsum voluptates quia doloremque culpa qui eius. Id qui id officia molestias quaerat deleniti. Qui facere numquam autem libero quae cupiditate asperiores vitae cupiditate. Cumque id deleniti explicabo.',
    author: 'Matthew Peck-Deloughry',
    date: '2022-01-27',
    content: 'I learnt something today',
    category: 'other',
  }
]

export default LogType;
