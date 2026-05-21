import { memo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

interface GenderData {
  id: string;
  name: string;
  value: number;
  color: string;
}

interface AgeData {
  id: string;
  age: string;
  count: number;
}

interface DepartmentData {
  id: string;
  dept: string;
  count: number;
}

interface TrendData {
  id: string;
  month: string;
  hire: number;
  leave: number;
}

export const GenderPieChart = memo(({ data }: { data: GenderData[] }) => (
  <ResponsiveContainer width="100%" height={180}>
    <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={45}
        outerRadius={70}
        paddingAngle={2}
        dataKey="value"
        nameKey="id"
        isAnimationActive={false}
      >
        {data.map((entry) => (
          <Cell key={entry.id} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
));

GenderPieChart.displayName = "GenderPieChart";

export const AgeBarChart = memo(({ data }: { data: AgeData[] }) => (
  <ResponsiveContainer width="100%" height={180}>
    <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
      <XAxis dataKey="age" tick={{ fontSize: 12 }} stroke="#9ca3af" />
      <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
      <Tooltip />
      <Bar
        dataKey="count"
        fill="#1E40AF"
        radius={[4, 4, 0, 0]}
        isAnimationActive={false}
      />
    </BarChart>
  </ResponsiveContainer>
));

AgeBarChart.displayName = "AgeBarChart";

export const DepartmentBarChart = memo(
  ({ data }: { data: DepartmentData[] }) => (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <YAxis
          type="category"
          dataKey="dept"
          width={120}
          tick={{ fontSize: 12 }}
          stroke="#9ca3af"
        />
        <Tooltip />
        <Bar
          dataKey="count"
          fill="#1E40AF"
          radius={[0, 4, 4, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  )
);

DepartmentBarChart.displayName = "DepartmentBarChart";

export const TrendLineChart = memo(({ data }: { data: TrendData[] }) => (
  <ResponsiveContainer width="100%" height={240}>
    <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
      <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="hire"
        stroke="#10B981"
        strokeWidth={2}
        name="入职"
        dot={{ r: 4 }}
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        dataKey="leave"
        stroke="#EF4444"
        strokeWidth={2}
        name="离职"
        dot={{ r: 4 }}
        isAnimationActive={false}
      />
    </LineChart>
  </ResponsiveContainer>
));

TrendLineChart.displayName = "TrendLineChart";
