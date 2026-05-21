import { Link } from "react-router";
import {
  Clock,
  Sun,
  FileText,
  Plane,
  DollarSign,
  CalendarDays,
  Award,
  Printer,
  LogOut,
  Bell,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const radarData = [
  { subject: "业绩", A: 85, fullMark: 100 },
  { subject: "能力", A: 78, fullMark: 100 },
  { subject: "态度", A: 92, fullMark: 100 },
  { subject: "协作", A: 88, fullMark: 100 },
  { subject: "创新", A: 75, fullMark: 100 },
];

const todos = [
  {
    id: "todo-001",
    type: "待提交",
    title: "Q2 绩效自评",
    deadline: "剩 3 天",
    color: "bg-red-50 border-red-200 text-red-700",
    icon: FileText,
  },
  {
    id: "todo-002",
    type: "待确认",
    title: "5 月工资条已发布",
    deadline: "",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    icon: CheckCircle,
  },
  {
    id: "todo-003",
    type: "待处理",
    title: "年假即将清零",
    deadline: "剩 7 天未休",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    icon: AlertCircle,
  },
  {
    id: "todo-004",
    type: "待回复",
    title: "新员工培训邀请",
    deadline: "",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    icon: Bell,
  },
];

const notifications = [
  { id: "notif-001", type: "公告", title: "端午节放假通知" },
  { id: "notif-002", type: "活动", title: "六一亲子日报名" },
  { id: "notif-003", type: "制度", title: "2026 新版考勤制度发布" },
];

const quickServices = [
  { id: "leave", label: "请假申请", icon: CalendarDays, path: "/attendance/leave" },
  { id: "overtime", label: "加班申请", icon: Clock, path: "/attendance/calendar" },
  { id: "expense", label: "报销申请", icon: DollarSign, path: "#" },
  { id: "trip", label: "出差申请", icon: Plane, path: "#" },
  { id: "patch", label: "补卡申请", icon: Clock, path: "/attendance/calendar" },
  { id: "compensate", label: "调休申请", icon: CalendarDays, path: "/attendance/leave" },
  { id: "certificate", label: "证明开具", icon: FileText, path: "#" },
  { id: "card", label: "名片打印", icon: Printer, path: "#" },
  { id: "resign", label: "离职申请", icon: LogOut, path: "#" },
];

export function SelfServicePortal() {
  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <span className="text-gray-900">员工自助</span>
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-100">
        <div className="flex items-center justify-between">
          {/* Left - Avatar & Greeting */}
          <div className="flex items-center gap-4">
            <img
              src="https://ui-avatars.com/api/?name=张伟&background=1E40AF&color=fff&size=80"
              alt="User"
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">
                早上好，张伟
              </h2>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </p>
            </div>
          </div>

          {/* Middle - Clock In Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg min-w-[240px]">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 mb-1">上班打卡</p>
              <p className="text-3xl font-bold text-green-600 tabular-nums">
                09:02
              </p>
              <p className="text-xs text-gray-500 mt-1">✓ 正常</p>
            </div>
            <p className="text-sm text-gray-600 mb-3 text-center">
              当前状态：工作中
            </p>
            <button className="w-full px-4 py-3 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] font-medium">
              下班打卡
            </button>
          </div>

          {/* Right - Weather & Date */}
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-2">
              <Sun className="w-6 h-6 text-orange-400" />
              <span className="text-2xl font-semibold text-gray-900">24°C</span>
            </div>
            <p className="text-sm text-gray-600">晴天 · 空气良好</p>
            <p className="text-xs text-gray-500 mt-1">北京市</p>
          </div>
        </div>
      </div>

      {/* Todos & Notifications */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left - My Todos */}
        <div className="col-span-2 space-y-4">
          <h3 className="font-semibold text-gray-900">我的待办</h3>
          <div className="grid grid-cols-2 gap-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`${todo.color} border-2 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <todo.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{todo.type}</span>
                      {todo.deadline && (
                        <span className="text-xs opacity-75">
                          · {todo.deadline}
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-sm">{todo.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Notifications */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">组织通知</h3>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                    【{notif.type}】
                  </span>
                </div>
                <p className="text-sm text-gray-900 mt-2">{notif.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Services */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">快捷服务</h3>
        <div className="grid grid-cols-9 gap-4">
          {quickServices.map((service) => (
            <Link
              key={service.id}
              to={service.path}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-[#1E40AF] transition-colors">
                  <service.icon className="w-6 h-6 text-[#1E40AF] group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {service.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Personal Data Overview */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left - Monthly Data */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">本月数据</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">出勤天数</p>
              <p className="text-2xl font-bold text-gray-900">
                18<span className="text-sm text-gray-500"> / 20 天</span>
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">加班时长</p>
              <p className="text-2xl font-bold text-gray-900">
                12<span className="text-sm text-gray-500"> 小时</span>
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">剩余年假</p>
              <p className="text-2xl font-bold text-gray-900">
                7<span className="text-sm text-gray-500"> 天</span>
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">本月实发</p>
              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                ¥31,247
              </p>
            </div>
          </div>
        </div>

        {/* Right - My Growth */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">我的成长</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">入职年限</p>
                <p className="text-xl font-bold text-gray-900">3 年 2 个月</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">累计加班</p>
                <p className="text-xl font-bold text-gray-900">156 小时</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">培训完成</p>
                <p className="text-xl font-bold text-gray-900">12 / 15</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">历史绩效</p>
              <ResponsiveContainer width="100%" height={140}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#E5E7EB" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                  <Radar
                    dataKey="A"
                    stroke="#1E40AF"
                    fill="#1E40AF"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
