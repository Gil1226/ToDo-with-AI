export type Task = {
  id: number;
  title: string;
  time: string | null;
  date: string;
  category: string;
  completed?: boolean;
};  