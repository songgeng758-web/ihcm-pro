import { Link, useLocation } from "react-router";
import { Calculator, Building2, User } from "lucide-react";

const navItems = [
  {
    id: "calculation",
    label: "薪酬核算",
    path: "/payroll/calculation",
    icon: Calculator,
  },
  {
    id: "structure",
    label: "薪酬结构",
    path: "/payroll/structure",
    icon: Building2,
  },
  {
    id: "my",
    label: "我的薪酬",
    path: "/payroll/my",
    icon: User,
  },
];

export function PayrollNav() {
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
