export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export type AIAction =
  | {
      type: "answer";
      message: string;
    }
  | {
      type: "clarify";
      message: string;
    }
  | {
      type: "create_task";
      message: string;
      title: string;
      date: string | null;
      time: string | null;
      endTime: string | null;
      category: string | null;
      isImportant: boolean;
    }
  | {
      type: "reschedule_task";
      message: string;
      taskId: number;
      date: string;
      time: string | null;
      endTime: string | null;
    };
