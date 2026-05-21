import { useState } from "react";
import { Link } from "react-router";
import { BookOpen, Plus, Users, TrendingUp, Star, Clock, Search } from "lucide-react";

const kpiData = [
  {
    id: "courses",
    title: "在线课程",
    value: "156",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "new",
    title: "本月新增",
    value: "8",
    icon: Plus,
    color: "bg-green-50 text-green-600",
  },
  {
    id: "learners",
    title: "总学习人次",
    value: "12,458",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "completion",
    title: "平均完课率",
    value: "73.2%",
    icon: TrendingUp,
    color: "bg-orange-50 text-orange-600",
  },
];

const categories = [
  { id: "all", label: "全部", count: 156 },
  { id: "general", label: "通用技能", count: 45 },
  { id: "tech", label: "专业技术", count: 38 },
  { id: "management", label: "管理领导力", count: 28 },
  { id: "compliance", label: "合规培训", count: 25 },
  { id: "culture", label: "文化建设", count: 20 },
];

const courses = [
  {
    id: 1,
    title: "新员工入职必读",
    category: "通用技能",
    categoryColor: "bg-blue-500",
    instructor: "王讲师",
    duration: "45 分钟",
    learners: 1234,
    completion: 98.5,
    rating: 4.9,
    required: true,
  },
  {
    id: 2,
    title: "Python 数据分析进阶",
    category: "专业技术",
    categoryColor: "bg-purple-500",
    instructor: "李讲师",
    duration: "4 小时",
    learners: 567,
    completion: 68.3,
    rating: 4.8,
    required: false,
  },
  {
    id: 3,
    title: "如何成为优秀的中层管理者",
    category: "管理领导力",
    categoryColor: "bg-orange-500",
    instructor: "张讲师",
    duration: "6 小时",
    learners: 234,
    completion: 72.1,
    rating: 4.7,
    required: false,
  },
  {
    id: 4,
    title: "数据安全与合规",
    category: "合规培训",
    categoryColor: "bg-green-500",
    instructor: "赵讲师",
    duration: "30 分钟",
    learners: 5847,
    completion: 100,
    rating: 4.6,
    required: true,
  },
  {
    id: 5,
    title: "浪潮企业文化",
    category: "文化建设",
    categoryColor: "bg-pink-500",
    instructor: "刘讲师",
    duration: "1 小时",
    learners: 5847,
    completion: 99.8,
    rating: 4.9,
    required: true,
  },
  {
    id: 6,
    title: "高效沟通技巧",
    category: "通用技能",
    categoryColor: "bg-blue-500",
    instructor: "陈讲师",
    duration: "2 小时",
    learners: 892,
    completion: 75.4,
    rating: 4.5,
  },
  {
    id: 7,
    title: "前端性能优化实战",
    category: "专业技术",
    categoryColor: "bg-purple-500",
    instructor: "周讲师",
    duration: "3 小时",
    learners: 423,
    completion: 65.2,
    rating: 4.8,
  },
  {
    id: 8,
    title: "团队建设与激励",
    category: "管理领导力",
    categoryColor: "bg-orange-500",
    instructor: "孙讲师",
    duration: "4 小时",
    learners: 189,
    completion: 70.3,
    rating: 4.6,
  },
  {
    id: 9,
    title: "信息安全意识培训",
    category: "合规培训",
    categoryColor: "bg-green-500",
    instructor: "吴讲师",
    duration: "45 分钟",
    learners: 5847,
    completion: 98.2,
    rating: 4.5,
    required: true,
  },
  {
    id: 10,
    title: "职场礼仪与商务沟通",
    category: "通用技能",
    categoryColor: "bg-blue-500",
    instructor: "郑讲师",
    duration: "1.5 小时",
    learners: 756,
    completion: 78.9,
    rating: 4.7,
  },
  {
    id: 11,
    title: "云原生架构设计",
    category: "专业技术",
    categoryColor: "bg-purple-500",
    instructor: "钱讲师",
    duration: "5 小时",
    learners: 312,
    completion: 62.5,
    rating: 4.9,
  },
  {
    id: 12,
    title: "目标管理与绩效考核",
    category: "管理领导力",
    categoryColor: "bg-orange-500",
    instructor: "徐讲师",
    duration: "3 小时",
    learners: 267,
    completion: 69.8,
    rating: 4.6,
  },
];

export function Training() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/talent/training" className="hover:text-gray-700">
          人才管理
        </Link>
        <span>/</span>
        <span className="text-gray-900">培训管理</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">培训管理</h1>
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

      {/* Action Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#1E40AF] text-white"
                    : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {cat.label}
                <span className="ml-2 text-xs opacity-80">({cat.count})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索课程..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] w-64"
              />
            </div>
            <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2 text-sm font-medium">
              <Plus className="w-4 h-4" />
              新增课程
            </button>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-4 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
          >
            {/* Cover */}
            <div className="relative">
              <div
                className={`${course.categoryColor} h-32 flex items-center justify-center`}
              >
                <BookOpen className="w-12 h-12 text-white opacity-80" />
              </div>
              {course.required && (
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                    必修
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
                {course.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span>{course.instructor}</span>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{course.learners.toLocaleString()} 人学习</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{course.completion}%</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                <span className="font-semibold text-gray-900">{course.rating}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
              <button className="w-full px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] text-sm font-medium">
                开始学习
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          上一页
        </button>
        <button className="px-3 py-1.5 bg-[#1E40AF] text-white rounded-lg text-sm">1</button>
        <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          2
        </button>
        <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          3
        </button>
        <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
          下一页
        </button>
      </div>
    </div>
  );
}
