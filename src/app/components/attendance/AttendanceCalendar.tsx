import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar as CalendarIcon,
  Clock,
  TrendingUp,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const kpiData = [
  {
    id: "attendance",
    title: "本月出勤",
    value: "18 天",
    icon: CalendarIcon,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "late",
    title: "迟到",
    value: "1 次",
    icon: Clock,
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: "overtime",
    title: "加班",
    value: "12 小时",
    icon: TrendingUp,
    color: "bg-green-50 text-green-600",
  },
  {
    id: "exceptions",
    title: "异常待处理",
    value: "2",
    icon: AlertCircle,
    color: "bg-red-50 text-red-600",
  },
];

const calendarData = [
  { date: 1, day: 3, checkIn: "09:02", checkOut: "18:35", status: "normal" },
  { date: 2, day: 4, checkIn: "09:15", checkOut: "18:40", status: "late" },
  { date: 3, day: 5, checkIn: "09:00", checkOut: "20:30", status: "overtime" },
  { date: 4, day: 6, checkIn: null, checkOut: null, status: "weekend" },
  { date: 5, day: 0, checkIn: null, checkOut: null, status: "weekend" },
  { date: 6, day: 1, checkIn: "08:58", checkOut: "18:25", status: "normal" },
  { date: 7, day: 2, checkIn: "09:03", checkOut: "18:30", status: "normal" },
  { date: 8, day: 3, checkIn: "09:05", checkOut: "18:28", status: "normal" },
  { date: 9, day: 4, checkIn: "09:00", checkOut: "18:45", status: "normal" },
  { date: 10, day: 5, checkIn: "09:02", checkOut: "19:30", status: "overtime" },
  { date: 11, day: 6, checkIn: null, checkOut: null, status: "weekend" },
  { date: 12, day: 0, checkIn: null, checkOut: null, status: "weekend" },
  { date: 13, day: 1, checkIn: "09:01", checkOut: "18:35", status: "normal" },
  { date: 14, day: 2, checkIn: "09:04", checkOut: "18:20", status: "normal" },
  { date: 15, day: 3, checkIn: "09:00", checkOut: "18:40", status: "normal" },
  { date: 16, day: 4, checkIn: null, checkOut: null, status: "missing" },
  { date: 17, day: 5, checkIn: "09:03", checkOut: "18:35", status: "normal" },
  { date: 18, day: 6, checkIn: null, checkOut: null, status: "weekend" },
  { date: 19, day: 0, checkIn: null, checkOut: null, status: "weekend" },
  { date: 20, day: 1, checkIn: "08:59", checkOut: "18:30", status: "normal" },
  { date: 21, day: 2, checkIn: "09:02", checkOut: "18:25", status: "normal" },
  { date: 22, day: 3, checkIn: null, checkOut: null, status: "leave" },
  { date: 23, day: 4, checkIn: null, checkOut: null, status: "leave" },
  { date: 24, day: 5, checkIn: null, checkOut: null, status: "leave" },
  { date: 25, day: 6, checkIn: null, checkOut: null, status: "weekend" },
  { date: 26, day: 0, checkIn: null, checkOut: null, status: "weekend" },
  { date: 27, day: 1, checkIn: "09:00", checkOut: "18:40", status: "normal" },
  { date: 28, day: 2, checkIn: "09:05", checkOut: "18:30", status: "normal" },
  { date: 29, day: 3, checkIn: "09:01", checkOut: "20:15", status: "overtime" },
  { date: 30, day: 4, checkIn: "09:03", checkOut: "18:35", status: "normal" },
  { date: 31, day: 5, checkIn: "09:00", checkOut: "18:45", status: "normal" },
];

const dailyHours = [
  { date: "1日", hours: 9.5 },
  { date: "2日", hours: 9.4 },
  { date: "3日", hours: 11.5 },
  { date: "6日", hours: 9.4 },
  { date: "7日", hours: 9.5 },
  { date: "8日", hours: 9.4 },
  { date: "9日", hours: 9.8 },
  { date: "10日", hours: 10.5 },
  { date: "13日", hours: 9.6 },
  { date: "14日", hours: 9.3 },
  { date: "15日", hours: 9.7 },
  { date: "17日", hours: 9.5 },
  { date: "20日", hours: 9.5 },
  { date: "21日", hours: 9.4 },
  { date: "27日", hours: 9.7 },
  { date: "28日", hours: 9.4 },
  { date: "29日", hours: 11.3 },
  { date: "30日", hours: 9.5 },
  { date: "31日", hours: 9.8 },
];

const weekDays = ["一", "二", "三", "四", "五", "六", "日"];

const getStatusBadge = (status: string) => {
  const badges: Record<string, { text: string; className: string }> = {
    normal: { text: "✓", className: "bg-green-100 text-green-700" },
    late: { text: "⏰", className: "bg-orange-100 text-orange-700" },
    overtime: { text: "+", className: "bg-blue-100 text-blue-700" },
    leave: { text: "假", className: "bg-purple-100 text-purple-700" },
    missing: { text: "⚠", className: "bg-red-100 text-red-700" },
    weekend: { text: "", className: "bg-gray-50" },
  };
  return badges[status] || badges.normal;
};

export function AttendanceCalendar() {
  const [currentMonth, setCurrentMonth] = useState("2026年5月");
  const today = 21;

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/attendance/calendar" className="hover:text-gray-700">
          考勤休假
        </Link>
        <span>/</span>
        <span className="text-gray-900">考勤打卡日历</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">考勤打卡日历</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{item.title}</p>
              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-50 rounded transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-lg font-semibold text-gray-900 min-w-[120px] text-center">
              {currentMonth}
            </span>
            <button className="p-2 hover:bg-gray-50 rounded transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              申请补卡
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              申请加班
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              导出考勤
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="col-span-3 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-7 gap-2">
            {/* Week Headers */}
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 py-2"
              >
                周{day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarData.map((day) => {
              const badge = getStatusBadge(day.status);
              const isToday = day.date === today;
              const isWeekend = day.status === "weekend";
              const hasException =
                day.status === "missing" || day.status === "late";

              return (
                <div
                  key={day.date}
                  className={`min-h-[100px] border rounded-lg p-2 ${
                    isToday ? "border-2 border-[#1E40AF]" : "border-gray-200"
                  } ${isWeekend ? "bg-gray-50" : "bg-white"} ${
                    hasException ? "bg-red-50" : ""
                  } hover:shadow-sm transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span
                      className={`text-sm font-medium ${
                        isToday ? "text-[#1E40AF]" : "text-gray-900"
                      }`}
                    >
                      {day.date}
                    </span>
                    {badge.text && (
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded ${badge.className}`}
                      >
                        {badge.text}
                      </span>
                    )}
                  </div>
                  {day.checkIn && (
                    <div className="space-y-1 text-xs">
                      <div
                        className={`${
                          day.status === "late"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        ↑ {day.checkIn}
                      </div>
                      <div
                        className={`${
                          day.status === "overtime"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        ↓ {day.checkOut}
                      </div>
                    </div>
                  )}
                  {day.status === "leave" && (
                    <div className="text-xs text-purple-600 mt-2">年假</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar - Statistics */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">本月统计</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">应出勤天数</span>
                <span className="text-sm font-medium text-gray-900">20 天</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">实际出勤天数</span>
                <span className="text-sm font-medium text-gray-900">18 天</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-600">平均上班时间</span>
                <span className="text-sm font-medium text-gray-900 tabular-nums">
                  09:05
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">平均下班时间</span>
                <span className="text-sm font-medium text-gray-900 tabular-nums">
                  18:42
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">平均工时</span>
                <span className="text-sm font-medium text-[#1E40AF] tabular-nums">
                  9.5 小时
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">月度工时</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 9 }} />
                <YAxis domain={[0, 12]} tick={{ fontSize: 10 }} />
                <Tooltip />
                <ReferenceLine y={8} stroke="#EF4444" strokeDasharray="3 3" />
                <Bar dataKey="hours" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-500 mt-2 text-center">
              红线为标准 8 小时
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
