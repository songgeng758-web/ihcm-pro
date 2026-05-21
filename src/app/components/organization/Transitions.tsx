import { useState } from "react";
import { Link } from "react-router";
import {
  UserPlus,
  CheckCircle,
  RefreshCw,
  UserMinus,
  AlertCircle,
  Eye,
  Bell,
} from "lucide-react";

const kpiData = [
  {
    id: "onboard",
    title: "本月入职",
    value: "32",
    icon: UserPlus,
    color: "bg-green-50 text-green-600",
  },
  {
    id: "convert",
    title: "本月转正",
    value: "18",
    icon: CheckCircle,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "transfer",
    title: "本月调岗",
    value: "7",
    icon: RefreshCw,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "resign",
    title: "本月离职",
    value: "18",
    icon: UserMinus,
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: "pending",
    title: "待审批流程",
    value: "12",
    icon: AlertCircle,
    color: "bg-red-50 text-red-600",
  },
];

const typeTabs = [
  { id: "all", label: "全部", count: 487 },
  { id: "onboard", label: "入职", count: 156 },
  { id: "convert", label: "转正", count: 98 },
  { id: "transfer", label: "调岗", count: 134 },
  { id: "resign", label: "离职", count: 99 },
];

const transitions = [
  {
    id: "TR202605210001",
    type: "onboard",
    typeName: "入职",
    typeColor: "bg-green-500",
    employee: {
      name: "周明",
      avatar: "https://ui-avatars.com/api/?name=周明&background=10B981&color=fff",
      empNo: "EMP2026001",
    },
    change: "市场专员",
    date: "生效日期：2026.05.25",
    progress: 5,
    status: "completed",
    statusText: "已完成",
    statusColor: "bg-green-100 text-green-700",
    time: "1天前",
  },
  {
    id: "TR202605200002",
    type: "convert",
    typeName: "转正",
    typeColor: "bg-blue-500",
    employee: {
      name: "李娜",
      avatar: "https://ui-avatars.com/api/?name=李娜&background=EC4899&color=fff",
      empNo: "EMP2023045",
    },
    change: "市场经理 · 试用期转正",
    date: "转正日期：2026.06.01",
    progress: 2,
    status: "in-progress",
    statusText: "部门审批中",
    statusColor: "bg-blue-100 text-blue-700",
    time: "2天前",
  },
  {
    id: "TR202605190003",
    type: "transfer",
    typeName: "调岗",
    typeColor: "bg-orange-500",
    employee: {
      name: "张伟",
      avatar: "https://ui-avatars.com/api/?name=张伟&background=1E40AF&color=fff",
      empNo: "EMP2020156",
    },
    change: "高级开发工程师 → 架构师",
    date: "生效日期：2026.06.15",
    progress: 3,
    status: "in-progress",
    statusText: "HR 审核中",
    statusColor: "bg-blue-100 text-blue-700",
    time: "3天前",
  },
  {
    id: "TR202605160004",
    type: "resign",
    typeName: "离职",
    typeColor: "bg-gray-500",
    employee: {
      name: "吴涛",
      avatar: "https://ui-avatars.com/api/?name=吴涛&background=DC2626&color=fff",
      empNo: "EMP2021089",
    },
    change: "法务顾问 · 个人原因离职",
    date: "离职日期：2026.06.30",
    progress: 4,
    status: "in-progress",
    statusText: "复核中",
    statusColor: "bg-blue-100 text-blue-700",
    time: "5天前",
  },
  {
    id: "TR202605140005",
    type: "onboard",
    typeName: "入职",
    typeColor: "bg-green-500",
    employee: {
      name: "赵雯",
      avatar: "https://ui-avatars.com/api/?name=赵雯&background=8B5CF6&color=fff",
      empNo: "EMP2026002",
    },
    change: "招聘专员 · 社招入职",
    date: "生效日期：2026.05.20",
    progress: 5,
    status: "completed",
    statusText: "已完成",
    statusColor: "bg-green-100 text-green-700",
    time: "1周前",
  },
  {
    id: "TR202605120006",
    type: "convert",
    typeName: "转正",
    typeColor: "bg-blue-500",
    employee: {
      name: "孙磊",
      avatar: "https://ui-avatars.com/api/?name=孙磊&background=F59E0B&color=fff",
      empNo: "EMP2025234",
    },
    change: "客服主管 · 提前转正申请",
    date: "转正日期：2026.05.25",
    progress: 2,
    status: "rejected",
    statusText: "已驳回",
    statusColor: "bg-red-100 text-red-700",
    time: "1周前",
  },
];

const progressSteps = ["发起", "部门审批", "HR 审核", "复核", "完成"];

export function Transitions() {
  const [activeTab, setActiveTab] = useState("all");

  const renderProgressBar = (currentStep: number) => {
    return (
      <div className="flex items-center gap-2">
        {progressSteps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-[#1E40AF] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? "✓" : stepNum}
                </div>
                <span className="text-xs text-gray-600 mt-1">{step}</span>
              </div>
              {index < progressSteps.length - 1 && (
                <div
                  className={`w-12 h-1 mx-1 ${
                    stepNum < currentStep ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
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
        <Link to="/org/transitions" className="hover:text-gray-700">
          核心人事
        </Link>
        <span>/</span>
        <span className="text-gray-900">入转调离</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">入转调离</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
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
              <p className="text-2xl font-bold text-gray-900 tabular-nums">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Type Tabs */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          {typeTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-[#1E40AF] text-white"
                  : "text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-80">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
              <option>全部状态</option>
              <option>进行中</option>
              <option>已完成</option>
              <option>已驳回</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
              <option>全部部门</option>
              <option>信息技术中心</option>
              <option>市场营销部</option>
              <option>人力资源部</option>
            </select>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2 text-sm font-medium">
              <UserPlus className="w-4 h-4" />
              发起入职
            </button>
            <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2 text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              发起转正
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2 text-sm font-medium">
              <RefreshCw className="w-4 h-4" />
              发起调岗
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2 text-sm font-medium">
              <UserMinus className="w-4 h-4" />
              发起离职
            </button>
          </div>
        </div>
      </div>

      {/* Transition Cards */}
      <div className="space-y-4">
        {transitions.map((trans) => (
          <div
            key={trans.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-6">
              {/* Left - Type Badge */}
              <div className="w-44 flex-shrink-0">
                <div
                  className={`${trans.typeColor} text-white rounded-lg p-4 flex flex-col items-center justify-center`}
                >
                  <div className="text-2xl mb-2">
                    {trans.type === "onboard" && <UserPlus className="w-8 h-8" />}
                    {trans.type === "convert" && <CheckCircle className="w-8 h-8" />}
                    {trans.type === "transfer" && <RefreshCw className="w-8 h-8" />}
                    {trans.type === "resign" && <UserMinus className="w-8 h-8" />}
                  </div>
                  <div className="font-semibold text-lg">{trans.typeName}</div>
                  <div className="text-xs mt-1 opacity-90">{trans.id}</div>
                </div>
              </div>

              {/* Middle - Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={trans.employee.avatar}
                    alt={trans.employee.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-100"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{trans.employee.name}</span>
                      <span className="text-sm text-gray-500 font-mono">{trans.employee.empNo}</span>
                    </div>
                    <div className="text-sm text-gray-700 mt-1">{trans.change}</div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-4">{trans.date}</div>

                {/* Progress Bar */}
                <div className="mt-4">{renderProgressBar(trans.progress)}</div>
              </div>

              {/* Right - Actions */}
              <div className="w-44 flex-shrink-0 flex flex-col items-end gap-3">
                <span className={`px-3 py-1 rounded text-sm font-medium ${trans.statusColor}`}>
                  {trans.statusText}
                </span>
                <span className="text-sm text-gray-500">{trans.time}</span>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    查看详情
                  </button>
                  {trans.status === "in-progress" && (
                    <button className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Bell className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
