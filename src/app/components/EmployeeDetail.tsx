import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Edit,
  UserPlus,
  UserX,
  ChevronRight,
  Calendar,
  Briefcase,
  TrendingUp,
  Award,
} from "lucide-react";

const tabs = [
  { id: "basic", label: "基本信息" },
  { id: "career", label: "职业履历" },
  { id: "contract", label: "合同薪酬" },
  { id: "education", label: "教育培训" },
  { id: "performance", label: "绩效记录" },
  { id: "attendance", label: "考勤假期" },
  { id: "family", label: "家庭成员" },
];

const employeeData = {
  id: "1",
  name: "张伟",
  employeeId: "INSP202401234",
  department: "信息技术中心",
  position: "高级开发工程师",
  avatar: "https://ui-avatars.com/api/?name=张伟&background=1E40AF&color=fff&size=128",
  status: "在职",
  email: "zhangwei@company.com",
  phone: "138-0013-8888",
  manager: "李明 - 技术总监",
  hireDate: "2022-03-15",
};

const basicInfo = {
  姓名: "张伟",
  性别: "男",
  身份证: "110101199001011234",
  出生日期: "1990-01-01",
  民族: "汉族",
  籍贯: "北京市海淀区",
  联系电话: "138-0013-8888",
  邮箱: "zhangwei@company.com",
  紧急联系人: "李梅（配偶）- 139-1234-5678",
  居住地址: "北京市海淀区中关村大街1号院2号楼301室",
};

const timeline = [
  {
    date: "2024-12-15",
    type: "晋升",
    title: "晋升为高级开发工程师",
    description: "年度绩效考核优秀，技术能力突出，晋升为高级开发工程师",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600",
  },
  {
    date: "2023-06-20",
    type: "调岗",
    title: "调至信息技术中心",
    description: "从产品研发部调至信息技术中心，负责核心系统开发",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-600",
  },
  {
    date: "2022-09-15",
    type: "转正",
    title: "试用期转正",
    description: "试用期表现优异，顺利通过转正考核",
    icon: Award,
    color: "bg-green-100 text-green-600",
  },
  {
    date: "2022-03-15",
    type: "入职",
    title: "加入公司",
    description: "以开发工程师身份入职产品研发部",
    icon: UserPlus,
    color: "bg-amber-100 text-amber-600",
  },
];

export function EmployeeDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">
            首页
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/employees" className="hover:text-gray-700">
            员工档案
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{employeeData.name}</span>
        </div>
      </div>

      {/* Back Button */}
      <Link
        to="/employees"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        返回列表
      </Link>

      {/* Employee Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <img
              src={employeeData.avatar}
              alt={employeeData.name}
              className="w-24 h-24 rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {employeeData.name}
                </h1>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                  {employeeData.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {employeeData.department} · {employeeData.position}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{employeeData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">工号：</span>
                  <span className="tabular-nums">{employeeData.employeeId}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="tabular-nums">{employeeData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">直属上级：</span>
                  <span>{employeeData.manager}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>入职于 {employeeData.hireDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Edit className="w-4 h-4" />
              编辑
            </button>
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              调岗
            </button>
            <button className="px-4 py-2 text-sm text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 flex items-center gap-2">
              <UserX className="w-4 h-4" />
              办理离职
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="col-span-3">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
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

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "basic" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    个人基本信息
                  </h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    {Object.entries(basicInfo).map(([key, value]) => (
                      <div key={key} className="flex items-start">
                        <span className="text-sm text-gray-500 w-24 flex-shrink-0">
                          {key}
                        </span>
                        <span className="text-sm text-gray-900 flex-1">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "career" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    职业发展历程
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          高级开发工程师
                        </span>
                        <span className="text-sm text-gray-500 tabular-nums">
                          2024.12 - 至今
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">信息技术中心</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          开发工程师
                        </span>
                        <span className="text-sm text-gray-500 tabular-nums">
                          2023.06 - 2024.12
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">信息技术中心</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          开发工程师
                        </span>
                        <span className="text-sm text-gray-500 tabular-nums">
                          2022.03 - 2023.06
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">产品研发部</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "contract" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    合同与薪酬信息
                  </h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    <div className="flex items-start">
                      <span className="text-sm text-gray-500 w-24 flex-shrink-0">
                        合同类型
                      </span>
                      <span className="text-sm text-gray-900">固定期限劳动合同</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm text-gray-500 w-24 flex-shrink-0">
                        合同期限
                      </span>
                      <span className="text-sm text-gray-900 tabular-nums">
                        2022-03-15 至 2025-03-14
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm text-gray-500 w-24 flex-shrink-0">
                        签订次数
                      </span>
                      <span className="text-sm text-gray-900">第 1 次</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm text-gray-500 w-24 flex-shrink-0">
                        薪酬等级
                      </span>
                      <span className="text-sm text-gray-900">P6</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "education" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">教育背景</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          北京大学 · 计算机科学与技术
                        </span>
                        <span className="text-sm text-gray-500 tabular-nums">
                          2008-09 至 2012-06
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">本科 · 学士学位</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "performance" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">绩效考核</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          2024 年度绩效
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded">
                          优秀 A
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        综合评分：95分 · 排名：3/45
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          2023 年度绩效
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded">
                          良好 B
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        综合评分：88分 · 排名：12/42
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "attendance" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">
                    本年度考勤统计
                  </h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-900 mb-1">
                        98.5%
                      </p>
                      <p className="text-sm text-gray-500">出勤率</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-900 mb-1">5天</p>
                      <p className="text-sm text-gray-500">年假剩余</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-900 mb-1">2天</p>
                      <p className="text-sm text-gray-500">病假已用</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-900 mb-1">1次</p>
                      <p className="text-sm text-gray-500">迟到次数</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "family" && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">家庭成员</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">姓名</p>
                          <p className="text-sm text-gray-900">李梅</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">关系</p>
                          <p className="text-sm text-gray-900">配偶</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">联系电话</p>
                          <p className="text-sm text-gray-900 tabular-nums">
                            139-1234-5678
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Timeline */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">职业时间轴</h3>
            <div className="space-y-4">
              {timeline.map((event, index) => (
                <div key={index} className="relative">
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-0 w-px bg-gray-200" />
                  )}
                  <div className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${event.color}`}
                    >
                      <event.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-xs text-gray-500 mb-1 tabular-nums">
                        {event.date}
                      </p>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
