import { useState, Fragment } from "react";
import { Link } from "react-router";
import {
  DollarSign,
  Users,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  EyeOff,
  Upload,
  RefreshCw,
  Download,
  TrendingUp,
} from "lucide-react";
import { PayrollNav } from "./PayrollNav";

const kpiData = [
  {
    id: "total",
    title: "本月应发总额",
    value: 18562400,
    icon: DollarSign,
    color: "bg-blue-50 text-blue-600",
    sensitive: true,
  },
  {
    id: "count",
    title: "核算员工数",
    value: 5847,
    icon: Users,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "completed",
    title: "已核算",
    value: 5823,
    icon: CheckCircle,
    color: "bg-green-50 text-green-600",
  },
  {
    id: "exceptions",
    title: "异常待处理",
    value: 24,
    icon: AlertCircle,
    color: "bg-red-50 text-red-600",
  },
  {
    id: "days",
    title: "距发薪日",
    value: "3 天",
    icon: Clock,
    color: "bg-orange-50 text-orange-600",
  },
];

const payrollData = [
  {
    id: "emp-001",
    employeeId: "INSP202401234",
    name: "张伟",
    department: "信息技术中心",
    position: "高级开发",
    grossPay: 28500,
    insurance: 3420,
    tax: 1860,
    netPay: 23220,
    status: "已核算",
    statusColor: "bg-green-100 text-green-700",
    hasException: false,
  },
  {
    id: "emp-002",
    employeeId: "INSP202401235",
    name: "李娜",
    department: "产品研发部",
    position: "产品经理",
    grossPay: 35000,
    insurance: 4200,
    tax: 2950,
    netPay: 27850,
    status: "已核算",
    statusColor: "bg-green-100 text-green-700",
    hasException: false,
  },
  {
    id: "emp-003",
    employeeId: "INSP202401236",
    name: "王强",
    department: "人力资源部",
    position: "招聘专员",
    grossPay: 9800,
    insurance: 1176,
    tax: 210,
    netPay: 8414,
    status: "异常",
    statusColor: "bg-red-100 text-red-700",
    hasException: true,
    exceptionReason: "考勤数据缺失，需手动核对",
  },
  {
    id: "emp-004",
    employeeId: "INSP202401237",
    name: "赵敏",
    department: "设计部",
    position: "UI设计师",
    grossPay: 22000,
    insurance: 2640,
    tax: 1380,
    netPay: 17980,
    status: "已核算",
    statusColor: "bg-green-100 text-green-700",
    hasException: false,
  },
  {
    id: "emp-005",
    employeeId: "INSP202401238",
    name: "刘洋",
    department: "信息技术中心",
    position: "后端工程师",
    grossPay: 26000,
    insurance: 3120,
    tax: 1680,
    netPay: 21200,
    status: "已核算",
    statusColor: "bg-green-100 text-green-700",
    hasException: false,
  },
  {
    id: "emp-006",
    employeeId: "INSP202401239",
    name: "陈静",
    department: "市场营销部",
    position: "市场专员",
    grossPay: 12500,
    insurance: 1500,
    tax: 480,
    netPay: 10520,
    status: "已核算",
    statusColor: "bg-green-100 text-green-700",
    hasException: false,
  },
  {
    id: "emp-007",
    employeeId: "INSP202401240",
    name: "孙磊",
    department: "财务管理部",
    position: "财务分析师",
    grossPay: 24000,
    insurance: 2880,
    tax: 1560,
    netPay: 19560,
    status: "已核算",
    statusColor: "bg-green-100 text-green-700",
    hasException: false,
  },
  {
    id: "emp-008",
    employeeId: "INSP202401241",
    name: "周芳",
    department: "数据中心",
    position: "数据分析师",
    grossPay: 21000,
    insurance: 2520,
    tax: 1290,
    netPay: 17190,
    status: "异常",
    statusColor: "bg-red-100 text-red-700",
    hasException: true,
    exceptionReason: "绩效系数未同步",
  },
  {
    id: "emp-009",
    employeeId: "INSP202401242",
    name: "吴涛",
    department: "信息技术中心",
    position: "架构师",
    grossPay: 38000,
    insurance: 4560,
    tax: 3520,
    netPay: 29920,
    status: "已核算",
    statusColor: "bg-green-100 text-green-700",
    hasException: false,
  },
  {
    id: "emp-010",
    employeeId: "INSP202401243",
    name: "郑强",
    department: "质量保障部",
    position: "测试工程师",
    grossPay: 18000,
    insurance: 2160,
    tax: 990,
    netPay: 14850,
    status: "已核算",
    statusColor: "bg-green-100 text-green-700",
    hasException: false,
  },
];

const formatCurrency = (amount: number) => {
  return `¥${amount.toLocaleString("zh-CN")}`;
};

export function PayrollCalculation() {
  const [showAllAmounts, setShowAllAmounts] = useState(false);
  const [visibleRows, setVisibleRows] = useState<Set<string>>(new Set());
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const toggleRowVisibility = (id: string) => {
    setVisibleRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isAmountVisible = (id: string) => {
    return showAllAmounts || visibleRows.has(id);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-gray-700">
          首页
        </Link>
        <span>/</span>
        <Link to="/payroll/calculation" className="hover:text-gray-700">
          薪酬管理
        </Link>
        <span>/</span>
        <span className="text-gray-900">薪酬核算中心</span>
      </div>

      {/* Navigation Tabs */}
      <PayrollNav />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">薪酬核算中心</h1>
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
              {item.sensitive && (
                <button
                  onClick={() => setShowAllAmounts(!showAllAmounts)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  {showAllAmounts ? (
                    <Eye className="w-4 h-4 text-gray-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{item.title}</p>
              <p className="text-2xl font-bold text-gray-900 tabular-nums">
                {item.sensitive && !showAllAmounts
                  ? "¥*****"
                  : typeof item.value === "number" && item.id === "total"
                  ? formatCurrency(item.value)
                  : item.value.toLocaleString("zh-CN")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Period Selector & Status */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
              <option value="2026-05">2026 年 5 月</option>
              <option value="2026-04">2026 年 4 月</option>
              <option value="2026-03">2026 年 3 月</option>
            </select>

            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
              核算中
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Upload className="w-4 h-4" />
              导入考勤
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <RefreshCw className="w-4 h-4" />
              重新核算
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
              <Download className="w-4 h-4" />
              导出薪资表
            </button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">考勤数据采集</p>
              <p className="text-xs text-gray-500">已完成</p>
            </div>
          </div>
          <div className="h-px flex-1 bg-green-300 mx-4" />

          <div className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">绩效系数同步</p>
              <p className="text-xs text-gray-500">已完成</p>
            </div>
          </div>
          <div className="h-px flex-1 bg-blue-300 mx-4" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#1E40AF] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">自动算薪</p>
              <p className="text-xs text-blue-600">进行中 87%</p>
            </div>
          </div>
          <div className="h-px flex-1 bg-gray-300 mx-4" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
              <span className="text-xs text-red-600 font-medium">24</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">异常复核</p>
              <p className="text-xs text-gray-400">待处理</p>
            </div>
          </div>
          <div className="h-px flex-1 bg-gray-300 mx-4" />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white" />
            <div>
              <p className="text-sm font-medium text-gray-400">发放确认</p>
              <p className="text-xs text-gray-400">未开始</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAllAmounts(!showAllAmounts)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                showAllAmounts
                  ? "bg-[#1E40AF] text-white"
                  : "border border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              {showAllAmounts ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
              {showAllAmounts ? "隐藏全部金额" : "显示全部金额"}
            </button>
            <span className="text-sm text-gray-500">
              已选择 {selectedRows.length} 条
            </span>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(payrollData.map((p) => p.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  工号
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  姓名
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  部门
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  岗位
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  应发工资
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  五险一金
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  个税
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  实发工资
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrollData.map((row) => (
                <Fragment key={row.id}>
                  <tr
                    className={`hover:bg-gray-50 ${
                      row.hasException ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRows([...selectedRows, row.id]);
                          } else {
                            setSelectedRows(
                              selectedRows.filter((id) => id !== row.id)
                            );
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 font-mono">
                      {row.employeeId}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {row.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {row.department}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {row.position}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right tabular-nums font-medium">
                      {isAmountVisible(row.id)
                        ? formatCurrency(row.grossPay)
                        : "¥*****"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 text-right tabular-nums">
                      {isAmountVisible(row.id)
                        ? formatCurrency(row.insurance)
                        : "¥***"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 text-right tabular-nums">
                      {isAmountVisible(row.id)
                        ? formatCurrency(row.tax)
                        : "¥***"}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#1E40AF] text-right tabular-nums font-semibold">
                      {isAmountVisible(row.id)
                        ? formatCurrency(row.netPay)
                        : "¥*****"}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${row.statusColor}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleRowVisibility(row.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title={
                            isAmountVisible(row.id) ? "隐藏金额" : "显示金额"
                          }
                        >
                          {isAmountVisible(row.id) ? (
                            <Eye className="w-4 h-4 text-gray-400" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        {row.hasException && (
                          <div className="relative group">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
                              {row.exceptionReason}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            显示第 1-10 条，共 5,847 条记录
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              上一页
            </button>
            <button className="px-3 py-1 bg-[#1E40AF] text-white rounded text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
              下一页
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-end">
          <button className="px-6 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] text-sm font-medium">
            提交复核
          </button>
        </div>
      </div>
    </div>
  );
}
