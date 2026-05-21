import { Link } from "react-router";
import { TrendingUp, TrendingDown, Download, Share2 } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
  ReferenceLine,
} from "recharts";

const healthScore = {
  total: 78,
  rating: "良好（B+）",
  change: "+3.2",
  industry: 72.9,
  delta: "+5.1",
};

const radarData = [
  { dimension: "人才结构", score: 82, fullMark: 100 },
  { dimension: "组织活力", score: 75, fullMark: 100 },
  { dimension: "业绩达成", score: 88, fullMark: 100 },
  { dimension: "员工敬业度", score: 71, fullMark: 100 },
  { dimension: "文化认同", score: 79, fullMark: 100 },
  { dimension: "创新能力", score: 73, fullMark: 100 },
];

const dimensions = [
  {
    id: "talent",
    name: "人才结构",
    score: 82,
    change: "+2.3",
    trend: "up",
    vs: "+5.2",
    color: "bg-blue-50",
  },
  {
    id: "vitality",
    name: "组织活力",
    score: 75,
    change: "+1.8",
    trend: "up",
    vs: "+2.1",
    color: "bg-purple-50",
  },
  {
    id: "performance",
    name: "业绩达成",
    score: 88,
    change: "+4.5",
    trend: "up",
    vs: "+8.3",
    color: "bg-green-50",
  },
  {
    id: "engagement",
    name: "员工敬业度",
    score: 71,
    change: "-1.5",
    trend: "down",
    vs: "-7.0",
    color: "bg-orange-50",
  },
  {
    id: "culture",
    name: "文化认同",
    score: 79,
    change: "+3.1",
    trend: "up",
    vs: "+4.5",
    color: "bg-pink-50",
  },
  {
    id: "innovation",
    name: "创新能力",
    score: 73,
    change: "+0.8",
    trend: "up",
    vs: "+1.2",
    color: "bg-teal-50",
  },
];

const departmentScores = [
  { dept: "产品研发部", score: 85, rank: 1 },
  { dept: "信息技术中心", score: 82, rank: 2 },
  { dept: "市场营销部", score: 78, rank: 3 },
  { dept: "客户成功部", score: 76, rank: 4 },
  { dept: "销售部", score: 75, rank: 5 },
  { dept: "人力资源部", score: 74, rank: 6 },
  { dept: "财务部", score: 72, rank: 7 },
  { dept: "法务部", score: 70, rank: 8 },
  { dept: "战略部", score: 68, rank: 9 },
  { dept: "行政部", score: 65, rank: 10 },
];

const trendData = [
  { quarter: "Q1 2025", total: 72, talent: 78, vitality: 70, engagement: 68 },
  { quarter: "Q2 2025", total: 73, talent: 79, vitality: 71, engagement: 69 },
  { quarter: "Q3 2025", total: 74, talent: 80, vitality: 72, engagement: 70 },
  { quarter: "Q4 2025", total: 74.5, talent: 80, vitality: 73, engagement: 70 },
  { quarter: "Q1 2026", total: 75, talent: 81, vitality: 73, engagement: 71 },
  { quarter: "Q2 2026", total: 78, talent: 82, vitality: 75, engagement: 71 },
];

const matrixItems = [
  { quadrant: "urgent", label: "人才结构老化", desc: "35岁以下占比下降3.5%" },
  { quadrant: "strength", label: "业绩达成强", desc: "连续3季度超行业均值" },
  { quadrant: "observe", label: "创新能力波动", desc: "季度间波动±2分" },
  { quadrant: "opportunity", label: "文化认同稳步提升", desc: "连续3季度上升" },
];

export function OrgHealth() {
  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/insights/org-health" className="hover:text-gray-700">
          HR 洞察
        </Link>
        <span>/</span>
        <span className="text-gray-900">组织健康度分析</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">组织健康度分析</h1>
      </div>

      {/* Overall Health Score Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white shadow-lg">
        <div className="grid grid-cols-3 gap-8">
          {/* Left - Score Ring */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg className="w-48 h-48" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="16"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="white"
                  strokeWidth="16"
                  strokeDasharray={`${(healthScore.total / 100) * 502.4} 502.4`}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold">{healthScore.total}</div>
                <div className="text-lg opacity-90">/100</div>
              </div>
            </div>
          </div>

          {/* Middle - Rating */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <div className="text-sm opacity-90 mb-1">综合评级</div>
              <div className="text-3xl font-bold">{healthScore.rating}</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">季度对比</div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-2xl font-bold">{healthScore.change}</span>
              </div>
            </div>
          </div>

          {/* Right - Industry Benchmark */}
          <div className="flex flex-col justify-center">
            <div className="text-sm opacity-90 mb-2">行业对标</div>
            <div className="text-lg mb-2">
              高于行业平均 <span className="text-2xl font-bold">{healthScore.delta}</span> 分
            </div>
            <div className="text-sm opacity-80">（行业均值 {healthScore.industry}）</div>
          </div>
        </div>
      </div>

      {/* Radar Chart & Dimensions */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left - Radar Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">六大健康度维度</h3>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
              <Radar
                dataKey="score"
                stroke="#1E40AF"
                fill="#1E40AF"
                fillOpacity={0.5}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Right - Dimension Details */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          {dimensions.map((dim) => (
            <div
              key={dim.id}
              className={`${dim.color} rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{dim.name}</h4>
                <div className="text-2xl font-bold text-gray-900">{dim.score}</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">与上季对比</span>
                  <div className="flex items-center gap-1">
                    {dim.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span
                      className={`font-semibold ${
                        dim.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {dim.change}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">与行业对标</span>
                  <span
                    className={`font-semibold ${
                      parseFloat(dim.vs) > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {dim.vs}
                  </span>
                </div>
                <div className="pt-2">
                  <a href="#" className="text-[#1E40AF] hover:text-[#1E3A8A] text-xs font-medium">
                    查看详情 →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Comparison */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">部门健康度对比</h3>
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={departmentScores} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="dept" type="category" width={120} tick={{ fontSize: 12 }} />
            <Tooltip />
            <ReferenceLine x={72.9} stroke="#EF4444" strokeDasharray="3 3" label="行业均值" />
            <Bar dataKey="score" fill="#1E40AF" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            产品研发部排名第一
          </span>
        </div>
      </div>

      {/* Trends & Matrix */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left - Trend Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">近 6 个季度组织健康度趋势</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 90]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#1E40AF"
                strokeWidth={3}
                name="总分"
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="talent"
                stroke="#10B981"
                strokeWidth={2}
                name="人才结构"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="vitality"
                stroke="#F59E0B"
                strokeWidth={2}
                name="组织活力"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke="#EF4444"
                strokeWidth={2}
                name="员工敬业度"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right - Risk & Opportunity Matrix */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">风险与机会矩阵</h3>
          <div className="grid grid-cols-2 gap-3 h-[280px]">
            {/* Top Left - Urgent */}
            <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
              <div className="font-semibold text-red-900 mb-2 text-sm">🚨 紧急改善</div>
              <div className="space-y-2">
                {matrixItems
                  .filter((item) => item.quadrant === "urgent")
                  .map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-xs text-gray-600">{item.desc}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Top Right - Strength */}
            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <div className="font-semibold text-green-900 mb-2 text-sm">💪 核心优势</div>
              <div className="space-y-2">
                {matrixItems
                  .filter((item) => item.quadrant === "strength")
                  .map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-xs text-gray-600">{item.desc}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Bottom Left - Observe */}
            <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
              <div className="font-semibold text-orange-900 mb-2 text-sm">👀 观察项</div>
              <div className="space-y-2">
                {matrixItems
                  .filter((item) => item.quadrant === "observe")
                  .map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-xs text-gray-600">{item.desc}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Bottom Right - Opportunity */}
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <div className="font-semibold text-blue-900 mb-2 text-sm">🌟 储备机会</div>
              <div className="space-y-2">
                {matrixItems
                  .filter((item) => item.quadrant === "opportunity")
                  .map((item, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-xs text-gray-600">{item.desc}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Strategic Recommendations */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <h3 className="font-semibold text-lg">基于本季度组织健康度评估，建议优先行动</h3>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">紧急</span>
              <div className="flex-1 text-sm leading-relaxed">
                <p className="font-medium mb-1">
                  人才结构维度得分 82 但 35 岁以下占比下降 3.5%
                </p>
                <p className="text-white/80">
                  建议加大年轻人才引进，目标 6 个月内提升至 45%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                重要
              </span>
              <div className="flex-1 text-sm leading-relaxed">
                <p className="font-medium mb-1">
                  员工敬业度 71 分（行业 78），主要来自加班和成长空间
                </p>
                <p className="text-white/80">
                  建议启动"敬业度提升计划"，重点改善信息技术中心和市场营销部
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                机会
              </span>
              <div className="flex-1 text-sm leading-relaxed">
                <p className="font-medium mb-1">文化认同度连续 3 季度上升</p>
                <p className="text-white/80">
                  建议固化已有的文化建设举措，形成可复制的部门最佳实践
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            导出战略报告 PDF
          </button>
          <button className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 flex items-center gap-2 text-sm font-medium">
            <Share2 className="w-4 h-4" />
            分享给管理层
          </button>
        </div>
      </div>
    </div>
  );
}
