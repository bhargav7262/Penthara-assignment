import React, { useState } from 'react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Trash2, Filter } from 'lucide-react';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
    const [filterCategory, setFilterCategory] = useState('All');

    // Filter expenses based on the selected category
    const filteredExpenses = expenses.filter(expense =>
        filterCategory === 'All' ? true : expense.category === filterCategory
    );

    const categories = ['All', ...new Set(expenses.map(e => e.category))];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">

                    Recent Transactions
                </h2>

                <div className="relative">
                    <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm cursor-pointer hover:border-indigo-300 transition-colors"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {filteredExpenses.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No transactions found</p>
                    </div>
                ) : (
                    filteredExpenses.map((expense) => (
                        <div
                            key={expense.id}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                  ${expense.category === 'Food' ? 'bg-orange-100 text-orange-600' :
                                        expense.category === 'Transport' ? 'bg-blue-100 text-blue-600' :
                                            expense.category === 'Entertainment' ? 'bg-purple-100 text-purple-600' :
                                                'bg-gray-100 text-gray-600'}`}
                                >
                                    {expense.category[0]}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{expense.description || expense.category}</h3>
                                    <p className="text-sm text-gray-500">{formatDate(expense.date)} • {expense.category}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-900">{formatCurrency(expense.amount)}</span>
                                <button
                                    onClick={() => onDeleteExpense(expense.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    aria-label="Delete expense"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExpenseList;
