import { Search, Calendar, StickyNote, Plus, Tag, ChevronDown, Sun, CalendarDays, User, Briefcase, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
}

const navItems = [
  { id: 'today', name: '今天', icon: Sun, count: 4 },
  { id: 'upcoming', name: '即将到来', icon: CalendarDays, count: 12 },
  { id: 'calendar', name: '日历', icon: Calendar },
  { id: 'notes', name: '便签板', icon: StickyNote },
];

const lists = [
  { id: 'personal', name: '个人', icon: User, color: 'bg-purple-500', count: 3 },
  { id: 'work', name: '工作', icon: Briefcase, color: 'bg-blue-500', count: 6 },
  { id: 'shopping', name: '购物清单', icon: ShoppingCart, color: 'bg-green-500', count: 2 },
];

export function Sidebar({ activeNav, onNavChange }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* User Profile */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-medium text-primary-foreground">
          EW
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sidebar-foreground">Eric Wu</h3>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索"
            className="w-full bg-sidebar-accent text-sidebar-foreground pl-10 pr-4 py-2 rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-ring"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-2 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
              activeNav === item.id
                ? 'bg-sidebar-accent text-sidebar-foreground'
                : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1 text-left">{item.name}</span>
            {item.count && (
              <span className="text-muted-foreground">{item.count}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Lists Section */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">列表</h4>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          {lists.map((list) => (
            <button
              key={list.id}
              onClick={() => onNavChange(list.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                activeNav === list.id
                  ? 'bg-sidebar-accent text-sidebar-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <div className={cn('w-2 h-2 rounded-full', list.color)} />
              <span className="flex-1 text-left">{list.name}</span>
              <span className="text-muted-foreground">{list.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors">
          <Plus className="w-5 h-5" />
          <span>添加新列表</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors">
          <Tag className="w-5 h-5" />
          <span>标签</span>
        </button>
      </div>
    </aside>
  );
}
