import { useState } from "react";
import { Link } from "react-router";
import {
  Umbrella,
  Clock,
  Heart,
  FileText,
  Plus,
  Eye,
  X,
  Upload,
} from "lucide-react";

const leaveBalances = [
  {
    id: "annual",
    type: "年假",
    remaining: 7,
    total: 10,
    unit: "天",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: "overtime",
    type: "调休",
    remaining: 12,
    total: null,
    unit: "小时",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
  {
    id: "sick",
    type: "病假",
    remaining: 5,
    total: null,
    unit: "天",
    color: "bg-gradient-to-br from-green-500 to-green-600",
  },
  {
    id: "personal",
    type: "事假",
    remaining: "不限",
    total: null,
    unit: "",
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
  },
];

const leaveApplications = [
  {
    id: "LV20260512",
    type: "年假",
    startDate: "2026.05.20",
    endDate: "2026.05.22",
    duration: "3天",
    reason: "春季出游",
    status: "已批准",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: "LV20260418",
    type: "病假",
    startDate: "2026.04.18",
    endDate: "2026.04.18",
    duration: "1天",
    reason: "感冒发烧",
    status: "已批准",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: "LV20260315",
    type: "调休",
    startDate: "2026.03.15",
    endDate: "2026.03.15",
    duration: "4小时",
    reason: "个人事务",
    status: "审批中",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: "LV20260208",
    type: "事假",
    startDate: "2026.02.08",
    endDate: "2026.02.08",
    duration: "0.5天",
    reason: "银行办事",
    status: "已驳回",
    statusColor: "bg-red-100 text-red-700",
  },
  {
    id: "LV20260125",
    type: "年假",
    startDate: "2026.01.25",
    endDate: "2026.01.26",
    duration: "2天",
    reason: "回家探亲",
    status: "已批准",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: "LV20251220",
    type: "调休",
    startDate: "2025.12.20",
    endDate: "2025.12.20",
    duration: "8小时",
    reason: "周末加班补休",
    status: "已批准",
    statusColor: "bg-green-100 text-green-700",
  },
];

export function LeaveManagement() {
  const [activeTab, setActiveTab] = useState("my");
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/attendance/leave" className="hover:text-gray-700">
          考勤休假
        </Link>
        <span>/</span>
        <span className="text-gray-900">假期管理</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">假期管理</h1>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-4 gap-4">
        {leaveBalances.map((balance) => (
          <div
            key={balance.id}
            className={`${balance.color} rounded-lg p-5 shadow-sm text-white`}
          >
            <div className="mb-3">
              <p className="text-sm text-white/80">{balance.type}</p>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold tabular-nums">
                {balance.remaining}
              </span>
              {balance.total && (
                <span className="text-lg text-white/80 mb-1">
                  / {balance.total}
                </span>
              )}
              <span className="text-sm text-white/80 mb-1">
                {balance.unit}
              </span>
            </div>
            {balance.total && (
              <div className="mt-4">
                <div className="bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{
                      width: `${
                        ((balance.total - (balance.remaining as number)) /
                          balance.total) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("my")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "my"
                  ? "bg-[#1E40AF] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              我的申请
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "team"
                  ? "bg-[#1E40AF] text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              团队请假日历
            </button>
          </div>

          <button
            onClick={() => setShowDrawer(true)}
            className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            发起请假申请
          </button>
        </div>
      </div>

      {/* Applications List */}
      {activeTab === "my" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  申请编号
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  假期类型
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  起止时间
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  时长
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  原因
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
              {leaveApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-mono text-gray-600">
                    {app.id}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {app.type}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {app.startDate}
                    {app.startDate !== app.endDate && ` - ${app.endDate}`}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {app.duration}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {app.reason}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${app.statusColor}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="text-[#1E40AF] hover:text-[#1E3A8A] text-sm flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      查看
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "team" && (
        <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500">团队请假日历功能开发中...</p>
        </div>
      )}

      {/* Drawer - Leave Application Form */}
      {showDrawer && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowDrawer(false)}
          />
          <div className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-xl z-50 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  发起请假申请
                </h2>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    假期类型 <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
                    <option>年假</option>
                    <option>事假</option>
                    <option>病假</option>
                    <option>调休</option>
                    <option>婚假</option>
                    <option>产假</option>
                    <option>陪产假</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    起止时间 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    />
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    自动计算：3 个工作日
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    请假原因 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="请输入请假原因..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    附件上传
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E40AF] transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      点击上传或拖拽文件至此
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      支持 PDF、JPG、PNG，最大 10MB
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    审批人
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src="https://ui-avatars.com/api/?name=Manager&background=1E40AF&color=fff"
                      alt="审批人"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        王经理
                      </p>
                      <p className="text-xs text-gray-500">信息技术中心 - 总监</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  保存草稿
                </button>
                <button className="flex-1 px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] text-sm font-medium">
                  提交申请
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
