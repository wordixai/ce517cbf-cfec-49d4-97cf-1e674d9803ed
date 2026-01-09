import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TaskList } from '@/components/TaskList';
import { TaskDetail } from '@/components/TaskDetail';
import type { Task } from '@/types/task';

const initialTasks: Task[] = [
  {
    id: '1',
    title: '完成项目提案',
    time: '09:00 - 11:00',
    date: '2025年1月7日',
    priority: 'high',
    category: '工作',
    completed: false,
    subtasks: [
      { id: '1-1', title: '收集市场数据', completed: true },
      { id: '1-2', title: '撰写执行摘要', completed: false },
      { id: '1-3', title: '准备演示文稿', completed: false },
    ],
    notes: '需要在周五前完成并发送给团队审核',
  },
  {
    id: '2',
    title: '团队周会',
    time: '14:00 - 15:00',
    date: '2025年1月7日',
    priority: 'medium',
    category: '工作',
    completed: false,
    subtasks: [],
  },
  {
    id: '3',
    title: '健身房锻炼',
    time: '18:00 - 19:30',
    date: '2025年1月7日',
    priority: 'low',
    category: '个人',
    completed: false,
    subtasks: [
      { id: '3-1', title: '热身10分钟', completed: false },
      { id: '3-2', title: '力量训练', completed: false },
      { id: '3-3', title: '有氧运动', completed: false },
    ],
  },
  {
    id: '4',
    title: '购买日用品',
    date: '2025年1月7日',
    priority: 'low',
    category: '购物清单',
    completed: true,
    subtasks: [
      { id: '4-1', title: '牛奶', completed: true },
      { id: '4-2', title: '面包', completed: true },
      { id: '4-3', title: '水果', completed: true },
    ],
  },
];

export default function Index() {
  const [activeNav, setActiveNav] = useState('today');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(initialTasks[0]);

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
    if (selectedTask?.id === taskId) {
      setSelectedTask(prev => prev ? { ...prev, completed: !prev.completed } : null);
    }
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(subtask =>
            subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
          ),
        };
      }
      return task;
    }));
    if (selectedTask?.id === taskId) {
      setSelectedTask(prev => {
        if (!prev) return null;
        return {
          ...prev,
          subtasks: prev.subtasks.map(subtask =>
            subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
          ),
        };
      });
    }
  };

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseDetail = () => {
    setSelectedTask(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      <TaskList
        tasks={tasks}
        selectedTaskId={selectedTask?.id || null}
        onSelectTask={handleSelectTask}
        onToggleTask={handleToggleTask}
        onToggleSubtask={handleToggleSubtask}
      />
      <TaskDetail
        task={selectedTask}
        onClose={handleCloseDetail}
        onToggleSubtask={handleToggleSubtask}
      />
    </div>
  );
}
