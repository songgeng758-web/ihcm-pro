import { useState } from "react";
import { Link } from "react-router";
import {
  Building2,
  Users,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  Search,
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const kpiData = [
  { id: "level1", title: "一级部门", value: "8", icon: Building2, color: "bg-blue-50 text-blue-600" },
  { id: "level2", title: "二级部门", value: "32", icon: Building2, color: "bg-purple-50 text-purple-600" },
  { id: "staff", title: "在编人数", value: "5,847", icon: Users, color: "bg-green-50 text-green-600" },
  { id: "usage", title: "编制使用率", value: "92.4%", icon: TrendingUp, color: "bg-orange-50 text-orange-600" },
];

const orgTree = [
  {
    id: "root",
    name: "郑州浪潮信息技术有限公司",
    count: 5847,
    level: 0,
    expanded: true,
    children: [
      { id: "gm", name: "总经理办公室", count: 12, level: 1, expanded: false },
      {
        id: "it",
        name: "信息技术中心",
        count: 876,
        level: 1,
        expanded: true,
        children: [
          { id: "dev", name: "研发部", count: 456, level: 2 },
          { id: "test", name: "测试部", count: 123, level: 2 },
          { id: "ops", name: "运维部", count: 89, level: 2 },
          { id: "arch", name: "架构组", count: 208, level: 2 },
        ],
      },
      { id: "marketing", name: "市场营销部", count: 642, level: 1, expanded: false },
      { id: "hr", name: "人力资源部", count: 89, level: 1, expanded: false },
      { id: "finance", name: "财务管理部", count: 478, level: 1, expanded: false },
      { id: "operation", name: "运营管理部", count: 412, level: 1, expanded: false },
      { id: "product", name: "产品研发部", count: 387, level: 1, expanded: false },
      { id: "service", name: "客户服务部", count: 356, level: 1, expanded: false },
    ],
  },
];

const selectedDept = {
  id: "it",
  name: "信息技术中心",
  code: "IT-001",
  leader: {
    name: "王强",
    avatar: "https://ui-avatars.com/api/?name=王强&background=1E40AF&color=fff",
  },
  quota: 950,
  actual: 876,
  usage: 92.2,
  description: "负责公司信息化系统建设、技术研发、系统运维等核心技术工作。",
  parent: "郑州浪潮信息技术有限公司",
  created: "2018-03-15",
  level: "一级部门",
};

const genderData = [
  { name: "男", value: 612, color: "#1E40AF" },
  { name: "女", value: 264, color: "#EC4899" },
];

const levelData = [
  { level: "P1-P2", count: 156 },
  { level: "P3-P4", count: 312 },
  { level: "P5-P6", count: 289 },
  { level: "P7-P8", count: 98 },
  { level: "P9+", count: 21 },
];

const eduData = [
  { edu: "博士", count: 23 },
  { edu: "硕士", count: 234 },
  { edu: "本科", count: 512 },
  { edu: "专科", count: 107 },
];

const members = [
  {
    id: 1,
    name: "张伟",
    avatar: "https://ui-avatars.com/api/?name=张伟&background=1E40AF&color=fff",
    position: "高级开发工程师",
    level: "P6",
    joinDate: "2020-03-15",
  },
  {
    id: 2,
    name: "李娜",
    avatar: "https://ui-avatars.com/api/?name=李娜&background=EC4899&color=fff",
    position: "架构师",
    level: "P8",
    joinDate: "2018-07-22",
  },
  {
    id: 3,
    name: "王强",
    avatar: "https://ui-avatars.com/api/?name=王强&background=10B981&color=fff",
    position: "测试工程师",
    level: "P5",
    joinDate: "2021-05-10",
  },
  {
    id: 4,
    name: "刘洋",
    avatar: "https://ui-avatars.com/api/?name=刘洋&background=F59E0B&color=fff",
    position: "运维工程师",
    level: "P4",
    joinDate: "2022-01-08",
  },
  {
    id: 5,
    name: "陈静",
    avatar: "https://ui-avatars.com/api/?name=陈静&background=8B5CF6&color=fff",
    position: "前端工程师",
    level: "P5",
    joinDate: "2021-09-12",
  },
  {
    id: 6,
    name: "赵敏",
    avatar: "https://ui-avatars.com/api/?name=赵敏&background=EF4444&color=fff",
    position: "后端工程师",
    level: "P6",
    joinDate: "2020-11-20",
  },
  {
    id: 7,
    name: "孙华",
    avatar: "https://ui-avatars.com/api/?name=孙华&background=3B82F6&color=fff",
    position: "技术经理",
    level: "P7",
    joinDate: "2019-04-18",
  },
  {
    id: 8,
    name: "周杰",
    avatar: "https://ui-avatars.com/api/?name=周杰&background=059669&color=fff",
    position: "开发工程师",
    level: "P4",
    joinDate: "2022-08-03",
  },
  {
    id: 9,
    name: "吴涛",
    avatar: "https://ui-avatars.com/api/?name=吴涛&background=DC2626&color=fff",
    position: "系统架构师",
    level: "P8",
    joinDate: "2017-12-01",
  },
  {
    id: 10,
    name: "郑雯",
    avatar: "https://ui-avatars.com/api/?name=郑雯&background=7C3AED&color=fff",
    position: "产品经理",
    level: "P6",
    joinDate: "2021-02-25",
  },
];

export function OrgStructure() {
  const [expandedNodes, setExpandedNodes] = useState(["root", "it"]);
  const [selectedNode, setSelectedNode] = useState("it");

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const renderTreeNode = (node: any, depth: number = 0) => {
    const isExpanded = expandedNodes.includes(node.id);
    const isSelected = selectedNode === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
            isSelected ? "bg-blue-50 border border-blue-200" : ""
          }`}
          style={{ marginLeft: `${depth * 20}px` }}
          onClick={() => setSelectedNode(node.id)}
        >
          {hasChildren && (
            <button onClick={(e) => { e.stopPropagation(); toggleNode(node.id); }} className="p-0.5">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-5" />}
          <Building2 className="w-4 h-4 text-gray-600" />
          <span className="flex-1 text-sm text-gray-900">{node.name}</span>
          <span className="text-xs text-gray-500">({node.count})</span>

          {isSelected && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
              <button className="p-1 hover:bg-blue-100 rounded">
                <Plus className="w-3 h-3 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-blue-100 rounded">
                <Edit className="w-3 h-3 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-red-100 rounded">
                <Trash2 className="w-3 h-3 text-red-600" />
              </button>
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child: any) => renderTreeNode(child, depth + 1))}
          </div>
        )}
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
        <Link to="/org/structure" className="hover:text-gray-700">
          核心人事
        </Link>
        <span>/</span>
        <span className="text-gray-900">组织管理</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">组织管理</h1>
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
              <p className="text-2xl font-bold text-gray-900 tabular-nums">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left - Org Tree */}
        <div className="col-span-2 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">组织架构树</h3>
            <button className="px-3 py-1.5 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] flex items-center gap-1 text-sm">
              <Plus className="w-4 h-4" />
              新增一级部门
            </button>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索部门..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
            </div>
          </div>

          <div className="space-y-1 max-h-[600px] overflow-y-auto">
            {orgTree.map((node) => renderTreeNode(node))}
          </div>
        </div>

        {/* Right - Department Details */}
        <div className="col-span-3 space-y-4">
          {/* Basic Info */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{selectedDept.name}</h3>
                <span className="text-sm text-gray-500">部门编号：{selectedDept.code}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  编辑
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedDept.leader.avatar}
                    alt={selectedDept.leader.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-xs text-gray-500">部门负责人</p>
                    <p className="font-medium text-gray-900">{selectedDept.leader.name}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">编制情况</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">{selectedDept.actual}</span>
                    <span className="text-sm text-gray-500">/ {selectedDept.quota} 人</span>
                    <span className="text-sm font-medium text-green-600">{selectedDept.usage}%</span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${selectedDept.usage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">上级部门</span>
                  <span className="text-gray-900">{selectedDept.parent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">部门级别</span>
                  <span className="text-gray-900">{selectedDept.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">创建时间</span>
                  <span className="text-gray-900">{selectedDept.created}</span>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">部门简介</p>
                  <p className="text-gray-900">{selectedDept.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3 text-sm">性别分布</h4>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={genderData} dataKey="value" cx="50%" cy="50%" outerRadius={50}>
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-4 mt-2">
                {genderData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-gray-600">
                      {item.name} {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3 text-sm">职级分布</h4>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={levelData}>
                  <XAxis dataKey="level" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3 text-sm">学历分布</h4>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={eduData}>
                  <XAxis dataKey="edu" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Members */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">部门成员</h3>
              <Link to="/employees" className="text-sm text-[#1E40AF] hover:text-[#1E3A8A]">
                查看全部 {selectedDept.actual} 人 →
              </Link>
            </div>

            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">员工</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">岗位</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">职级</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">入职日期</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                        <span className="font-medium text-gray-900 text-sm">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{member.position}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {member.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{member.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
