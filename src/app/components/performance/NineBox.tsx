import { useState } from "react";
import { Link } from "react-router";
import { Download, FileText, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PerformanceNav } from "./PerformanceNav";

const employees = [
  { id: "e001", name: "吴涛", avatar: "https://ui-avatars.com/api/?name=吴涛&background=10B981&color=fff", performance: 95, potential: 92, box: "q2" },
  { id: "e002", name: "林雪", avatar: "https://ui-avatars.com/api/?name=林雪&background=1E40AF&color=fff", performance: 88, potential: 95, box: "q2" },
  { id: "e003", name: "李娜", avatar: "https://ui-avatars.com/api/?name=李娜&background=F59E0B&color=fff", performance: 92, potential: 88, box: "q3" },
  { id: "e004", name: "张伟", avatar: "https://ui-avatars.com/api/?name=张伟&background=8B5CF6&color=fff", performance: 90, potential: 90, box: "q2" },
  { id: "e005", name: "王强", avatar: "https://ui-avatars.com/api/?name=王强&background=EC4899&color=fff", performance: 85, potential: 82, box: "q3" },
  { id: "e006", name: "赵敏", avatar: "https://ui-avatars.com/api/?name=赵敏&background=06B6D4&color=fff", performance: 88, potential: 85, box: "q3" },
  { id: "e007", name: "刘洋", avatar: "https://ui-avatars.com/api/?name=刘洋&background=EF4444&color=fff", performance: 82, potential: 78, box: "q5" },
  { id: "e008", name: "陈静", avatar: "https://ui-avatars.com/api/?name=陈静&background=84CC16&color=fff", performance: 78, potential: 85, box: "q5" },
  { id: "e009", name: "孙磊", avatar: "https://ui-avatars.com/api/?name=孙磊&background=F97316&color=fff", performance: 92, potential: 75, box: "q6" },
  { id: "e010", name: "周芳", avatar: "https://ui-avatars.com/api/?name=周芳&background=6B7280&color=fff", performance: 75, potential: 80, box: "q5" },
  { id: "e011", name: "郑强", avatar: "https://ui-avatars.com/api/?name=郑强&background=1E40AF&color=fff", performance: 70, potential: 75, box: "q4" },
  { id: "e012", name: "马超", avatar: "https://ui-avatars.com/api/?name=马超&background=10B981&color=fff", performance: 80, potential: 82, box: "q5" },
  { id: "e013", name: "黄磊", avatar: "https://ui-avatars.com/api/?name=黄磊&background=F59E0B&color=fff", performance: 68, potential: 88, box: "q1" },
  { id: "e014", name: "杨洋", avatar: "https://ui-avatars.com/api/?name=杨洋&background=8B5CF6&color=fff", performance: 72, potential: 92, box: "q1" },
  { id: "e015", name: "许晴", avatar: "https://ui-avatars.com/api/?name=许晴&background=EC4899&color=fff", performance: 88, potential: 72, box: "q6" },
  { id: "e016", name: "谢霆", avatar: "https://ui-avatars.com/api/?name=谢霆&background=06B6D4&color=fff", performance: 65, potential: 70, box: "q4" },
  { id: "e017", name: "范冰", avatar: "https://ui-avatars.com/api/?name=范冰&background=EF4444&color=fff", performance: 60, potential: 68, box: "q7" },
  { id: "e018", name: "胡歌", avatar: "https://ui-avatars.com/api/?name=胡歌&background=84CC16&color=fff", performance: 75, potential: 88, box: "q1" },
  { id: "e019", name: "刘德", avatar: "https://ui-avatars.com/api/?name=刘德&background=F97316&color=fff", performance: 68, potential: 65, box: "q4" },
  { id: "e020", name: "成龙", avatar: "https://ui-avatars.com/api/?name=成龙&background=6B7280&color=fff", performance: 78, potential: 70, box: "q8" },
];

const boxes = [
  { id: "q1", label: "高潜储备", row: 2, col: 0, color: "bg-yellow-50", border: "border-yellow-200" },
  { id: "q2", label: "明星员工", row: 2, col: 1, color: "bg-green-100", border: "border-green-300" },
  { id: "q3", label: "关键骨干", row: 2, col: 2, color: "bg-green-50", border: "border-green-200" },
  { id: "q4", label: "待发展", row: 1, col: 0, color: "bg-yellow-100", border: "border-yellow-300" },
  { id: "q5", label: "核心员工", row: 1, col: 1, color: "bg-blue-50", border: "border-blue-200" },
  { id: "q6", label: "业绩之星", row: 1, col: 2, color: "bg-blue-100", border: "border-blue-300" },
  { id: "q7", label: "观察", row: 0, col: 0, color: "bg-gray-100", border: "border-gray-300" },
  { id: "q8", label: "待改进", row: 0, col: 1, color: "bg-orange-50", border: "border-orange-200" },
  { id: "q9", label: "业绩之星预警", row: 0, col: 2, color: "bg-orange-100", border: "border-orange-300" },
];

const distributionData = [
  { name: "明星员工", count: 4, percentage: 20 },
  { name: "关键骨干", count: 3, percentage: 15 },
  { name: "核心员工", count: 5, percentage: 25 },
  { name: "高潜储备", count: 3, percentage: 15 },
  { name: "业绩之星", count: 2, percentage: 10 },
  { name: "待发展", count: 2, percentage: 10 },
  { name: "待改进", count: 1, percentage: 5 },
];

export function NineBox() {
  const [department, setDepartment] = useState("all");
  const [cycle, setCycle] = useState("2026-q1");
  const [level, setLevel] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);

  const getBoxEmployees = (boxId: string) => {
    return employees.filter((e) => e.box === boxId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/performance/nine-box" className="hover:text-gray-700">
          绩效管理
        </Link>
        <span>/</span>
        <span className="text-gray-900">人才九宫格</span>
      </div>

      {/* Navigation Tabs */}
      <PerformanceNav />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">人才九宫格</h1>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="all">全部部门</option>
              <option value="tech">信息技术中心</option>
              <option value="product">产品研发部</option>
              <option value="marketing">市场营销部</option>
            </select>

            <select
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="2026-q1">2026 Q1</option>
              <option value="2025-q4">2025 Q4</option>
              <option value="2025-q3">2025 Q3</option>
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="all">全部职级</option>
              <option value="senior">高级</option>
              <option value="middle">中级</option>
              <option value="junior">初级</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={`px-3 py-2 text-sm ${
                  view === "grid"
                    ? "bg-[#1E40AF] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                九宫格视图
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-3 py-2 text-sm ${
                  view === "list"
                    ? "bg-[#1E40AF] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                列表视图
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Nine Box Grid */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Y轴：潜力</span>
                <span className="text-sm text-gray-500">X轴：业绩</span>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-rows-3 gap-3">
              {[2, 1, 0].map((row) => (
                <div key={row} className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((col) => {
                    const box = boxes.find(
                      (b) => b.row === row && b.col === col
                    )!;
                    const boxEmployees = getBoxEmployees(box.id);
                    const displayEmployees = boxEmployees.slice(0, 5);
                    const remainingCount = Math.max(
                      0,
                      boxEmployees.length - 5
                    );

                    return (
                      <div
                        key={`${row}-${col}`}
                        className={`${box.color} ${box.border} border-2 rounded-lg p-4 min-h-[140px] relative transition-all hover:shadow-md cursor-pointer`}
                        onMouseEnter={() => setHoveredBox(box.id)}
                        onMouseLeave={() => setHoveredBox(null)}
                      >
                        <div className="mb-3">
                          <h3 className="font-medium text-gray-900 text-sm">
                            {box.label}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            {boxEmployees.length} 人
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {displayEmployees.map((emp) => (
                            <img
                              key={emp.id}
                              src={emp.avatar}
                              alt={emp.name}
                              title={emp.name}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            />
                          ))}
                          {remainingCount > 0 && (
                            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center">
                              <span className="text-xs text-gray-600">
                                +{remainingCount}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Hover Tooltip */}
                        {hoveredBox === box.id && boxEmployees.length > 0 && (
                          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 w-64">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">
                              {box.label} ({boxEmployees.length}人)
                            </h4>
                            <div className="space-y-1 max-h-40 overflow-y-auto">
                              {boxEmployees.map((emp) => (
                                <div
                                  key={emp.id}
                                  className="flex items-center gap-2 text-sm text-gray-600"
                                >
                                  <img
                                    src={emp.avatar}
                                    alt={emp.name}
                                    className="w-6 h-6 rounded-full"
                                  />
                                  <span>{emp.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Axis Labels */}
            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <span>低业绩</span>
              <span>高业绩</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Statistics */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">人才分布统计</h3>

          {/* Distribution Chart */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              各格人数占比
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={distributionData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#1E40AF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Insights */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              关键洞察
            </h4>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800">
                  <span className="font-medium">明星员工</span> 占比 20%
                </p>
                <p className="text-green-600 text-xs mt-1">
                  表现优秀，建议重点保留和激励
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800">
                  <span className="font-medium">核心员工</span> 占比 25%
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  团队骨干，稳定发展中
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800">
                  <span className="font-medium">高潜储备</span> 占比 15%
                </p>
                <p className="text-yellow-600 text-xs mt-1">
                  建议加强培养，提升业绩表现
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-orange-800">
                  <span className="font-medium">待改进</span> 占比 5%
                </p>
                <p className="text-orange-600 text-xs mt-1">
                  需要制定改进计划或考虑调整
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              导出人才报告
            </button>
            <button className="w-full px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] flex items-center justify-center gap-2 text-sm font-medium">
              <FileText className="w-4 h-4" />
              启动校准会议
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
