import { Link, useLocation } from "react-router";
import { Clock, User, Users, Grid3x3 } from "lucide-react";

const navItems = [
  {
    id: "cycles",
    label: "绩效周期",
    path: "/performance/cycles",
    icon: Clock,
  },
  {
    id: "my",
    label: "我的绩效",
    path: "/performance/my",
    icon: User,
  },
  {
    id: "team",
    label: "团队绩效",
    path: "/performance/team",
    icon: Users,
  },
  {
    id: "nine-box",
    label: "人才九宫格",
    path: "/performance/nine-box",
    icon: Grid3x3,
  },
];

export function PerformanceNav() {
  const location = useLocation();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
      <nav className="flex items-center gap-1 p-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#1E40AF] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
