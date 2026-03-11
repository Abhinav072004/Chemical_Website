import { ReactNode } from 'react';
import { LayoutDashboard, CalendarDays, Users, GraduationCap, ChevronLeft, LogOut, Newspaper } from 'lucide-react';
import { NavLink, Navigate, Link } from 'react-router-dom';
import { isAuthenticated, setToken } from '../api';

// Simple Route Protection wrapper
export function AdminRoute({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const handleLogout = () => {
    if (!confirm('Log out from Admin Panel?')) return;
    setToken(null);
    window.location.reload();
  };

  // Modern navigation data including Student and News routes
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { id: 'faculty', label: 'Faculty', path: '/admin/faculty', icon: Users },
    { id: 'student', label: 'Students', path: '/admin/student', icon: GraduationCap },
    { id: 'events', label: 'Events', path: '/admin/events', icon: CalendarDays },
    { id: 'news', label: 'Latest News', path: '/admin/news', icon: Newspaper }, // <-- ADDED THIS LINE
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar - Dark theme integration */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 shadow-2xl">
        <div className="mb-10 pb-4 border-b border-slate-700">
          <h1 className="text-3xl font-bold">Admin</h1>
          <p className="text-slate-400 font-mono mt-1 text-xs">Chemical Dept</p>
        </div>

        {/* Navigation Items - uses NavLink for automatic active styling */}
        <nav className="flex-1 space-y-2.5">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.id === 'dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="h-4.5 w-4.5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Action Footer section */}
        <div className="mt-auto space-y-3 pt-6 border-t border-slate-700">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 text-slate-300 hover:text-white px-4 py-2 text-sm transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>View site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-2.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}