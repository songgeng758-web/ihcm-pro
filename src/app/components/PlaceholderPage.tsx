import { useLocation } from "react-router";
import { Construction } from "lucide-react";

const pageNames: Record<string, string> = {
  "/organization": "组织管理",
  "/movements": "入转调离",
  "/recruitment": "招聘管理",
  "/performance": "绩效管理",
  "/training": "培训管理",
  "/compensation": "薪酬管理",
  "/attendance": "考勤管理",
  "/self-service": "员工自助",
  "/dashboards": "数据看板",
  "/reports": "报表中心",
  "/analytics": "数据分析",
  "/settings": "系统设置",
};

export function PlaceholderPage() {
  const location = useLocation();
  const pageName = pageNames[location.pathname] || "页面";

  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
          <Construction className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{pageName}</h2>
        <p className="text-gray-500 mb-6">该模块正在开发中，敬请期待</p>
        <div className="text-sm text-gray-400">
          当前路径: {location.pathname}
        </div>
      </div>
    </div>
  );
}
