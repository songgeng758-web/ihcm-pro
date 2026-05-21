import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ChevronRight,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Download,
  MessageSquare,
  Video,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const candidateInfo = {
  id: "c001",
  name: "张三",
  avatar: "https://ui-avatars.com/api/?name=张三&background=1E40AF&color=fff&size=128",
  gender: "男",
  age: 28,
  phone: "138-0001-2345",
  email: "zhangsan@example.com",
  location: "北京市海淀区",
  expectedSalary: "30-35K",
  currentSalary: "28K",
  education: "本科 · 计算机科学",
  school: "北京大学",
  graduationYear: "2018",
  experience: "5年",
  currentCompany: "某互联网公司",
  currentPosition: "前端开发工程师",
  resumeScore: 92,
  appliedDate: "2026-05-10",
  currentStage: "面试中",
  status: "待安排二面",
};

const workHistory = [
  {
    id: 1,
    company: "某互联网公司",
    position: "前端开发工程师",
    period: "2021.06 - 至今",
    duration: "3年",
    description:
      "负责公司核心产品前端开发，使用 React/Vue 技术栈，参与项目架构设计和性能优化",
  },
  {
    id: 2,
    company: "某科技公司",
    position: "初级前端工程师",
    period: "2018.07 - 2021.05",
    duration: "2年11个月",
    description: "负责公司官网和后台管理系统开发，熟练掌握 HTML/CSS/JavaScript",
  },
];

const interviewTimeline = [
  {
    id: 1,
    type: "submitted",
    title: "简历投递",
    date: "2026-05-10 14:30",
    status: "completed",
    note: "候选人通过招聘网站投递简历",
  },
  {
    id: 2,
    type: "screened",
    title: "简历筛选通过",
    date: "2026-05-11 10:20",
    status: "completed",
    interviewer: "HR 李娜",
    note: "简历匹配度高，技术栈符合要求，邀约一面",
  },
  {
    id: 3,
    type: "interview-1",
    title: "技术一面",
    date: "2026-05-15 15:00",
    status: "completed",
    interviewer: "技术经理 王强",
    score: "A",
    note: "技术基础扎实，项目经验丰富，沟通能力强，建议进入二面",
  },
  {
    id: 4,
    type: "interview-2",
    title: "技术二面",
    date: "2026-05-22 10:00",
    status: "scheduled",
    interviewer: "技术总监 李明",
    note: "已安排视频面试，重点考察架构设计能力",
  },
];

const tabs = [
  { id: "resume", label: "简历信息" },
  { id: "timeline", label: "面试流程" },
  { id: "evaluation", label: "面试评价" },
  { id: "notes", label: "备注记录" },
];

export function CandidateDetail() {
  const { candidateId } = useParams();
  const [activeTab, setActiveTab] = useState("resume");

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/recruit/jobs" className="hover:text-gray-700">
          招聘管理
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/recruit/pipeline/job-001" className="hover:text-gray-700">
          高级前端工程师
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{candidateInfo.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/recruit/pipeline/job-001"
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          返回 Pipeline
        </Link>
      </div>

      {/* Candidate Card */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <img
              src={candidateInfo.avatar}
              alt={candidateInfo.name}
              className="w-24 h-24 rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {candidateInfo.name}
                </h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                  {candidateInfo.currentStage}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                  简历评分: {candidateInfo.resumeScore}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-gray-500">性别年龄:</span>
                  <span>
                    {candidateInfo.gender} · {candidateInfo.age}岁 ·{" "}
                    {candidateInfo.experience}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{candidateInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {candidateInfo.currentCompany} ·{" "}
                    {candidateInfo.currentPosition}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{candidateInfo.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GraduationCap className="w-4 h-4" />
                  <span>{candidateInfo.education}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{candidateInfo.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-gray-500">期望薪资: </span>
                  <span className="font-medium text-gray-900">
                    {candidateInfo.expectedSalary}
                  </span>
                </div>
                <div className="h-4 w-px bg-gray-300" />
                <div>
                  <span className="text-gray-500">当前薪资: </span>
                  <span className="font-medium text-gray-900">
                    {candidateInfo.currentSalary}
                  </span>
                </div>
                <div className="h-4 w-px bg-gray-300" />
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>投递时间: {candidateInfo.appliedDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              下载简历
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4" />
              发消息
            </button>
            <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2 text-sm font-medium">
              <Video className="w-4 h-4" />
              安排面试
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="border-b border-gray-200">
              <div className="flex gap-1 px-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-[#1E40AF] text-[#1E40AF]"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === "resume" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      教育背景
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {candidateInfo.school}
                        </span>
                        <span className="text-sm text-gray-500">
                          {candidateInfo.graduationYear} 毕业
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {candidateInfo.education}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      工作经历
                    </h3>
                    <div className="space-y-4">
                      {workHistory.map((work) => (
                        <div key={work.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">
                              {work.company} · {work.position}
                            </span>
                            <span className="text-sm text-gray-500">
                              {work.duration}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">
                            {work.period}
                          </p>
                          <p className="text-sm text-gray-600">
                            {work.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "timeline" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    面试进度
                  </h3>
                  <div className="space-y-4">
                    {interviewTimeline.map((event, index) => (
                      <div key={event.id} className="relative">
                        {index !== interviewTimeline.length - 1 && (
                          <div className="absolute left-[15px] top-8 bottom-0 w-px bg-gray-200" />
                        )}
                        <div className="flex gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              event.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : event.status === "scheduled"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {event.status === "completed" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : event.status === "scheduled" ? (
                              <Clock className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-gray-900">
                                {event.title}
                              </p>
                              {event.score && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-medium">
                                  评级: {event.score}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mb-2">
                              {event.date}
                              {event.interviewer && ` · ${event.interviewer}`}
                            </p>
                            <p className="text-sm text-gray-600">{event.note}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "evaluation" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    面试官评价
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <img
                            src="https://ui-avatars.com/api/?name=王强&background=1E40AF&color=fff"
                            alt="王强"
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              技术经理 王强
                            </p>
                            <p className="text-xs text-gray-500">
                              2026-05-15 16:30
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                          评级: A
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        候选人技术基础扎实，对 React 生态系统理解深入，项目经验丰富。在面试中展现了良好的问题分析能力和沟通能力。对性能优化有实际经验，代码质量意识强。建议进入二面，重点考察架构设计能力。
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notes" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    备注记录
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          HR 李娜
                        </span>
                        <span className="text-xs text-gray-500">
                          2026-05-11 10:30
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        已电话沟通，候选人对职位很感兴趣，确认参加技术面试
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          HR 李娜
                        </span>
                        <span className="text-xs text-gray-500">
                          2026-05-18 14:20
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        已安排 5月22日 技术二面，面试官李明
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">快速操作</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm font-medium">
                通过 - 进入下一轮
              </button>
              <button className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 text-sm font-medium">
                淘汰
              </button>
              <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium">
                标记为储备
              </button>
              <button className="w-full px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] text-sm font-medium">
                发送 Offer
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">关键信息</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">应聘职位:</span>
                  <span className="text-gray-900">高级前端工程师</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">招聘渠道:</span>
                  <span className="text-gray-900">智联招聘</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">当前状态:</span>
                  <span className="text-blue-700">
                    {candidateInfo.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">负责HR:</span>
                  <span className="text-gray-900">李娜</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
