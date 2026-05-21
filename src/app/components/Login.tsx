import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, Mail, Shield } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    captcha: "",
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="h-screen flex">
      {/* Left Brand Area */}
      <div className="w-1/2 bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] flex flex-col items-center justify-center text-white p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold">iH</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold">iHCM Pro</h1>
              <p className="text-blue-100 text-sm mt-1">智能人力资本管理云</p>
            </div>
          </div>

          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">让每一个人才决策都有数据支撑</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  基于 AI 的智能分析引擎，实时洞察组织健康度，预测人才流失风险，为管理层提供科学决策依据
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">全生命周期人才管理</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  从招聘、入职、培养、绩效到离职，打通人才管理全链路，构建企业人才数据资产
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">企业级安全与合规</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  通过等保三级认证，符合 ISO 27001 标准，多层级权限管控，保障企业数据安全
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-1/2 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">欢迎登录</h2>
            <p className="text-gray-500 text-sm">请使用企业账号登录系统</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                账号
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="请输入用户名或邮箱"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="请输入密码"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                验证码
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={formData.captcha}
                  onChange={(e) =>
                    setFormData({ ...formData, captcha: e.target.value })
                  }
                  placeholder="请输入验证码"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
                <div className="w-28 h-12 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                  <span className="text-gray-500 font-mono text-lg tracking-wider">
                    8K4N
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) =>
                    setFormData({ ...formData, remember: e.target.checked })
                  }
                  className="w-4 h-4 text-[#1E40AF] border-gray-300 rounded focus:ring-[#1E40AF]"
                />
                <span className="text-sm text-gray-600">记住我</span>
              </label>
              <a href="#" className="text-sm text-[#1E40AF] hover:underline">
                忘记密码？
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E40AF] text-white py-3 rounded-lg font-medium hover:bg-[#1E3A8A] transition-colors"
            >
              登录
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                还没有账号？
                <a href="#" className="text-[#1E40AF] hover:underline ml-1">
                  联系管理员
                </a>
              </p>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center text-xs text-gray-400 space-y-1">
              <p>iHCM Pro v3.5.2 Enterprise Edition</p>
              <p>© 2024 iHCM Technology. All rights reserved.</p>
              <p className="text-gray-400">
                <a href="#" className="hover:text-gray-600">
                  京ICP备12345678号-1
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}
