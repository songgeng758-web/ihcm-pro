import { useState } from "react";
import { Link } from "react-router";
import {
  DollarSign,
  TrendingUp,
  Download,
  ChevronDown,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PayrollNav } from "./PayrollNav";

const monthlyTrend = [
  { month: "2025-06", income: 35000 },
  { month: "2025-07", income: 36500 },
  { month: "2025-08", income: 37000 },
  { month: "2025-09", income: 36800 },
  { month: "2025-10", income: 38200 },
  { month: "2025-11", income: 37500 },
  { month: "2025-12", income: 42000 },
  { month: "2026-01", income: 38000 },
  { month: "2026-02", income: 37800 },
  { month: "2026-03", income: 38500 },
  { month: "2026-04", income: 37200 },
  { month: "2026-05", income: 38500 },
];

const taxData = [
  { month: "1月", amount: 1680 },
  { month: "2月", amount: 1620 },
  { month: "3月", amount: 1860 },
  { month: "4月", amount: 1560 },
  { month: "5月", amount: 2860 },
];

const incomeItems = [
  { name: "基本工资", amount: 18000 },
  { name: "岗位工资", amount: 6000 },
  { name: "绩效工资", amount: 9500, note: "绩效系数 1.05" },
  { name: "全勤奖", amount: 500 },
  { name: "项目奖金", amount: 4500 },
];

const deductionItems = [
  { name: "养老保险", amount: 1540 },
  { name: "医疗保险", amount: 385 },
  { name: "失业保险", amount: 77 },
  { name: "住房公积金", amount: 1540 },
  { name: "个人所得税", amount: 2860 },
  { name: "其他扣除", amount: 851 },
];

const historyPayslips = [
  { month: "2026-05", status: "已发放" },
  { month: "2026-04", status: "已发放" },
  { month: "2026-03", status: "已发放" },
  { month: "2026-02", status: "已发放" },
  { month: "2026-01", status: "已发放" },
  { month: "2025-12", status: "已发放" },
];

const formatCurrency = (amount: number) => {
  return `¥${amount.toLocaleString("zh-CN")}`;
};

export function MyPayroll() {
  const [showDetails, setShowDetails] = useState(false);

  const totalIncome = incomeItems.reduce((sum, item) => sum + item.amount, 0);
  const totalDeduction = deductionItems.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const netPay = totalIncome - totalDeduction;

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/payroll/my" className="hover:text-gray-700">
          薪酬管理
        </Link>
        <span>/</span>
        <span className="text-gray-900">我的薪酬</span>
      </div>

      {/* Navigation Tabs */}
      <PayrollNav />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">我的薪酬</h1>
      </div>

      {/* Annual Overview */}
      <div className="bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-blue-100 mb-2">2026 年累计税前收入</p>
            <h2 className="text-4xl font-bold mb-3 tabular-nums">
              ¥187,500
            </h2>
            <div className="flex items-center gap-6 text-sm text-blue-100">
              <span>已发 5 个月</span>
              <span>·</span>
              <span>平均月薪 ¥37,500</span>
              <span>·</span>
              <span>年终奖估算 ¥45,000</span>
            </div>
          </div>
          <div className="w-64 h-20">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend.slice(-12)}>
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#ffffff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">本月应发</p>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">
              ¥38,500
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-lg bg-green-50 text-green-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">本月实发</p>
            <p className="text-2xl font-bold text-[#10B981] tabular-nums">
              ¥31,247
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-lg bg-orange-50 text-orange-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">累计个税</p>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">
              ¥9,360
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">年度公积金</p>
            <p className="text-2xl font-bold text-gray-900 tabular-nums">
              ¥18,750
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left - Current Payslip */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              2026 年 5 月 · 工资条
            </h3>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#1E40AF] hover:bg-blue-50 rounded transition-colors">
              <Download className="w-4 h-4" />
              下载 PDF
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Income Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700">收入项目</h4>
                <div className="h-px flex-1 bg-green-200 ml-3" />
              </div>
              <div className="space-y-2">
                {incomeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                      {item.note && (
                        <span className="ml-2 text-xs text-gray-400">
                          ({item.note})
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-green-600 tabular-nums">
                      +{formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t-2 border-green-200">
                  <span className="font-semibold text-gray-900">收入合计</span>
                  <span className="text-lg font-bold text-green-600 tabular-nums">
                    {formatCurrency(totalIncome)}
                  </span>
                </div>
              </div>
            </div>

            {/* Deduction Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700">扣除项目</h4>
                <div className="h-px flex-1 bg-orange-200 ml-3" />
              </div>
              <div className="space-y-2">
                {deductionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className="text-sm font-medium text-orange-600 tabular-nums">
                      -{formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-3 border-t-2 border-orange-200">
                  <span className="font-semibold text-gray-900">扣除合计</span>
                  <span className="text-lg font-bold text-orange-600 tabular-nums">
                    {formatCurrency(totalDeduction)}
                  </span>
                </div>
              </div>
            </div>

            {/* Net Pay */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-[#1E40AF]">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">
                  实发工资
                </span>
                <span className="text-3xl font-bold text-[#1E40AF] tabular-nums">
                  {formatCurrency(netPay)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - History & Stats */}
        <div className="space-y-4">
          {/* Tax Chart */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              个税年度累计
            </h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={taxData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="amount" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Income Trend */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              月度收入趋势
            </h4>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(val) => val.slice(5)}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#1E40AF"
                  strokeWidth={2}
                  dot={{ fill: "#1E40AF", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Social Security Details */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <span>公积金 / 社保缴存明细</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showDetails ? "rotate-180" : ""
                }`}
              />
            </button>
            {showDetails && (
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">养老保险（个人8%）</span>
                  <span className="text-gray-900 tabular-nums">¥1,540</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">医疗保险（个人2%）</span>
                  <span className="text-gray-900 tabular-nums">¥385</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">失业保险（个人0.4%）</span>
                  <span className="text-gray-900 tabular-nums">¥77</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">住房公积金（个人8%）</span>
                  <span className="text-gray-900 tabular-nums">¥1,540</span>
                </div>
              </div>
            )}
          </div>

          {/* Payslip History */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-700">
                工资条历史查询
              </h4>
            </div>
            <div className="space-y-2">
              {historyPayslips.map((slip, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{slip.month}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600">
                      {slip.status}
                    </span>
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <Download className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
