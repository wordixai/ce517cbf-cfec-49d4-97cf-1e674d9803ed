import { useState } from 'react';
import { Plus, ChevronDown, ChevronRight, Clock, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Task } from '@/types/task';

interface TaskListProps {
  tasks: Task[];
  selectedTaskId: string | null;
  onSelectTask: (task: Task) => void;
  onToggleTask: (taskId: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
}

const priorityColors = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

const priorityLabels = {
  high: '高',
  medium: '中',
  low: '低',
};

const categoryColors: Record<string, string> = {
  '个人': 'bg-purple-500/20 text-purple-400',
  '工作': 'bg-blue-500/20 text-blue-400',
  '购物清单': 'bg-green-500/20 text-green-400',
};

export function TaskList({ tasks, selectedTaskId, onSelectTask, onToggleTask, onToggleSubtask }: TaskListProps) {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set(['1']));

  const toggleExpand = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <main className="flex-1 h-screen overflow-hidden flex flex-col bg-background">
      {/* Header */}
      <header className="p-6 pb-4">
        <h1 className="text-2xl font-bold text-foreground">今天</h1>
        <p className="text-muted-foreground text-sm mt-1">{dateString}</p>
      </header>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-thin">
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id}>
              <div
                onClick={() => onSelectTask(task)}
                className={cn(
                  'group p-4 rounded-xl cursor-pointer transition-all',
                  'bg-[hsl(var(--task-card))] hover:bg-[hsl(var(--task-card-hover))]',
                  selectedTaskId === task.id && 'ring-1 ring-primary'
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Expand Button */}
                  {task.subtasks.length > 0 && (
                    <button
                      onClick={(e) => toggleExpand(task.id, e)}
                      className="mt-0.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {expandedTasks.has(task.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  {/* Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTask(task.id);
                    }}
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5',
                      task.completed
                        ? 'bg-primary border-primary'
                        : 'border-muted-foreground hover:border-primary'
                    )}
                  >
                    {task.completed && (
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'font-medium text-foreground',
                        task.completed && 'line-through text-muted-foreground'
                      )}>
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      {task.time && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{task.time}</span>
                        </div>
                      )}
                      <div className={cn('px-2 py-0.5 rounded text-xs', categoryColors[task.category] || 'bg-muted text-muted-foreground')}>
                        {task.category}
                      </div>
                      <div className={cn('flex items-center gap-1 text-xs', priorityColors[task.priority])}>
                        <Flag className="w-3 h-3" />
                        <span>{priorityLabels[task.priority]}</span>
                      </div>
                      {task.subtasks.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} 子任务
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtasks */}
                {expandedTasks.has(task.id) && task.subtasks.length > 0 && (
                  <div className="mt-3 ml-12 space-y-2">
                    {task.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSubtask(task.id, subtask.id);
                          }}
                          className={cn(
                            'w-4 h-4 rounded border flex items-center justify-center transition-colors flex-shrink-0',
                            subtask.completed
                              ? 'bg-primary border-primary'
                              : 'border-muted-foreground hover:border-primary'
                          )}
                        >
                          {subtask.completed && (
                            <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className={cn(
                          'text-sm',
                          subtask.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                        )}>
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <button className="mt-4 w-full p-4 rounded-xl border-2 border-dashed border-muted hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          <span>添加新任务</span>
        </button>
      </div>
    </main>
  );
}
