import { useState } from "react";
import { Link, useParams } from "react-router";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  ChevronRight,
  ArrowLeft,
  Search,
  Plus,
  Upload,
  Eye,
  Calendar as CalendarIcon,
  X,
} from "lucide-react";

const stageColors = {
  submitted: "bg-blue-50",
  screened: "bg-purple-50",
  interview: "bg-orange-50",
  offer: "bg-green-50",
  hired: "bg-emerald-600 text-white",
};

const stages = [
  { id: "submitted", label: "简历投递", color: stageColors.submitted },
  { id: "screened", label: "简历筛选", color: stageColors.screened },
  { id: "interview", label: "面试中", color: stageColors.interview },
  { id: "offer", label: "Offer阶段", color: stageColors.offer },
  { id: "hired", label: "已入职", color: stageColors.hired },
];

const initialCandidates = [
  {
    id: "c001",
    name: "张伟",
    avatar: "https://ui-avatars.com/api/?name=张伟&background=1E40AF&color=fff",
    stage: "submitted",
    position: "高级前端工程师",
    currentCompany: "腾讯",
    experience: "5年",
    education: "本科",
    source: "内推",
    matchScore: 87,
  },
  {
    id: "c002",
    name: "李娜",
    avatar: "https://ui-avatars.com/api/?name=李娜&background=10B981&color=fff",
    stage: "submitted",
    position: "高级前端工程师",
    currentCompany: "字节跳动",
    experience: "4年",
    education: "硕士",
    source: "猎头",
    matchScore: 92,
  },
  {
    id: "c003",
    name: "王强",
    avatar: "https://ui-avatars.com/api/?name=王强&background=F59E0B&color=fff",
    stage: "screened",
    position: "高级前端工程师",
    currentCompany: "阿里巴巴",
    experience: "6年",
    education: "本科",
    source: "官网",
    matchScore: 90,
  },
  {
    id: "c004",
    name: "赵敏",
    avatar: "https://ui-avatars.com/api/?name=赵敏&background=8B5CF6&color=fff",
    stage: "screened",
    position: "高级前端工程师",
    currentCompany: "美团",
    experience: "5年",
    education: "本科",
    source: "招聘网站",
    matchScore: 85,
  },
  {
    id: "c005",
    name: "刘洋",
    avatar: "https://ui-avatars.com/api/?name=刘洋&background=EC4899&color=fff",
    stage: "interview",
    position: "高级前端工程师",
    currentCompany: "京东",
    experience: "7年",
    education: "硕士",
    source: "内推",
    matchScore: 94,
  },
  {
    id: "c006",
    name: "陈静",
    avatar: "https://ui-avatars.com/api/?name=陈静&background=06B6D4&color=fff",
    stage: "interview",
    position: "高级前端工程师",
    currentCompany: "百度",
    experience: "4年",
    education: "本科",
    source: "猎头",
    matchScore: 88,
  },
  {
    id: "c007",
    name: "孙磊",
    avatar: "https://ui-avatars.com/api/?name=孙磊&background=EF4444&color=fff",
    stage: "offer",
    position: "高级前端工程师",
    currentCompany: "小米",
    experience: "6年",
    education: "硕士",
    source: "内推",
    matchScore: 95,
  },
  {
    id: "c008",
    name: "周芳",
    avatar: "https://ui-avatars.com/api/?name=周芳&background=84CC16&color=fff",
    stage: "hired",
    position: "高级前端工程师",
    currentCompany: "华为",
    experience: "5年",
    education: "本科",
    source: "官网",
    matchScore: 91,
  },
  {
    id: "c009",
    name: "吴涛",
    avatar: "https://ui-avatars.com/api/?name=吴涛&background=F97316&color=fff",
    stage: "hired",
    position: "高级前端工程师",
    currentCompany: "网易",
    experience: "8年",
    education: "硕士",
    matchScore: 93,
  },
];

const sourceColors: Record<string, string> = {
  内推: "bg-blue-100 text-blue-700",
  猎头: "bg-purple-100 text-purple-700",
  官网: "bg-green-100 text-green-700",
  招聘网站: "bg-orange-100 text-orange-700",
};

interface CandidateCardProps {
  candidate: typeof initialCandidates[0];
  onMove: (candidateId: string, targetStage: string) => void;
}

function CandidateCard({ candidate, onMove }: CandidateCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "CANDIDATE",
    item: { id: candidate.id, currentStage: candidate.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-grab border border-gray-100 ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div className="flex items-start gap-3 mb-3">
        <img
          src={candidate.avatar}
          alt={candidate.name}
          className="w-12 h-12 rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <Link
            to={`/recruit/candidate/${candidate.id}`}
            className="font-medium text-gray-900 hover:text-[#1E40AF] block truncate"
          >
            {candidate.name}
          </Link>
          <p className="text-xs text-gray-500 truncate">{candidate.position}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-3">
        <div className="truncate">{candidate.currentCompany}</div>
        <div className="flex items-center justify-between text-xs">
          <span>{candidate.experience}</span>
          <span>·</span>
          <span>{candidate.education}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            sourceColors[candidate.source]
          }`}
        >
          {candidate.source}
        </span>
      </div>

      {/* Match Score Circle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#E5E7EB"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke={
                  candidate.matchScore >= 80
                    ? "#10B981"
                    : candidate.matchScore >= 60
                    ? "#F59E0B"
                    : "#EF4444"
                }
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${(candidate.matchScore / 100) * 125.6} 125.6`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`text-xs font-bold ${getMatchColor(
                  candidate.matchScore
                )}`}
              >
                {candidate.matchScore}%
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-500">匹配度</span>
        </div>

        <div className="flex items-center gap-1">
          <Link
            to={`/recruit/candidate/${candidate.id}`}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="w-4 h-4 text-gray-400" />
          </Link>
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-red-50 rounded transition-colors">
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  stage: typeof stages[0];
  candidates: typeof initialCandidates;
  onMove: (candidateId: string, targetStage: string) => void;
}

function KanbanColumn({ stage, candidates, onMove }: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop({
    accept: "CANDIDATE",
    drop: (item: { id: string; currentStage: string }) => {
      if (item.currentStage !== stage.id) {
        onMove(item.id, stage.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="flex-shrink-0 w-80">
      <div
        className={`rounded-t-lg px-4 py-3 ${stage.color} ${
          stage.id === "hired" ? "text-white" : "text-gray-700"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{stage.label}</h3>
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${
              stage.id === "hired"
                ? "bg-white/20 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {candidates.length} 人
          </span>
        </div>
      </div>
      <div
        ref={drop}
        className={`bg-gray-50 rounded-b-lg p-3 min-h-[600px] space-y-3 ${
          isOver ? "bg-blue-50 ring-2 ring-[#1E40AF]" : ""
        }`}
      >
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onMove={onMove}
          />
        ))}
      </div>
    </div>
  );
}

export function RecruitmentPipeline() {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState(initialCandidates);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");

  const handleMove = (candidateId: string, targetStage: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: targetStage } : c))
    );
  };

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch =
      searchTerm === "" ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.currentCompany.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === "all" || c.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  return (
    <DndProvider backend={HTML5Backend}>
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
          <span className="text-gray-900">高级前端工程师</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">候选人 Pipeline</span>
        </div>

        {/* Job Info Bar */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">
                  高级前端工程师
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>信息技术中心</span>
                  <span>·</span>
                  <span>HR: 李娜</span>
                  <span>·</span>
                  <span className="text-[#1E40AF] font-medium">
                    还需招聘 2 人
                  </span>
                </div>
              </div>
            </div>
            <Link
              to="/recruit/jobs"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              返回职位列表
            </Link>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索候选人姓名、公司..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                />
              </div>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="all">全部来源</option>
                <option value="猎头">猎头</option>
                <option value="内推">内推</option>
                <option value="官网">官网</option>
                <option value="招聘网站">招聘网站</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                <Upload className="w-4 h-4" />
                批量导入
              </button>
              <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2 text-sm font-medium">
                <Plus className="w-4 h-4" />
                添加候选人
              </button>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {stages.map((stage) => (
              <KanbanColumn
                key={stage.id}
                stage={stage}
                candidates={filteredCandidates.filter(
                  (c) => c.stage === stage.id
                )}
                onMove={handleMove}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
