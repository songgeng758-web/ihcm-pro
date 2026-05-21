import { useState } from "react";
import { Link } from "react-router";
import { Users, Edit } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PayrollNav } from "./PayrollNav";

const structureData = [
  { name: "基本工资", value: 50, color: "#1E40AF" },
  { name: "绩效工资", value: 25, color: "#60A5FA" },
  { name: "岗位津贴", value: 10, color: "#F59E0B" },
  { name: "各类补贴", value: 8, color: "#10B981" },
  { name: "五险一金", value: 7, color: "#6B7280" },
];

const componentsList = [
  {
    id: "base",
    name: "基本工资",
    formula: "固定金额",
    percentage: "50%",
    taxable: true,
  },
  {
    id: "performance",
    name: "绩效工资",
    formula: "基本工资 × 绩效系数",
    percentage: "25%",
    taxable: true,
  },
  {
    id: "position",
    name: "岗位津贴",
    formula: "根据岗位等级",
    percentage: "10%",
    taxable: true,
  },
  {
    id: "allowance",
    name: "交通补贴",
    formula: "固定 ¥500/月",
    percentage: "3%",
    taxable: false,
  },
  {
    id: "meal",
    name: "餐补",
    formula: "固定 ¥600/月",
    percentage: "3%",
    taxable: false,
  },
  {
    id: "comm",
    name: "通讯补贴",
    formula: "固定 ¥200/月",
    percentage: "2%",
    taxable: false,
  },
  {
    id: "insurance",
    name: "五险一金",
    formula: "法定比例扣除",
    percentage: "7%",
    taxable: false,
  },
];

const salaryBands = [
  {
    level: "P9",
    p10: 35000,
    p25: 40000,
    p50: 48000,
    p75: 56000,
    p90: 65000,
    count: 23,
  },
  {
    level: "P8",
    p10: 28000,
    p25: 32000,
    p50: 38000,
    p75: 45000,
    p90: 52000,
    count: 45,
  },
  {
    level: "P7",
    p10: 22000,
    p25: 26000,
    p50: 30000,
    p75: 35000,
    p90: 40000,
    count: 89,
  },
  {
    level: "P6",
    p10: 18000,
    p25: 21000,
    p50: 25000,
    p75: 29000,
    p90: 33000,
    count: 156,
  },
  {
    level: "P5",
    p10: 14000,
    p25: 16000,
    p50: 18000,
    p75: 21000,
    p90: 24000,
    count: 312,
  },
  {
    level: "P4",
    p10: 10000,
    p25: 12000,
    p50: 14000,
    p75: 16000,
    p90: 18000,
    count: 456,
  },
  {
    level: "P3",
    p10: 7000,
    p25: 8500,
    p50: 10000,
    p75: 12000,
    p90: 14000,
    count: 589,
  },
  {
    level: "P2",
    p10: 5000,
    p25: 6000,
    p50: 7500,
    p75: 9000,
    p90: 10500,
    count: 412,
  },
  {
    level: "P1",
    p10: 3500,
    p25: 4500,
    p50: 5500,
    p75: 6500,
    p90: 7500,
    count: 259,
  },
];

const getColorByPercentile = (percentile: string) => {
  const colors: Record<string, string> = {
    p10: "bg-blue-50 text-blue-700",
    p25: "bg-blue-100 text-blue-800",
    p50: "bg-blue-200 text-blue-900",
    p75: "bg-blue-300 text-blue-900",
    p90: "bg-blue-400 text-blue-950",
  };
  return colors[percentile] || "bg-gray-100 text-gray-700";
};

export function PayrollStructure() {
  const [activeTab, setActiveTab] = useState("system");

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/payroll/structure" className="hover:text-gray-700">
          薪酬管理
        </Link>
        <span>/</span>
        <span className="text-gray-900">薪酬结构管理</span>
      </div>

      {/* Navigation Tabs */}
      <PayrollNav />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">薪酬结构管理</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex gap-1 p-2">
            {[
              { id: "system", label: "薪酬体系" },
              { id: "level", label: "岗位职级" },
              { id: "bands", label: "薪资带宽" },
              { id: "benefits", label: "津贴福利" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#1E40AF] text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "system" && (
            <div className="space-y-6">
              {/* System Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border border-blue-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">管理序列</h3>
                    <span className="px-2 py-1 bg-white rounded text-xs font-medium text-blue-700">
                      M1-M7
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>适用 156 人</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-5 border border-purple-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">专业序列</h3>
                    <span className="px-2 py-1 bg-white rounded text-xs font-medium text-purple-700">
                      P1-P9
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>适用 2,341 人</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-5 border border-green-200">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">操作序列</h3>
                    <span className="px-2 py-1 bg-white rounded text-xs font-medium text-green-700">
                      O1-O5
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>适用 3,350 人</span>
                  </div>
                </div>
              </div>

              {/* Salary Composition */}
              <div className="grid grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="bg-white rounded-lg p-5 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    标准薪酬包构成
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={structureData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={(entry) => `${entry.name} ${entry.value}%`}
                        labelLine={true}
                      >
                        {structureData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Components List */}
                <div className="bg-white rounded-lg p-5 border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    薪酬项目明细
                  </h3>
                  <div className="space-y-2">
                    {componentsList.map((comp) => (
                      <div
                        key={comp.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {comp.name}
                          </p>
                          <p className="text-xs text-gray-500">{comp.formula}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 tabular-nums">
                            {comp.percentage}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              comp.taxable
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {comp.taxable ? "计税" : "免税"}
                          </span>
                          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                            <Edit className="w-3 h-3 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Salary Bands Matrix */}
              <div className="bg-white rounded-lg p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    薪资带宽矩阵（专业序列 P1-P9）
                  </h3>
                  <span className="text-xs text-gray-500">
                    单位：元/月 | 数据更新：2026-05
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          职级
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          10分位
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          25分位
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          50分位
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          75分位
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          90分位
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          人数
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {salaryBands.map((band) => (
                        <tr key={band.level} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {band.level}
                          </td>
                          {(["p10", "p25", "p50", "p75", "p90"] as const).map(
                            (percentile) => (
                              <td key={percentile} className="px-4 py-3">
                                <div className="relative group">
                                  <div
                                    className={`text-center px-3 py-2 rounded ${getColorByPercentile(
                                      percentile
                                    )} font-medium text-sm tabular-nums`}
                                  >
                                    ¥{band[percentile].toLocaleString("zh-CN")}
                                  </div>
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-40 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                                    <p>在岗人数：{band.count}人</p>
                                    <p>市场对标：行业中位</p>
                                  </div>
                                </div>
                              </td>
                            )
                          )}
                          <td className="px-4 py-3 text-center text-sm text-gray-600 tabular-nums">
                            {band.count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "system" && (
            <div className="text-center py-12 text-gray-500">
              <p>该功能正在开发中...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
