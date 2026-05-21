import { useState } from "react";
import { Link } from "react-router";
import {
  Briefcase,
  Users,
  UserPlus,
  Clock,
  Plus,
  MoreVertical,
  MapPin,
  DollarSign,
  Calendar,
  TrendingUp,
} from "lucide-react";

const kpiData = [
  {
    id: "active-jobs",
    title: "招聘中职位",
    value: "28",
    icon: Briefcase,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "total-candidates",
    title: "候选人总数",
    value: "342",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "monthly-hires",
    title: "本月入职",
    value: "12",
    icon: UserPlus,
    color: "bg-green-50 text-green-600",
    trend: "+3",
  },
  {
    id: "avg-days",
    title: "平均到岗周期",
    value: "23 天",
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
  },
];

const jobsData = [
  {
    id: "job-001",
    title: "高级前端工程师",
    department: "信息技术中心",
    location: "北京",
    experience: "3-5年",
    salary: "25-40K · 14薪",
    urgency: "urgent",
    urgencyLabel: "紧急",
    pipeline: { submitted: 45, screened: 18, interview: 8, offer: 2, hired: 0 },
    recruiter: "李娜",
    recruiterAvatar:
      "https://ui-avatars.com/api/?name=李娜&background=1E40AF&color=fff",
    hired: 0,
    total: 3,
    deadline: "2026-06-30",
  },
  {
    id: "job-002",
    title: "产品经理",
    department: "产品研发部",
    location: "上海",
    experience: "5-8年",
    salary: "30-50K · 15薪",
    urgency: "urgent",
    urgencyLabel: "紧急",
    pipeline: { submitted: 32, screened: 12, interview: 5, offer: 1, hired: 0 },
    recruiter: "王强",
    recruiterAvatar:
      "https://ui-avatars.com/api/?name=王强&background=10B981&color=fff",
    hired: 0,
    total: 2,
    deadline: "2026-06-15",
  },
  {
    id: "job-003",
    title: "数据分析师",
    department: "数据中心",
    location: "北京",
    experience: "2-4年",
    salary: "18-30K · 13薪",
    urgency: "normal",
    urgencyLabel: "普通",
    pipeline: { submitted: 28, screened: 15, interview: 6, offer: 3, hired: 1 },
    recruiter: "张伟",
    recruiterAvatar:
      "https://ui-avatars.com/api/?name=张伟&background=F59E0B&color=fff",
    hired: 1,
    total: 2,
    deadline: "2026-07-10",
  },
  {
    id: "job-004",
    title: "UI/UX 设计师",
    department: "设计部",
    location: "深圳",
    experience: "3-5年",
    salary: "20-35K · 14薪",
    urgency: "normal",
    urgencyLabel: "普通",
    pipeline: { submitted: 38, screened: 20, interview: 10, offer: 2, hired: 1 },
    recruiter: "陈静",
    recruiterAvatar:
      "https://ui-avatars.com/api/?name=陈静&background=8B5CF6&color=fff",
    hired: 1,
    total: 2,
    deadline: "2026-07-20",
  },
  {
    id: "job-005",
    title: "Java 后端工程师",
    department: "信息技术中心",
    location: "北京",
    experience: "3-5年",
    salary: "25-40K · 14薪",
    urgency: "normal",
    urgencyLabel: "普通",
    pipeline: { submitted: 52, screened: 25, interview: 12, offer: 4, hired: 2 },
    recruiter: "刘洋",
    recruiterAvatar:
      "https://ui-avatars.com/api/?name=刘洋&background=EC4899&color=fff",
    hired: 2,
    total: 5,
    deadline: "2026-08-01",
  },
  {
    id: "job-006",
    title: "测试工程师",
    department: "质量保障部",
    location: "上海",
    experience: "2-4年",
    salary: "15-25K · 13薪",
    urgency: "reserve",
    urgencyLabel: "储备",
    pipeline: { submitted: 18, screened: 8, interview: 3, offer: 1, hired: 0 },
    recruiter: "赵敏",
    recruiterAvatar:
      "https://ui-avatars.com/api/?name=赵敏&background=06B6D4&color=fff",
    hired: 0,
    total: 2,
    deadline: "2026-08-15",
  },
  {
    id: "job-007",
    title: "市场运营专员",
    department: "市场营销部",
    location: "广州",
    experience: "1-3年",
    salary: "12-20K · 13薪",
    urgency: "normal",
    urgencyLabel: "普通",
    pipeline: { submitted: 42, screened: 22, interview: 8, offer: 3, hired: 1 },
    recruiter: "孙磊",
    recruiterAvatar:
      "https://ui-avatars.com/api/?name=孙磊&background=EF4444&color=fff",
    hired: 1,
    total: 3,
    deadline: "2026-07-05",
  },
  {
    id: "job-008",
    title: "人力资源专员",
    department: "人力资源部",
    location: "北京",
    experience: "1-3年",
    salary: "10-18K · 13薪",
    urgency: "reserve",
    urgencyLabel: "储备",
    pipeline: { submitted: 25, screened: 12, interview: 5, offer: 1, hired: 0 },
    recruiter: "周芳",
    recruiterAvatar:
      "https://ui-avatars.com/api/?name=周芳&background=84CC16&color=fff",
    hired: 0,
    total: 1,
    deadline: "2026-08-20",
  },
  {
    id: "job-009",
    title: "财务分析师",
    department: "财务管理部",
    location: "上海",
    experience: "3-5年",
    salary: "20-35K · 14薪",
    urgency: "urgent",
    urgencyLabel: "紧急",
    pipeline: { submitted: 22, screened: 10, interview: 4, offer: 1, hired: 0 },
    recruiter: "吴涛",
    recruiterAvatar:
      "https://ui-avatars.com/api/?name=吴涛&background=6B7280&color=fff",
    hired: 0,
    total: 2,
    deadline: "2026-06-25",
  },
];

const urgencyColors = {
  urgent: "bg-red-100 text-red-700",
  normal: "bg-blue-100 text-blue-700",
  reserve: "bg-gray-100 text-gray-700",
};

export function RecruitmentJobs() {
  const [department, setDepartment] = useState("all");
  const [category, setCategory] = useState("all");
  const [urgency, setUrgency] = useState("all");
  const [status, setStatus] = useState("all");

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <span className="text-gray-900">招聘管理</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">招聘需求看板</h1>
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
              {item.trend && (
                <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {item.trend}
                </span>
              )}
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

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="all">全部部门</option>
              <option value="it">信息技术中心</option>
              <option value="product">产品研发部</option>
              <option value="marketing">市场营销部</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="all">全部岗位类别</option>
              <option value="tech">技术类</option>
              <option value="product">产品类</option>
              <option value="design">设计类</option>
            </select>

            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="all">全部紧急程度</option>
              <option value="urgent">紧急</option>
              <option value="normal">普通</option>
              <option value="reserve">储备</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="all">全部状态</option>
              <option value="active">招聘中</option>
              <option value="paused">已暂停</option>
              <option value="closed">已关闭</option>
            </select>
          </div>

          <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2 text-sm font-medium">
            <Plus className="w-4 h-4" />
            发布职位
          </button>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-3 gap-6">
        {jobsData.map((job) => (
          <Link
            key={job.id}
            to={`/recruit/pipeline/${job.id}`}
            className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#1E40AF] cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#1E40AF] transition-colors">
                    {job.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      urgencyColors[job.urgency as keyof typeof urgencyColors]
                    }`}
                  >
                    {job.urgencyLabel}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <span>·</span>
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary}</span>
              </div>
            </div>

            {/* Pipeline Mini Funnel */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">招聘进度</div>
              <div className="flex gap-1">
                {[
                  { label: "投递", value: job.pipeline.submitted },
                  { label: "筛选", value: job.pipeline.screened },
                  { label: "面试", value: job.pipeline.interview },
                  { label: "Offer", value: job.pipeline.offer },
                  { label: "入职", value: job.pipeline.hired },
                ].map((stage, idx) => (
                  <div key={idx} className="flex-1">
                    <div
                      className="h-2 rounded-sm"
                      style={{
                        backgroundColor:
                          stage.value > 0 ? "#1E40AF" : "#E5E7EB",
                        opacity: stage.value > 0 ? 1 - idx * 0.15 : 1,
                      }}
                    />
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      {stage.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <img
                  src={job.recruiterAvatar}
                  alt={job.recruiter}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-600">
                  已招聘 {job.hired}/{job.total} 人
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{job.deadline}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
