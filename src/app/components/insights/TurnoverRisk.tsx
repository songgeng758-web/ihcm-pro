import { useState } from "react";
import { Link } from "react-router";
import { AlertTriangle, TrendingUp, Shield, Users, ChevronDown, Eye } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const kpiData = [
  {
    id: "high",
    title: "高风险员工",
    value: "23",
    trend: "+5",
    color: "bg-red-50 text-red-600",
    icon: AlertTriangle,
  },
  {
    id: "medium",
    title: "中风险员工",
    value: "67",
    trend: "",
    color: "bg-orange-50 text-orange-600",
    icon: AlertTriangle,
  },
  {
    id: "keyTalent",
    title: "关键人才占比",
    value: "68%",
    trend: "",
    color: "bg-green-50 text-green-600",
    icon: Shield,
  },
  {
    id: "turnover",
    title: "预测季度流失率",
    value: "4.2%",
    trend: "",
    color: "bg-blue-50 text-blue-600",
    icon: TrendingUp,
  },
];

const riskDistribution = [
  { name: "高风险", value: 23, color: "#DC2626" },
  { name: "中风险", value: 67, color: "#F59E0B" },
  { name: "低风险", value: 412, color: "#86EFAC" },
  { name: "安全", value: 5345, color: "#10B981" },
];

const departmentRisk = [
  { dept: "信息技术中心", high: 8, medium: 15, low: 45 },
  { dept: "产品研发部", high: 6, medium: 12, low: 38 },
  { dept: "市场营销部", high: 3, medium: 8, low: 24 },
  { dept: "销售部", high: 2, medium: 10, low: 56 },
  { dept: "人力资源部", high: 1, medium: 5, low: 18 },
  { dept: "财务部", high: 1, medium: 4, low: 22 },
  { dept: "客户成功部", high: 1, medium: 6, low: 34 },
  { dept: "行政部", high: 1, medium: 4, low: 15 },
  { dept: "法务部", high: 0, medium: 2, low: 8 },
  { dept: "战略部", high: 0, medium: 1, low: 6 },
];

const highRiskEmployees = [
  {
    id: "EMP001",
    name: "张伟",
    avatar: "https://ui-avatars.com/api/?name=张伟&background=1E40AF&color=fff",
    department: "信息技术中心",
    position: "高级开发工程师",
    riskScore: 87,
    riskLevel: "high",
    factors: ["薪酬偏低", "连续加班", "培训缺失"],
    tenure: "3年2个月",
    lastPerf: "B+",
    suggestion: "调薪 + 项目转岗",
  },
  {
    id: "EMP002",
    name: "李娜",
    avatar: "https://ui-avatars.com/api/?name=李娜&background=EC4899&color=fff",
    department: "市场营销部",
    position: "市场经理",
    riskScore: 78,
    riskLevel: "high",
    factors: ["晋升等待", "内部转岗未果"],
    tenure: "5年1个月",
    lastPerf: "A",
    suggestion: "晋升评估",
  },
  {
    id: "EMP003",
    name: "王强",
    avatar: "https://ui-avatars.com/api/?name=王强&background=10B981&color=fff",
    department: "人力资源部",
    position: "招聘专员",
    riskScore: 65,
    riskLevel: "medium",
    factors: ["绩效连续下降", "请假频次升高"],
    tenure: "1年3个月",
    lastPerf: "C",
    suggestion: "一对一访谈",
  },
  {
    id: "EMP004",
    name: "刘洋",
    avatar: "https://ui-avatars.com/api/?name=刘洋&background=F59E0B&color=fff",
    department: "产品研发部",
    position: "产品经理",
    riskScore: 82,
    riskLevel: "high",
    factors: ["市场对标薪资低", "加班强度高"],
    tenure: "2年8个月",
    lastPerf: "A-",
    suggestion: "调薪 + 减少加班",
  },
  {
    id: "EMP005",
    name: "陈静",
    avatar: "https://ui-avatars.com/api/?name=陈静&background=8B5CF6&color=fff",
    department: "信息技术中心",
    position: "前端工程师",
    riskScore: 76,
    riskLevel: "high",
    factors: ["职业发展受限", "同行业竞争加剧"],
    tenure: "4年5个月",
    lastPerf: "B+",
    suggestion: "技术晋升通道",
  },
  {
    id: "EMP006",
    name: "赵敏",
    avatar: "https://ui-avatars.com/api/?name=赵敏&background=EF4444&color=fff",
    department: "销售部",
    position: "销售总监",
    riskScore: 70,
    riskLevel: "medium",
    factors: ["业绩压力大", "团队流失率高"],
    tenure: "6年2个月",
    lastPerf: "B",
    suggestion: "调整业绩目标",
  },
  {
    id: "EMP007",
    name: "孙华",
    avatar: "https://ui-avatars.com/api/?name=孙华&background=3B82F6&color=fff",
    department: "产品研发部",
    position: "架构师",
    riskScore: 85,
    riskLevel: "high",
    factors: ["薪酬低于市场", "技术栈老化"],
    tenure: "7年3个月",
    lastPerf: "A",
    suggestion: "股权激励 + 技术升级",
  },
  {
    id: "EMP008",
    name: "周杰",
    avatar: "https://ui-avatars.com/api/?name=周杰&background=059669&color=fff",
    department: "客户成功部",
    position: "客户成功经理",
    riskScore: 68,
    riskLevel: "medium",
    factors: ["工作压力大", "客户投诉增多"],
    tenure: "2年1个月",
    lastPerf: "B",
    suggestion: "心理辅导 + 流程优化",
  },
];

export function TurnoverRisk() {
  const [showModel, setShowModel] = useState(true);

  const getRiskBadge = (score: number, level: string) => {
    if (level === "high") {
      return (
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold tabular-nums">
          {score} 分
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded font-semibold tabular-nums">
          {score} 分
        </span>
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
        <Link to="/insights/turnover-risk" className="hover:text-gray-700">
          HR 洞察
        </Link>
        <span>/</span>
        <span className="text-gray-900">人才流失预警</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">人才流失预警</h1>
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
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900 tabular-nums">{item.value}</p>
                {item.trend && (
                  <span className="text-sm text-red-600 font-medium">{item.trend}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Model Explanation */}
      {showModel && (
        <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📊</span>
                <h3 className="font-semibold text-gray-900">流失预警模型说明</h3>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                流失预警模型基于 12 个维度的数据综合评估，包括：薪酬竞争力、近期绩效、晋升间隔、加班时长、请假频次、培训参与度、内部转岗记录等。模型每周自动刷新，预测精度 87.3%。
              </p>
            </div>
            <button
              onClick={() => setShowModel(false)}
              className="p-1 hover:bg-blue-100 rounded transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Risk Distribution */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left - Pie Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">风险等级分布</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-bold text-gray-900">5,847</p>
              <p className="text-sm text-gray-500">总人数</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">
                  {item.name} <span className="font-semibold">{item.value}</span> 人
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Department Heatmap */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">按部门风险热力图</h3>
          <div className="space-y-2">
            {departmentRisk.map((dept) => {
              const total = dept.high + dept.medium + dept.low;
              const highPct = (dept.high / total) * 100;
              const mediumPct = (dept.medium / total) * 100;
              const lowPct = (dept.low / total) * 100;

              return (
                <div key={dept.dept}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{dept.dept}</span>
                    <span className="text-xs text-gray-500">{total} 人</span>
                  </div>
                  <div className="flex h-6 rounded overflow-hidden">
                    {dept.high > 0 && (
                      <div
                        className="bg-red-500 flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: `${highPct}%` }}
                        title={`高风险 ${dept.high} 人`}
                      >
                        {dept.high > 2 && dept.high}
                      </div>
                    )}
                    {dept.medium > 0 && (
                      <div
                        className="bg-orange-400 flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: `${mediumPct}%` }}
                        title={`中风险 ${dept.medium} 人`}
                      >
                        {dept.medium > 3 && dept.medium}
                      </div>
                    )}
                    {dept.low > 0 && (
                      <div
                        className="bg-green-400 flex items-center justify-center text-xs text-white font-medium"
                        style={{ width: `${lowPct}%` }}
                        title={`低风险 ${dept.low} 人`}
                      >
                        {dept.low > 10 && dept.low}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* High Risk Employees Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">高风险员工列表</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">员工</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">部门岗位</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">风险评分</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">主要风险因素</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">入职年限</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">上次绩效</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">建议行动</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {highRiskEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className={`hover:bg-gray-50 ${emp.riskLevel === "high" ? "bg-red-50/30" : ""}`}
                >
                  <td className="px-4 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full" />
                      <span className="font-medium text-gray-900">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    <div>{emp.department}</div>
                    <div className="text-xs text-gray-500">{emp.position}</div>
                  </td>
                  <td className="px-4 py-4">{getRiskBadge(emp.riskScore, emp.riskLevel)}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {emp.factors.map((factor, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {factor}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{emp.tenure}</td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                      {emp.lastPerf}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <span>💡</span>
                      <span>{emp.suggestion}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-[#1E40AF] hover:text-[#1E3A8A] text-sm flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        查看
                      </button>
                      <button className="px-3 py-1 bg-[#1E40AF] text-white rounded text-xs hover:bg-[#1E3A8A]">
                        发起干预
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          已选择 <span className="font-semibold text-gray-900">0</span> 名员工
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            导出预警报告
          </button>
          <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] text-sm font-medium">
            批量发起干预
          </button>
        </div>
      </div>

      {/* AI Insights Sidebar */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🤖</span>
          <h3 className="font-semibold text-lg">AI 洞察</h3>
        </div>
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            本季度高风险员工集中在信息技术中心和产品研发部，主要驱动因素是薪酬竞争力下降（市场对标低 15%）
          </p>
          <p>
            建议优先关注的关键人才：3 位 P7+ 工程师，其中 2 位有同行业 offer 倾向预测
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <a href="#" className="text-blue-300 hover:text-blue-200 text-sm font-medium">
            查看完整 AI 报告 →
          </a>
        </div>
      </div>
    </div>
  );
}
