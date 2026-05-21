import { useState, Fragment } from "react";
import { Link } from "react-router";
import {
  ChevronDown,
  ChevronRight,
  Download,
  Star,
  CheckCircle,
  Clock,
} from "lucide-react";
import { PerformanceNav } from "./PerformanceNav";

const teamMembers = [
  {
    id: "emp-001",
    name: "张伟",
    avatar: "https://ui-avatars.com/api/?name=张伟&background=1E40AF&color=fff",
    position: "前端工程师",
    selfScore: 4.5,
    managerScore: 0,
    status: "待评估",
    statusColor: "bg-yellow-100 text-yellow-700",
    objectives: [
      { title: "完成XX模块开发", completion: 95 },
      { title: "代码质量优化", completion: 88 },
    ],
    selfComment: "本季度完成了招聘模块的开发工作，并优化了系统性能。",
  },
  {
    id: "emp-002",
    name: "李娜",
    avatar: "https://ui-avatars.com/api/?name=李娜&background=10B981&color=fff",
    position: "产品经理",
    selfScore: 4.0,
    managerScore: 4.5,
    status: "已评估",
    statusColor: "bg-green-100 text-green-700",
    objectives: [
      { title: "产品需求分析", completion: 100 },
      { title: "用户调研", completion: 90 },
    ],
    selfComment: "完成了多个产品迭代，用户满意度显著提升。",
    managerComment: "工作认真负责，产品思维清晰，团队协作能力强。",
  },
  {
    id: "emp-003",
    name: "王强",
    avatar: "https://ui-avatars.com/api/?name=王强&background=F59E0B&color=fff",
    position: "后端工程师",
    selfScore: 4.0,
    managerScore: 0,
    status: "待评估",
    statusColor: "bg-yellow-100 text-yellow-700",
    objectives: [
      { title: "API接口开发", completion: 100 },
      { title: "性能优化", completion: 85 },
    ],
    selfComment: "完成了核心业务API的开发，系统性能提升明显。",
  },
  {
    id: "emp-004",
    name: "赵敏",
    avatar: "https://ui-avatars.com/api/?name=赵敏&background=8B5CF6&color=fff",
    position: "UI设计师",
    selfScore: 4.5,
    managerScore: 0,
    status: "待评估",
    statusColor: "bg-yellow-100 text-yellow-700",
    objectives: [
      { title: "界面设计优化", completion: 100 },
      { title: "设计规范建立", completion: 95 },
    ],
    selfComment: "完善了设计系统，提升了产品视觉体验。",
  },
  {
    id: "emp-005",
    name: "刘洋",
    avatar: "https://ui-avatars.com/api/?name=刘洋&background=EC4899&color=fff",
    position: "测试工程师",
    selfScore: 3.5,
    managerScore: 0,
    status: "待评估",
    statusColor: "bg-yellow-100 text-yellow-700",
    objectives: [
      { title: "测试用例编写", completion: 90 },
      { title: "自动化测试", completion: 75 },
    ],
    selfComment: "完成了核心功能的测试，发现并修复了多个重要缺陷。",
  },
  {
    id: "emp-006",
    name: "陈静",
    avatar: "https://ui-avatars.com/api/?name=陈静&background=06B6D4&color=fff",
    position: "前端工程师",
    selfScore: 4.0,
    managerScore: 4.0,
    status: "已评估",
    statusColor: "bg-green-100 text-green-700",
    objectives: [
      { title: "组件库开发", completion: 100 },
      { title: "性能优化", completion: 88 },
    ],
    selfComment: "完善了前端组件库，提升了开发效率。",
    managerComment: "技术能力强，工作态度积极，是团队的骨干力量。",
  },
  {
    id: "emp-007",
    name: "孙磊",
    avatar: "https://ui-avatars.com/api/?name=孙磊&background=EF4444&color=fff",
    position: "数据分析师",
    selfScore: 4.5,
    managerScore: 0,
    status: "待评估",
    statusColor: "bg-yellow-100 text-yellow-700",
    objectives: [
      { title: "数据报表开发", completion: 100 },
      { title: "用户行为分析", completion: 92 },
    ],
    selfComment: "建立了完整的数据分析体系，为产品决策提供有力支持。",
  },
  {
    id: "emp-008",
    name: "周芳",
    avatar: "https://ui-avatars.com/api/?name=周芳&background=84CC16&color=fff",
    position: "运营专员",
    selfScore: 4.0,
    managerScore: 0,
    status: "待提交",
    statusColor: "bg-gray-100 text-gray-700",
    objectives: [
      { title: "用户增长", completion: 95 },
      { title: "活动策划", completion: 88 },
    ],
    selfComment: "",
  },
  {
    id: "emp-009",
    name: "吴涛",
    avatar: "https://ui-avatars.com/api/?name=吴涛&background=F97316&color=fff",
    position: "架构师",
    selfScore: 5.0,
    managerScore: 0,
    status: "待评估",
    statusColor: "bg-yellow-100 text-yellow-700",
    objectives: [
      { title: "系统架构优化", completion: 100 },
      { title: "技术方案评审", completion: 100 },
    ],
    selfComment: "完成了系统架构升级，提升了系统可扩展性和稳定性。",
  },
  {
    id: "emp-010",
    name: "郑强",
    avatar: "https://ui-avatars.com/api/?name=郑强&background=6B7280&color=fff",
    position: "前端工程师",
    selfScore: 3.5,
    managerScore: 0,
    status: "待评估",
    statusColor: "bg-yellow-100 text-yellow-700",
    objectives: [
      { title: "功能开发", completion: 85 },
      { title: "Bug修复", completion: 90 },
    ],
    selfComment: "完成了分配的开发任务，需要继续提升技术能力。",
  },
  {
    id: "emp-011",
    name: "林雪",
    avatar: "https://ui-avatars.com/api/?name=林雪&background=EC4899&color=fff",
    position: "产品经理",
    selfScore: 4.5,
    managerScore: 0,
    status: "待评估",
    statusColor: "bg-yellow-100 text-yellow-700",
    objectives: [
      { title: "产品规划", completion: 100 },
      { title: "竞品分析", completion: 95 },
    ],
    selfComment: "制定了清晰的产品路线图，推动了多个重要功能上线。",
  },
  {
    id: "emp-012",
    name: "马超",
    avatar: "https://ui-avatars.com/api/?name=马超&background=10B981&color=fff",
    position: "后端工程师",
    selfScore: 4.0,
    managerScore: 0,
    status: "待评估",
    statusColor: "bg-yellow-100 text-yellow-700",
    objectives: [
      { title: "服务开发", completion: 100 },
      { title: "数据库优化", completion: 88 },
    ],
    selfComment: "完成了核心服务的开发，优化了数据库查询性能。",
  },
];

export function TeamPerformance() {
  const [members, setMembers] = useState(teamMembers);
  const [department, setDepartment] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const pendingCount = members.filter((m) => m.status === "待评估").length;

  const handleScoreChange = (memberId: string, score: number) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId ? { ...m, managerScore: score } : m
      )
    );
  };

  const handleCommentChange = (memberId: string, comment: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId ? { ...m, managerComment: comment } : m
      )
    );
  };

  const calculateFinalScore = (selfScore: number, managerScore: number) => {
    if (managerScore === 0) return 0;
    return (selfScore * 0.3 + managerScore * 0.7).toFixed(1);
  };

  const filteredMembers = members.filter((m) => {
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    return matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/performance/team" className="hover:text-gray-700">
          绩效管理
        </Link>
        <span>/</span>
        <span className="text-gray-900">团队绩效</span>
      </div>

      {/* Navigation Tabs */}
      <PerformanceNav />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">团队绩效</h1>
      </div>

      {/* Cycle Info Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-6 text-sm">
          <span className="font-medium text-gray-900">2026 Q1 季度考核</span>
          <span className="text-gray-600">我的团队 12 人</span>
          <span className="text-yellow-600 font-medium">
            待我评估 {pendingCount} 人
          </span>
        </div>
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
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
            >
              <option value="all">全部状态</option>
              <option value="待评估">待评估</option>
              <option value="已评估">已评估</option>
              <option value="待提交">待提交</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              导出评估表
            </button>
          </div>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left w-8">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMembers(members.map((m) => m.id));
                    } else {
                      setSelectedMembers([]);
                    }
                  }}
                />
              </th>
              <th className="px-4 py-3 text-left w-8"></th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                姓名
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                岗位
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                自评分
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                我的评分
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                综合得分
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <Fragment key={member.id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setExpandedMember(
                      expandedMember === member.id ? null : member.id
                    )
                  }
                >
                  <td
                    className="px-4 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedMembers.includes(member.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMembers([...selectedMembers, member.id]);
                        } else {
                          setSelectedMembers(
                            selectedMembers.filter((id) => id !== member.id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <ChevronRight
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        expandedMember === member.id ? "rotate-90" : ""
                      }`}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {member.position}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(member.selfScore)
                              ? "fill-yellow-400 text-yellow-400"
                              : i < member.selfScore
                              ? "fill-yellow-200 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td
                    className="px-4 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            handleScoreChange(member.id, rating)
                          }
                          className="hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              rating <= member.managerScore
                                ? "fill-blue-400 text-blue-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium text-gray-900 tabular-nums">
                      {member.managerScore > 0
                        ? calculateFinalScore(
                            member.selfScore,
                            member.managerScore
                          )
                        : "-"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${member.statusColor}`}
                    >
                      {member.status}
                    </span>
                  </td>
                </tr>
                {expandedMember === member.id && (
                  <tr>
                    <td colSpan={8} className="px-4 py-4 bg-gray-50">
                      <div className="ml-12 space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            目标完成情况
                          </h4>
                          <div className="space-y-2">
                            {member.objectives.map((obj, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 w-40">
                                  {obj.title}
                                </span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                                  <div
                                    className="bg-[#1E40AF] h-2 rounded-full"
                                    style={{ width: `${obj.completion}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600 tabular-nums w-12">
                                  {obj.completion}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            自评说明
                          </h4>
                          <p className="text-sm text-gray-600">
                            {member.selfComment || "暂无"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            评语 <span className="text-red-500">*</span>
                          </h4>
                          <textarea
                            value={member.managerComment || ""}
                            onChange={(e) =>
                              handleCommentChange(member.id, e.target.value)
                            }
                            placeholder="请输入评语..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none"
                            rows={3}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-end">
          <button
            disabled={
              members.filter((m) => m.managerScore > 0 && !m.managerComment)
                .length > 0
            }
            className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            批量提交评估
          </button>
        </div>
      </div>
    </div>
  );
}
