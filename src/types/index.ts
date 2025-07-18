type Status = "To Do" | "In Progress" | "Approved" | "Reject";

type Priority = "low" | "medium" | "high";

type Assignee = {
  id: string;
  name: string;
  avatar: string;
};

export interface Task {
  id: string;
  title: string;
  category: string;
  status: Status;
  assignees: Assignee[];
  attachments?: number;
  comments?: number;
  dueDate?: string;
  reports?: number;
  hasStream?: boolean;
  hasPreview?: boolean;
  hasGroupCall?: boolean;
  priority: Priority;
  order: number;
}
