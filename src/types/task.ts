export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  time?: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  completed: boolean;
  subtasks: SubTask[];
  notes?: string;
}

export interface TaskList {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface NavItem {
  id: string;
  name: string;
  icon: string;
  count?: number;
}
