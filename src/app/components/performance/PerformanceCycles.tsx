import { useState, Fragment } from "react";
import { Link } from "react-router";
import {
  Clock,
  Users,
  CheckCircle,
  TrendingUp,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { PerformanceNav } from "./PerformanceNav";

const kpiData = [
  {
    id: "active",
    title: "进行中周期",
    value: "2",
    icon: Clock,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "pending",
    title: "待评估员工",
    value: "156",
    icon: Users,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    id: "completed",
    title: "已完成评估",
    value: "5,691",
    icon: CheckCircle,
    color: "bg-green-50 text-green-600",
  },
  {
    id: "rate",
    title: "平均完成率",
    value: "87.3%",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600",
    trend: "+5.2%",
  },
];

const cyclesData = [
  {
    id: "cycle-001",
    name: "2026 Q1 季度考核",
    type: "季度",
    period: "2026.01-03",
    scope: "全员",
    progress: 87,
    status: "进行中",
    statusColor: "bg-blue-100 text-blue-700",
    departments: [
      { name: "信息技术中心", rate: 92 },
      { name: "市场营销部", rate: 88 },
      { name: "产品研发部", rate: 85 },
      { name: "人力资源部", rate: 90 },
      { name: "财务管理部", rate: 83 },
    ],
  },
  {
    id: "cycle-002",
    name: "2025 年度考核",
    type: "年度",
    period: "2025.01-12",
    scope: "全员",
    progress: 100,
    status: "已完成",
    statusColor: "bg-green-100 text-green-700",
    departments: [
      { name: "信息技术中心", rate: 95 },
      { name: "市场营销部", rate: 98 },
      { name: "产品研发部", rate: 100 },
      { name: "人力资源部", rate: 100 },
      { name: "财务管理部", rate: 97 },
    ],
  },
  {
    id: "cycle-003",
    name: "2026 H1 半年考核",
    type: "半年",
    period: "2026.01-06",
    scope: "管理层",
    progress: 23,
    status: "进行中",
    statusColor: "bg-blue-100 text-blue-700",
    departments: [
      { name: "高层管理", rate: 30 },
      { name: "中层管理", rate: 25 },
      { name: "基层管理", rate: 18 },
    ],
  },
  {
    id: "cycle-004",
    name: "2025 Q4 季度考核",
    type: "季度",
    period: "2025.10-12",
    scope: "全员",
    progress: 100,
    status: "已完成",
    statusColor: "bg-green-100 text-green-700",
    departments: [
      { name: "信息技术中心", rate: 100 },
      { name: "市场营销部", rate: 100 },
      { name: "产品研发部", rate: 100 },
    ],
  },
  {
    id: "cycle-005",
    name: "2026 年度考核",
    type: "年度",
    period: "2026.01-12",
    scope: "全员",
    progress: 15,
    status: "草稿",
    statusColor: "bg-gray-100 text-gray-700",
    departments: [],
  },
  {
    id: "cycle-006",
    name: "2025 Q3 季度考核",
    type: "季度",
    period: "2025.07-09",
    scope: "全员",
    progress: 100,
    status: "已完成",
    statusColor: "bg-green-100 text-green-700",
    departments: [
      { name: "信息技术中心", rate: 100 },
      { name: "市场营销部", rate: 100 },
    ],
  },
];

export function PerformanceCycles() {
  const [year, setYear] = useState("2026");
  const [cycleType, setCycleType] = useState("all");
  const [expandedCycle, setExpandedCycle] = useState<string | null>(null);

  const filteredCycles = cyclesData.filter((c) => {
    const matchesYear = c.period.includes(year);
    const matchesType =
      cycleType === "all" || c.type === cycleType;
    return matchesYear && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/performance/cycles" className="hover:text-gray-700">
          绩效管理
        </Link>
        <span>/</span>
        <span className="text-gray-900">绩效周期管理</span>
      </div>

      {/* Navigation Tabs */}
      <PerformanceNav />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">绩效周期管理</h1>
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
              {item.trend && (
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {item.trend}
                </span>
              )}
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
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="2026">2026 年</option>
              <option value="2025">2025 年</option>
              <option value="2024">2024 年</option>
            </select>

            <select
              value={cycleType}
              onChange={(e) => setCycleType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="all">全部类型</option>
              <option value="年度">年度</option>
              <option value="半年">半年</option>
              <option value="季度">季度</option>
              <option value="月度">月度</option>
            </select>
          </div>

          <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2 text-sm font-medium">
            <Plus className="w-4 h-4" />
            发起新周期
          </button>
        </div>
      </div>

      {/* Cycles Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8"></th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                周期名称
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                类型
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                时间范围
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                适用范围
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                进度
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCycles.map((cycle) => (
              <Fragment key={cycle.id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setExpandedCycle(
                      expandedCycle === cycle.id ? null : cycle.id
                    )
                  }
                >
                  <td className="px-4 py-4">
                    {cycle.departments.length > 0 && (
                      <ChevronRight
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          expandedCycle === cycle.id ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {cycle.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {cycle.type}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {cycle.period}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {cycle.scope}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                        <div
                          className="bg-[#1E40AF] h-2 rounded-full"
                          style={{ width: `${cycle.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 tabular-nums w-12">
                        {cycle.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${cycle.statusColor}`}
                    >
                      {cycle.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="text-[#1E40AF] hover:text-[#1E3A8A]"
                    >
                      查看详情
                    </button>
                  </td>
                </tr>
                {expandedCycle === cycle.id && cycle.departments.length > 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-4 bg-gray-50">
                      <div className="ml-8">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          部门完成率排行
                        </h4>
                        <div className="space-y-2">
                          {cycle.departments.map((dept, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3"
                            >
                              <span className="text-sm text-gray-600 w-32">
                                {dept.name}
                              </span>
                              <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-md">
                                <div
                                  className="bg-[#1E40AF] h-2 rounded-full"
                                  style={{ width: `${dept.rate}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 tabular-nums w-12">
                                {dept.rate}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
