import { useState } from "react";
import { Link } from "react-router";
import { CheckCircle, Circle, Star } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PerformanceNav } from "./PerformanceNav";

const radarData = [
  { subject: "业绩", A: 85, fullMark: 100 },
  { subject: "能力", A: 78, fullMark: 100 },
  { subject: "态度", A: 92, fullMark: 100 },
  { subject: "协作", A: 88, fullMark: 100 },
  { subject: "创新", A: 75, fullMark: 100 },
];

const trendData = [
  { period: "2024 Q3", score: 82 },
  { period: "2024 Q4", score: 85 },
  { period: "2025 Q1", score: 87 },
  { period: "2025 Q2", score: 88 },
];

const objectives = [
  {
    id: "obj-001",
    title: "完成新版招聘模块上线",
    weight: 30,
    keyResults: [
      { id: "kr-001", text: "完成前端开发及测试", completion: 100 },
      { id: "kr-002", text: "上线后用户满意度 > 90%", completion: 85 },
      { id: "kr-003", text: "系统稳定性 99.5% 以上", completion: 95 },
    ],
    selfRating: 4,
    selfComment: "",
  },
  {
    id: "obj-002",
    title: "用户增长达成目标",
    weight: 25,
    keyResults: [
      { id: "kr-004", text: "月活用户增长 20%", completion: 90 },
      { id: "kr-005", text: "新增注册用户 5000+", completion: 100 },
      { id: "kr-006", text: "用户留存率提升至 75%", completion: 80 },
    ],
    selfRating: 0,
    selfComment: "",
  },
  {
    id: "obj-003",
    title: "技术债务清理与优化",
    weight: 20,
    keyResults: [
      { id: "kr-007", text: "清理遗留代码 50%", completion: 60 },
      { id: "kr-008", text: "页面加载速度提升 30%", completion: 75 },
      { id: "kr-009", text: "单元测试覆盖率达到 80%", completion: 70 },
    ],
    selfRating: 0,
    selfComment: "",
  },
  {
    id: "obj-004",
    title: "团队协作与知识分享",
    weight: 25,
    keyResults: [
      { id: "kr-010", text: "完成 4 次技术分享", completion: 100 },
      { id: "kr-011", text: "辅导新人 2 名", completion: 100 },
      { id: "kr-012", text: "跨部门协作项目 >= 2 个", completion: 50 },
    ],
    selfRating: 0,
    selfComment: "",
  },
];

export function MyPerformance() {
  const [goals, setGoals] = useState(objectives);

  const totalWeight = goals.reduce((sum, g) => sum + g.weight, 0);

  const handleRatingChange = (objId: string, rating: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === objId ? { ...g, selfRating: rating } : g))
    );
  };

  const handleCommentChange = (objId: string, comment: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === objId ? { ...g, selfComment: comment } : g))
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/performance/my" className="hover:text-gray-700">
          绩效管理
        </Link>
        <span>/</span>
        <span className="text-gray-900">我的绩效</span>
      </div>

      {/* Navigation Tabs */}
      <PerformanceNav />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">我的绩效</h1>
      </div>

      {/* Current Cycle Card */}
      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            2026 Q1 季度考核
          </h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
            进行中
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">目标确认</span>
          </div>
          <div className="h-px w-12 bg-gray-300" />
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#1E40AF] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="text-sm font-medium text-gray-900">自评中</span>
          </div>
          <div className="h-px w-12 bg-gray-300" />
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-gray-300" />
            <span className="text-sm text-gray-400">上级评估</span>
          </div>
          <div className="h-px w-12 bg-gray-300" />
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-gray-300" />
            <span className="text-sm text-gray-400">校准</span>
          </div>
          <div className="h-px w-12 bg-gray-300" />
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-gray-300" />
            <span className="text-sm text-gray-400">结果发布</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - My Objectives */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">我的目标</h3>
            <span
              className={`text-sm ${
                totalWeight === 100 ? "text-green-600" : "text-red-600"
              }`}
            >
              权重合计：{totalWeight}%{totalWeight !== 100 && " (需为 100%)"}
            </span>
          </div>

          {goals.map((obj) => (
            <div
              key={obj.id}
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="font-medium text-gray-900">{obj.title}</h4>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  权重 {obj.weight}%
                </span>
              </div>

              {/* Key Results */}
              <div className="space-y-3 mb-4">
                <p className="text-sm text-gray-500">关键结果</p>
                {obj.keyResults.map((kr) => (
                  <div key={kr.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{kr.text}</span>
                      <span className="text-sm text-gray-600 tabular-nums">
                        {kr.completion}%
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-[#1E40AF] h-1.5 rounded-full"
                        style={{ width: `${kr.completion}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Self Rating */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">自评分</p>
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(obj.id, rating)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= obj.selfRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={obj.selfComment}
                  onChange={(e) =>
                    handleCommentChange(obj.id, e.target.value)
                  }
                  placeholder="请输入自评说明..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Performance Profile */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">个人绩效档案</h3>

          {/* Radar Chart */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              能力雷达图
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
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

          {/* Trend Chart */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              绩效趋势
            </h4>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#1E40AF"
                  strokeWidth={2}
                  dot={{ fill: "#1E40AF" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Latest Result */}
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              最近绩效结果
            </h4>
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-[#1E40AF] mb-2">
                B+
              </div>
              <p className="text-sm text-gray-600">排名前 12%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Action Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 sticky bottom-6">
        <div className="flex items-center justify-end gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            保存草稿
          </button>
          <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] text-sm font-medium">
            提交自评
          </button>
        </div>
      </div>
    </div>
  );
}
