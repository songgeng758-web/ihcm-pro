import { useState } from "react";
import { Link } from "react-router";
import {
  FileText,
  Star,
  Eye,
  Download,
  Share2,
  Bell,
  Plus,
  Search,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const kpiData = [
  { id: "total", title: "报表总数", value: "87", color: "bg-blue-50 text-blue-600" },
  { id: "subscribed", title: "我的订阅", value: "12", color: "bg-purple-50 text-purple-600" },
  { id: "favorite", title: "我的收藏", value: "8", color: "bg-orange-50 text-orange-600" },
  { id: "views", title: "本月查阅", value: "234", suffix: "次", color: "bg-green-50 text-green-600" },
];

const categories = [
  { id: "favorites", label: "⭐ 我的收藏", count: 8, expanded: true },
  { id: "subscribed", label: "📌 已订阅", count: 12, expanded: true },
  {
    id: "hr",
    label: "📊 人事报表",
    count: 15,
    expanded: true,
    children: ["在职员工花名册", "入离职统计表", "组织架构图"],
  },
  {
    id: "recruit",
    label: "🎯 招聘报表",
    count: 12,
    expanded: false,
    children: ["招聘漏斗分析", "渠道效果对比", "招聘成本统计"],
  },
  { id: "performance", label: "⭐ 绩效报表", count: 8, expanded: false },
  { id: "payroll", label: "💰 薪酬报表", count: 10, expanded: false },
  { id: "attendance", label: "📅 考勤报表", count: 14, expanded: false },
  { id: "training", label: "🏆 培训报表", count: 6, expanded: false },
  { id: "custom", label: "⚙️ 自定义报表", count: 22, expanded: false },
];

const reports = [
  {
    id: "RPT001",
    name: "在职员工花名册",
    category: "人事",
    period: "实时",
    views: 156,
    favorite: false,
    chartType: "bar",
    chartData: [
      { name: "研发", value: 234 },
      { name: "市场", value: 89 },
      { name: "销售", value: 156 },
    ],
  },
  {
    id: "RPT002",
    name: "招聘漏斗分析",
    category: "招聘",
    period: "每日",
    views: 89,
    favorite: true,
    chartType: "line",
    chartData: [
      { name: "1", value: 120 },
      { name: "2", value: 80 },
      { name: "3", value: 45 },
      { name: "4", value: 23 },
    ],
  },
  {
    id: "RPT003",
    name: "部门人员流动趋势",
    category: "人事",
    period: "月度",
    views: 67,
    favorite: false,
    chartType: "line",
    chartData: [
      { name: "1", value: 10 },
      { name: "2", value: 15 },
      { name: "3", value: 12 },
      { name: "4", value: 18 },
    ],
  },
  {
    id: "RPT004",
    name: "薪酬带宽分析",
    category: "薪酬",
    period: "季度",
    views: 45,
    favorite: true,
    chartType: "bar",
    chartData: [
      { name: "P1", value: 8 },
      { name: "P3", value: 15 },
      { name: "P5", value: 22 },
      { name: "P7", value: 18 },
    ],
  },
  {
    id: "RPT005",
    name: "绩效结果分布",
    category: "绩效",
    period: "季度",
    views: 78,
    favorite: false,
    chartType: "pie",
    chartData: [
      { name: "S", value: 5 },
      { name: "A", value: 20 },
      { name: "B", value: 45 },
      { name: "C", value: 25 },
      { name: "D", value: 5 },
    ],
  },
  {
    id: "RPT006",
    name: "考勤异常统计",
    category: "考勤",
    period: "每周",
    views: 134,
    favorite: false,
    chartType: "bar",
    chartData: [
      { name: "迟到", value: 23 },
      { name: "早退", value: 8 },
      { name: "缺卡", value: 12 },
    ],
  },
  {
    id: "RPT007",
    name: "培训完成率",
    category: "培训",
    period: "月度",
    views: 23,
    favorite: false,
    chartType: "line",
    chartData: [
      { name: "1", value: 60 },
      { name: "2", value: 75 },
      { name: "3", value: 85 },
      { name: "4", value: 78 },
    ],
  },
  {
    id: "RPT008",
    name: "人才九宫格分布",
    category: "绩效",
    period: "年度",
    views: 56,
    favorite: true,
    chartType: "pie",
    chartData: [
      { name: "明星", value: 15 },
      { name: "核心", value: 35 },
      { name: "潜力", value: 25 },
      { name: "骨干", value: 20 },
      { name: "观察", value: 5 },
    ],
  },
  {
    id: "RPT009",
    name: "部门编制使用率",
    category: "人事",
    period: "月度",
    views: 42,
    favorite: false,
    chartType: "bar",
    chartData: [
      { name: "研发", value: 95 },
      { name: "市场", value: 78 },
      { name: "销售", value: 88 },
    ],
  },
];

const pieColors = ["#1E40AF", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"];

export function ReportCenter() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState(["hr", "recruit"]);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const renderMiniChart = (report: typeof reports[0]) => {
    if (report.chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={report.chartData}>
            <Bar dataKey="value" fill="#1E40AF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (report.chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={report.chartData}>
            <Line type="monotone" dataKey="value" stroke="#1E40AF" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (report.chartType === "pie") {
      return (
        <ResponsiveContainer width="100%" height={80}>
          <PieChart>
            <Pie data={report.chartData} dataKey="value" cx="50%" cy="50%" outerRadius={30} fill="#1E40AF">
              {report.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/reports/center" className="hover:text-gray-700">
          HR 洞察
        </Link>
        <span>/</span>
        <span className="text-gray-900">报表中心</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">报表中心</h1>
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
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{item.title}</p>
              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                {item.value}
                {item.suffix && <span className="text-sm text-gray-500 ml-1">{item.suffix}</span>}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索报表..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
            </div>

            <div className="flex items-center gap-2">
              {["all", "hr", "recruit", "performance", "payroll", "attendance"].map((filter) => {
                const labels: Record<string, string> = {
                  all: "全部",
                  hr: "人事",
                  recruit: "招聘",
                  performance: "绩效",
                  payroll: "薪酬",
                  attendance: "考勤",
                };
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? "bg-[#1E40AF] text-white"
                        : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    {labels[filter]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
              批量订阅
            </button>
            <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2 text-sm font-medium">
              <Plus className="w-4 h-4" />
              自定义报表
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-4 gap-6">
        {/* Left Sidebar - Category Tree */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => category.children && toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
              >
                <span className="text-gray-700">
                  {category.label}
                  <span className="ml-2 text-gray-400">({category.count})</span>
                </span>
                {category.children && (
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedCategories.includes(category.id) ? "rotate-90" : ""
                    }`}
                  />
                )}
              </button>
              {category.children && expandedCategories.includes(category.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {category.children.map((child, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      {child}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Content - Report Cards Grid */}
        <div className="col-span-3 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">{report.name}</h3>
                  <button className="p-1 hover:bg-gray-50 rounded">
                    <Star
                      className={`w-4 h-4 ${
                        report.favorite ? "fill-orange-400 text-orange-400" : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Chart Preview */}
                <div className="mb-3 bg-gray-50 rounded-lg p-2">{renderMiniChart(report)}</div>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">{report.category}</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{report.period}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>最后更新：今天 09:30</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{report.views} 次</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="flex-1 px-3 py-1.5 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] text-xs font-medium">
                    查看
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Bell className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                  <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 className="w-3.5 h-3.5 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}

            {/* Custom Report Wizard Card */}
            <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-300 hover:border-[#1E40AF] transition-colors cursor-pointer flex flex-col items-center justify-center text-center min-h-[280px]">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                <Plus className="w-6 h-6 text-[#1E40AF]" />
              </div>
              <p className="text-sm font-medium text-gray-900 mb-2">还没找到合适的报表？</p>
              <p className="text-xs text-gray-500">用拖拽方式 3 分钟创建自定义报表</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
