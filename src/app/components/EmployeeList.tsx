import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  hireDate: string;
  status: "在职" | "试用" | "离职";
  avatar: string;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "张伟",
    employeeId: "INSP202401234",
    department: "信息技术中心",
    position: "高级开发工程师",
    hireDate: "2022-03-15",
    status: "在职",
    avatar: "https://ui-avatars.com/api/?name=张伟&background=1E40AF&color=fff",
  },
  {
    id: "2",
    name: "李娜",
    employeeId: "INSP202401235",
    department: "市场营销部",
    position: "市场经理",
    hireDate: "2021-07-22",
    status: "在职",
    avatar: "https://ui-avatars.com/api/?name=李娜&background=10B981&color=fff",
  },
  {
    id: "3",
    name: "王强",
    employeeId: "INSP202401236",
    department: "人力资源部",
    position: "招聘专员",
    hireDate: "2023-11-05",
    status: "试用",
    avatar: "https://ui-avatars.com/api/?name=王强&background=F59E0B&color=fff",
  },
  {
    id: "4",
    name: "刘洋",
    employeeId: "INSP202401237",
    department: "财务管理部",
    position: "财务分析师",
    hireDate: "2020-05-18",
    status: "在职",
    avatar: "https://ui-avatars.com/api/?name=刘洋&background=8B5CF6&color=fff",
  },
  {
    id: "5",
    name: "陈静",
    employeeId: "INSP202401238",
    department: "运营管理部",
    position: "运营总监",
    hireDate: "2019-02-14",
    status: "在职",
    avatar: "https://ui-avatars.com/api/?name=陈静&background=EC4899&color=fff",
  },
  {
    id: "6",
    name: "赵敏",
    employeeId: "INSP202401239",
    department: "产品研发部",
    position: "产品经理",
    hireDate: "2022-09-08",
    status: "在职",
    avatar: "https://ui-avatars.com/api/?name=赵敏&background=06B6D4&color=fff",
  },
  {
    id: "7",
    name: "孙磊",
    employeeId: "INSP202401240",
    department: "客户服务部",
    position: "客服主管",
    hireDate: "2023-01-20",
    status: "试用",
    avatar: "https://ui-avatars.com/api/?name=孙磊&background=EF4444&color=fff",
  },
  {
    id: "8",
    name: "周芳",
    employeeId: "INSP202401241",
    department: "供应链部",
    position: "采购专员",
    hireDate: "2021-12-11",
    status: "在职",
    avatar: "https://ui-avatars.com/api/?name=周芳&background=84CC16&color=fff",
  },
  {
    id: "9",
    name: "吴涛",
    employeeId: "INSP202401242",
    department: "法务合规部",
    position: "法务顾问",
    hireDate: "2018-08-25",
    status: "离职",
    avatar: "https://ui-avatars.com/api/?name=吴涛&background=6B7280&color=fff",
  },
  {
    id: "10",
    name: "郑秀",
    employeeId: "INSP202401243",
    department: "行政管理部",
    position: "行政专员",
    hireDate: "2023-06-30",
    status: "试用",
    avatar:
      "https://ui-avatars.com/api/?name=郑秀&background=F97316&color=fff",
  },
];

const statusConfig = {
  在职: "bg-green-100 text-green-700",
  试用: "bg-yellow-100 text-yellow-700",
  离职: "bg-gray-100 text-gray-700",
};

export function EmployeeList() {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 585; // 5847 / 10

  const toggleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map((e) => e.id));
    }
  };

  const toggleSelectEmployee = (id: string) => {
    setSelectedEmployees((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>核心人事</span>
          <span>/</span>
          <span className="text-gray-900">员工档案</span>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">员工档案</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
          <div className="grid grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                部门
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
                <option>全部部门</option>
                <option>信息技术中心</option>
                <option>市场营销部</option>
                <option>人力资源部</option>
                <option>财务管理部</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                岗位
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
                <option>全部岗位</option>
                <option>技术类</option>
                <option>管理类</option>
                <option>职能类</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                状态
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
                <option>全部状态</option>
                <option>在职</option>
                <option>试用</option>
                <option>离职</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                入职日期
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                关键词
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索姓名、工号"
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              导入
            </button>
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              导出
            </button>
          </div>
          <button className="px-4 py-2 text-sm text-white bg-[#1E40AF] rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2">
            <Plus className="w-4 h-4" />
            新增员工
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === employees.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-[#1E40AF] border-gray-300 rounded focus:ring-[#1E40AF]"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  姓名
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  工号
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  部门
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  岗位
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  入职日期
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={() => toggleSelectEmployee(employee.id)}
                      className="w-4 h-4 text-[#1E40AF] border-gray-300 rounded focus:ring-[#1E40AF]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 tabular-nums">
                    {employee.employeeId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {employee.department}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {employee.position}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 tabular-nums">
                    {employee.hireDate}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                        statusConfig[employee.status]
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/employees/${employee.id}`}
                        className="p-1.5 text-gray-600 hover:text-[#1E40AF] hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 text-gray-600 hover:text-[#1E40AF] hover:bg-blue-50 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            共 <span className="font-medium text-gray-900">5,847</span> 条记录
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1">
              {[1, 2, 3, "...", totalPages - 1, totalPages].map(
                (page, index) => (
                  <button
                    key={`page-${page}-${index}`}
                    onClick={() =>
                      typeof page === "number" && setCurrentPage(page)
                    }
                    disabled={page === "..."}
                    className={`min-w-[32px] h-8 px-2 text-sm rounded ${
                      currentPage === page
                        ? "bg-[#1E40AF] text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    } ${page === "..." ? "cursor-default" : ""}`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
