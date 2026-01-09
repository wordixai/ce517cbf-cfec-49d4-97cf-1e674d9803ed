import { X, Calendar, Clock, Flag, Paperclip, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Task } from '@/types/task';

interface TaskDetailProps {
  task: Task | null;
  onClose: () => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
}

const priorityColors = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

const priorityLabels = {
  high: '高优先级',
  medium: '中优先级',
  low: '低优先级',
};

export function TaskDetail({ task, onClose, onToggleSubtask }: TaskDetailProps) {
  if (!task) return null;

  return (
    <aside className="w-80 h-screen bg-[hsl(var(--detail-panel))] border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h2 className="font-medium text-foreground">任务详情</h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
        {/* Title */}
        <div>
          <h3 className="text-lg font-medium text-foreground">{task.title}</h3>
        </div>

        {/* Date & Time */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{task.date}</span>
          </div>
          {task.time && (
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{task.time}</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm">
            <Flag className={cn('w-4 h-4', priorityColors[task.priority])} />
            <span className={priorityColors[task.priority]}>{priorityLabels[task.priority]}</span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">备注</h4>
          <textarea
            placeholder="添加备注..."
            defaultValue={task.notes}
            className="w-full bg-muted/50 text-foreground rounded-lg p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none min-h-[80px]"
          />
        </div>

        {/* Subtasks */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">子任务</h4>
          <div className="space-y-2">
            {task.subtasks.map((subtask) => (
              <div key={subtask.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <button
                  onClick={() => onToggleSubtask(task.id, subtask.id)}
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
                  'text-sm flex-1',
                  subtask.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                )}>
                  {subtask.title}
                </span>
              </div>
            ))}
            <button className="w-full flex items-center gap-2 p-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-4 h-4" />
              <span>添加子任务</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Paperclip className="w-4 h-4" />
          <span>附件</span>
        </button>
        <button className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 transition-colors">
          <Trash2 className="w-4 h-4" />
          <span>删除</span>
        </button>
      </div>
    </aside>
  );
}
