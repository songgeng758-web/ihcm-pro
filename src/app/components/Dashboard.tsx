import {
  Users,
  UserPlus,
  UserMinus,
  FileText,
  AlertTriangle,
  TrendingDown,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  GenderPieChart,
  AgeBarChart,
  DepartmentBarChart,
  TrendLineChart,
} from "./Charts";

const kpiData = [
  {
    id: "employees",
    title: "在职员工",
    value: "5,847",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    trend: "+2.3%",
  },
  {
    id: "hires",
    title: "本月入职",
    value: "32",
    icon: UserPlus,
    color: "bg-green-50 text-green-600",
    trend: "+8人",
  },
  {
    id: "leaves",
    title: "本月离职",
    value: "18",
    icon: UserMinus,
    color: "bg-orange-50 text-orange-600",
    trend: "-3人",
  },
  {
    id: "approvals",
    title: "待审批",
    value: "24",
    icon: FileText,
    color: "bg-purple-50 text-purple-600",
    trend: "5项紧急",
  },
  {
    id: "anomalies",
    title: "数据异常",
    value: "24",
    icon: AlertTriangle,
    color: "bg-red-50 text-red-600",
    trend: "需处理",
  },
  {
    id: "turnover",
    title: "流失率",
    value: "3.2%",
    icon: TrendingDown,
    color: "bg-amber-50 text-amber-600",
    trend: "环比-0.5%",
  },
];

const genderData = [
  { id: "male", name: "男", value: 3156, color: "#1E40AF" },
  { id: "female", name: "女", value: 2691, color: "#F59E0B" },
];

const ageData = [
  { id: "age-18-25", age: "18-25", count: 892 },
  { id: "age-26-30", age: "26-30", count: 1654 },
  { id: "age-31-35", age: "31-35", count: 1823 },
  { id: "age-36-40", age: "36-40", count: 987 },
  { id: "age-41-50", age: "41-50", count: 398 },
  { id: "age-50+", age: "50+", count: 93 },
];

const todoList = [
  {
    id: 1,
    title: "张伟 - 转正申请",
    type: "转正审批",
    urgent: true,
    time: "2小时前",
  },
  {
    id: 2,
    title: "李娜 - 调薪申请",
    type: "薪酬调整",
    urgent: true,
    time: "4小时前",
  },
  {
    id: 3,
    title: "王强 - 请假申请（7天）",
    type: "假期审批",
    urgent: false,
    time: "1天前",
  },
  {
    id: 4,
    title: "刘洋 - 离职申请",
    type: "离职流程",
    urgent: false,
    time: "1天前",
  },
  {
    id: 5,
    title: "陈静 - 异地办公申请",
    type: "工作变更",
    urgent: false,
    time: "2天前",
  },
];

const departmentData = [
  { id: "dept-it", dept: "信息技术中心", count: 876 },
  { id: "dept-marketing", dept: "市场营销部", count: 654 },
  { id: "dept-hr", dept: "人力资源部", count: 543 },
  { id: "dept-finance", dept: "财务管理部", count: 487 },
  { id: "dept-operations", dept: "运营管理部", count: 432 },
  { id: "dept-product", dept: "产品研发部", count: 398 },
  { id: "dept-service", dept: "客户服务部", count: 365 },
  { id: "dept-supply", dept: "供应链部", count: 321 },
  { id: "dept-legal", dept: "法务合规部", count: 287 },
  { id: "dept-admin", dept: "行政管理部", count: 234 },
];

const recruitmentFunnel = [
  { id: "funnel-submit", stage: "简历投递", count: 3245, color: "#1E40AF" },
  { id: "funnel-screen", stage: "简历筛选", count: 1876, color: "#2563EB" },
  { id: "funnel-interview", stage: "面试邀约", count: 876, color: "#3B82F6" },
  { id: "funnel-offer", stage: "Offer发放", count: 234, color: "#60A5FA" },
  { id: "funnel-onboard", stage: "成功入职", count: 156, color: "#93C5FD" },
];

const trendData = [
  { id: "trend-dec", month: "12月", hire: 45, leave: 23 },
  { id: "trend-jan", month: "1月", hire: 38, leave: 19 },
  { id: "trend-feb", month: "2月", hire: 52, leave: 15 },
  { id: "trend-mar", month: "3月", hire: 48, leave: 21 },
  { id: "trend-apr", month: "4月", hire: 41, leave: 17 },
  { id: "trend-may", month: "5月", hire: 32, leave: 18 },
];

export function Dashboard() {
  const currentDate = new Date().toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HR 总览</h1>
          <p className="text-sm text-gray-500 mt-1">
            {currentDate} · 欢迎回来，管理员
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4">
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
              <p className="text-xs text-gray-400 mt-1">{item.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Personnel Structure */}
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">人员结构</h3>
          <div className="grid grid-cols-2 gap-6">
            {/* Gender Pie Chart */}
            <div>
              <p className="text-sm text-gray-500 mb-3 text-center">性别分布</p>
              <GenderPieChart data={genderData} />
              <div className="flex justify-center gap-6 mt-3">
                {genderData.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Age Bar Chart */}
            <div>
              <p className="text-sm text-gray-500 mb-3 text-center">年龄分布</p>
              <AgeBarChart data={ageData} />
            </div>
          </div>
        </div>

        {/* To-do List */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">我的待办</h3>
          <div className="space-y-3">
            {todoList.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 flex-1">
                    {item.title}
                  </p>
                  {item.urgent && (
                    <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded">
                      紧急
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{item.type}</span>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">
          Top 10 部门人数分布
        </h3>
        <DepartmentBarChart data={departmentData} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recruitment Funnel */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">招聘漏斗</h3>
          <div className="space-y-3">
            {recruitmentFunnel.map((item) => {
              const percentage =
                (item.count / recruitmentFunnel[0].count) * 100;
              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700">{item.stage}</span>
                    <span className="text-sm font-semibold text-gray-900 tabular-nums">
                      {item.count}
                    </span>
                  </div>
                  <div className="relative h-8 bg-gray-100 rounded overflow-hidden">
                    <div
                      className="absolute h-full flex items-center justify-end pr-3 text-white text-xs font-medium transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color,
                      }}
                    >
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">
            近 6 个月人员流动趋势
          </h3>
          <TrendLineChart data={trendData} />
        </div>
      </div>
    </div>
  );
}
