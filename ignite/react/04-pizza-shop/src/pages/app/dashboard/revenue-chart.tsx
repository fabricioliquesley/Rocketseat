import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  CartesianGrid,
} from "recharts";
import colors from "tailwindcss/colors";

const fakeData = [
  { date: "07/12", revenue: 5200 },
  { date: "08/12", revenue: 6400 },
  { date: "09/12", revenue: 4564 },
  { date: "10/12", revenue: 6000 },
  { date: "11/12", revenue: 7300 },
  { date: "12/12", revenue: 6954 },
  { date: "13/12", revenue: 6738 },
];

export const RevenueChart = () => {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width={"100%"} height={240}>
          <LineChart data={fakeData} style={{ fontSize: 12 }}>
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }
            />
            <XAxis dataKey={"date"} axisLine={false} tickLine={false} dy={16} />
            <Line
              type={"linear"}
              strokeWidth={2}
              dataKey="revenue"
              stroke={colors.violet[500]}
            />
            <CartesianGrid vertical={false} className="dark:stroke-muted"/>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
