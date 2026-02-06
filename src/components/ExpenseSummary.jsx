import React from 'react';
import { formatCurrency } from '../utils/formatters';


const ExpenseSummary = ({ expenses }) => {
    // Calculate total expenses amount
    const totalAmount = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

    // Aggregate expenses by category
    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
        return acc;
    }, {});

    // Defines the category with the highest spending
    const topCategory = Object.keys(categoryTotals).reduce((a, b) =>
        categoryTotals[a] > categoryTotals[b] ? a : b
        , 'None');

    const monthTotal = expenses
        .filter(e => new Date(e.date).getMonth() === new Date().getMonth())
        .reduce((sum, item) => sum + Number(item.amount), 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
                <div className="flex items-center gap-4 mb-4">

                    <div>
                        <p className="text-indigo-100 text-sm font-medium">Total Expenses</p>
                        <h3 className="text-2xl font-bold">{formatCurrency(totalAmount)}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">

                    <div>
                        <p className="text-gray-500 text-sm font-medium">This Month</p>
                        <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(monthTotal)}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-4">

                    <div>
                        <p className="text-gray-500 text-sm font-medium">Top Category</p>
                        <h3 className="text-2xl font-bold text-gray-800">{topCategory === 'None' ? '-' : topCategory}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseSummary;
