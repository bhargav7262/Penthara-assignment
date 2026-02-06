import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

const ChartComponent = ({ expenses }) => {
    if (expenses.length === 0) return null;

    // Transform expense data for the PieChart: Group by category and sum amounts
    const data = Object.values(expenses.reduce((acc, curr) => {
        if (!acc[curr.category]) {
            acc[curr.category] = { name: curr.category, value: 0 };
        }
        acc[curr.category].value += Number(curr.amount);
        return acc;
    }, {}));

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-[400px]">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Spending Breakdown</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => `₹${value}`}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartComponent;
