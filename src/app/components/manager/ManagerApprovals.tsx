import { useState } from "react";
import { Link } from "react-router";
import {
  CheckCircle,
  Clock,
  TrendingUp,
  AlertCircle,
  User,
  Calendar,
  FileText,
  X,
  Check,
} from "lucide-react";

const kpiData = [
  {
    id: "pending",
    title: "待我审批",
    value: "8",
    icon: AlertCircle,
    color: "bg-red-50 text-red-600",
  },
  {
    id: "today",
    title: "今日已审批",
    value: "3",
    icon: CheckCircle,
    color: "bg-green-50 text-green-600",
  },
  {
    id: "monthly",
    title: "本月已审批",
    value: "47",
    icon: TrendingUp,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "avgTime",
    title: "平均处理时长",
    value: "2.3 小时",
    icon: Clock,
    color: "bg-purple-50 text-purple-600",
  },
];

const approvalRequests = [
  {
    id: "APR20260521001",
    applicant: {
      name: "张伟",
      avatar: "https://ui-avatars.com/api/?name=张伟&background=1E40AF&color=fff",
      department: "信息技术中心",
      position: "高级工程师",
    },
    type: "请假",
    summary: "年假申请 - 2026.05.26 至 2026.05.28（3天）",
    reason: "家庭出游",
    submittedAt: "2 小时前",
    urgency: "normal",
  },
  {
    id: "APR20260521002",
    applicant: {
      name: "李娜",
      avatar: "https://ui-avatars.com/api/?name=李娜&background=EC4899&color=fff",
      department: "信息技术中心",
      position: "产品经理",
    },
    type: "加班",
    summary: "加班申请 - 2026.05.20（4小时）",
    reason: "产品发布准备工作",
    submittedAt: "30 分钟前",
    urgency: "urgent",
  },
  {
    id: "APR20260521003",
    applicant: {
      name: "王强",
      avatar: "https://ui-avatars.com/api/?name=王强&background=10B981&color=fff",
      department: "信息技术中心",
      position: "测试工程师",
    },
    type: "报销",
    summary: "差旅报销 - ¥3,240（北京-上海往返机票）",
    reason: "客户现场技术支持",
    submittedAt: "1 小时前",
    urgency: "normal",
  },
  {
    id: "APR20260521004",
    applicant: {
      name: "刘洋",
      avatar: "https://ui-avatars.com/api/?name=刘洋&background=F59E0B&color=fff",
      department: "信息技术中心",
      position: "UI设计师",
    },
    type: "调休",
    summary: "调休申请 - 2026.05.23（8小时）",
    reason: "周末加班补休",
    submittedAt: "45 分钟前",
    urgency: "normal",
  },
  {
    id: "APR20260520008",
    applicant: {
      name: "陈静",
      avatar: "https://ui-avatars.com/api/?name=陈静&background=8B5CF6&color=fff",
      department: "信息技术中心",
      position: "前端工程师",
    },
    type: "出差",
    summary: "出差申请 - 深圳（2026.05.25-05.27，3天）",
    reason: "参加技术大会",
    submittedAt: "3 小时前",
    urgency: "normal",
  },
  {
    id: "APR20260520005",
    applicant: {
      name: "赵敏",
      avatar: "https://ui-avatars.com/api/?name=赵敏&background=EF4444&color=fff",
      department: "信息技术中心",
      position: "后端工程师",
    },
    type: "请假",
    summary: "病假申请 - 2026.05.21（1天）",
    reason: "身体不适需就医",
    submittedAt: "15 分钟前",
    urgency: "urgent",
  },
];

const typeFilters = [
  { id: "all", label: "全部", count: 8 },
  { id: "leave", label: "请假", count: 2 },
  { id: "overtime", label: "加班", count: 1 },
  { id: "expense", label: "报销", count: 1 },
  { id: "trip", label: "出差", count: 1 },
  { id: "compensate", label: "调休", count: 1 },
  { id: "other", label: "其他", count: 2 },
];

export function ManagerApprovals() {
  const [activeFilter, setActiveFilter] = useState("all");

  const getUrgencyBadge = (urgency: string) => {
    if (urgency === "urgent") {
      return (
        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
          紧急
        </span>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/manager/approvals" className="hover:text-gray-700">
          经理自助
        </Link>
        <span>/</span>
        <span className="text-gray-900">审批中心</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">审批中心</h1>
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
              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 flex-wrap">
          {typeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? "bg-[#1E40AF] text-white"
                  : "text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {filter.label}
              {filter.count > 0 && (
                <span
                  className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                    activeFilter === filter.id
                      ? "bg-white/20"
                      : "bg-gray-100"
                  }`}
                >
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Approval Requests */}
      <div className="space-y-4">
        {approvalRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <img
                src={request.applicant.avatar}
                alt={request.applicant.name}
                className="w-12 h-12 rounded-full border-2 border-gray-100"
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">
                      {request.applicant.name}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {request.applicant.department} · {request.applicant.position}
                    </span>
                    {getUrgencyBadge(request.urgency)}
                  </div>
                  <span className="text-sm text-gray-400">
                    {request.submittedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                    {request.type}
                  </span>
                  <span className="text-sm text-gray-600 font-mono">
                    {request.id}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {request.summary}
                  </p>
                  <p className="text-sm text-gray-600">原因：{request.reason}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    查看详情
                  </button>
                  <button className="px-4 py-2 border border-red-300 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium flex items-center gap-2">
                    <X className="w-4 h-4" />
                    拒绝
                  </button>
                  <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] text-sm font-medium flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    同意
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Batch Actions */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            已选择 <span className="font-semibold text-gray-900">0</span> 项审批
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-red-300 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium">
              批量拒绝
            </button>
            <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] text-sm font-medium">
              批量同意
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
