"use client"

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type Props = {
  open: number
  progress: number
  closed: number
}

export const IssueChart = ({ open, progress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: progress },
    { label: "Closed", value: closed },
  ]

  return (
    <article className="col-start-1 row-span-4 row-start-2 flex flex-col gap-2 rounded-md border p-5 pt-4">
      <h1 className="w-full font-medium">Current Allocation</h1>
      <div className="flex flex-1 items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 17,
              right: 20,
              left: -20,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              key={crypto.randomUUID()}
              contentStyle={{
                fontSize: "10px",
                border: "1px solid hsl(var(--background) / 0.1)",
                backgroundColor: "hsl(var(--background)",
                borderRadius: "15px",
              }}
              cursor={{
                stroke: "hsl(var(--primary))",
                strokeWidth: 1,
                opacity: 0.05,
                radius: 10,
              }}
            />
            <Bar
              dataKey="value"
              fill="url(#colorRevenue)"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}
