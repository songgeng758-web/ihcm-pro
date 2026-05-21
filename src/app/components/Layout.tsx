import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Bell,
  Mail,
  HelpCircle,
  ChevronDown,
  Search,
  Menu,
  ChevronRight,
  LayoutDashboard,
  Users,
  UserPlus,
  Briefcase,
  Target,
  GraduationCap,
  DollarSign,
  Clock,
  UserCircle,
  BarChart3,
  FileText,
  TrendingUp,
  Settings,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "工作台",
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: "/",
  },
  {
    id: "core-hr",
    label: "核心人事",
    icon: <Users className="w-5 h-5" />,
    children: [
      { label: "组织管理", path: "/organization" },
      { label: "员工档案", path: "/employees" },
      { label: "入转调离", path: "/movements" },
    ],
  },
  {
    id: "talent",
    label: "人才管理",
    icon: <Target className="w-5 h-5" />,
    children: [
      { label: "招聘管理", path: "/recruit/jobs" },
      { label: "绩效管理", path: "/performance/cycles" },
      { label: "培训", path: "/training" },
    ],
  },
  {
    id: "services",
    label: "员工服务",
    icon: <UserCircle className="w-5 h-5" />,
    children: [
      { label: "薪酬管理", path: "/payroll/calculation" },
      { label: "考勤休假", path: "/attendance/calendar" },
      { label: "员工自助", path: "/self-service/portal" },
      { label: "审批中心", path: "/manager/approvals" },
    ],
  },
  {
    id: "insights",
    label: "HR 洞察",
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      { label: "数据看板", path: "/dashboards" },
      { label: "报表中心", path: "/reports/center" },
      { label: "人才流失预警", path: "/insights/turnover-risk" },
      { label: "组织健康度分析", path: "/insights/org-health" },
    ],
  },
  {
    id: "settings",
    label: "系统设置",
    icon: <Settings className="w-5 h-5" />,
    path: "/settings",
  },
];

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["core-hr"]);
  const location = useLocation();

  const toggleMenu = (id: string) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navigation */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 flex-shrink-0">
        <div className="flex items-center gap-4 flex-1">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1E40AF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">iH</span>
            </div>
            <span className="font-semibold text-gray-900">iHCM Pro</span>
          </div>

          {/* Subsystem Switcher */}
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded">
            人力资本管理
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索员工、部门、文档..."
              className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:bg-white"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-gray-50 rounded-lg">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>
          <button className="flex items-center gap-2 ml-2 p-1 hover:bg-gray-50 rounded-lg">
            <img
              src="https://ui-avatars.com/api/?name=Admin&background=1E40AF&color=fff"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ${
            sidebarCollapsed ? "w-16" : "w-[220px]"
          }`}
        >
          <div className="p-3 border-b border-gray-200">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-50 rounded-lg w-full flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <nav className="p-2 overflow-y-auto h-[calc(100vh-56px-57px)]">
            {menuItems.map((item) => (
              <div key={item.id} className="mb-1">
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 ${
                        sidebarCollapsed ? "justify-center" : ""
                      }`}
                    >
                      <span className="text-gray-600">{item.icon}</span>
                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1 text-left text-gray-700">
                            {item.label}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                              expandedMenus.includes(item.id) ? "rotate-90" : ""
                            }`}
                          />
                        </>
                      )}
                    </button>
                    {!sidebarCollapsed && expandedMenus.includes(item.id) && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`block px-3 py-1.5 text-sm rounded-lg hover:bg-gray-50 ${
                              location.pathname === child.path
                                ? "text-[#1E40AF] bg-[#E6F1FB]"
                                : "text-gray-600"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path || "/"}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 ${
                      sidebarCollapsed ? "justify-center" : ""
                    } ${
                      location.pathname === item.path
                        ? "text-[#1E40AF] bg-[#E6F1FB]"
                        : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                    {!sidebarCollapsed && (
                      <span className="text-gray-700">{item.label}</span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
