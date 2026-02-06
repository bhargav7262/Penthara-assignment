import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseSummary from '../components/ExpenseSummary';
import ChartComponent from '../components/ChartComponent';
import { expenseService } from '../services/expense-service';
import { LogOut } from 'lucide-react';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                fetchExpenses(currentUser.uid);
            } else {
                setExpenses([]);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    /**
     * Fetches expenses for the authenticated user from Firestore.
     * @param {string} userId - The unique ID of the user.
     */
    const fetchExpenses = async (userId) => {
        setLoading(true);
        const data = await expenseService.getExpenses(userId);
        setExpenses(data);
        setLoading(false);
    };

    /**
     * Handles adding a new expense.
     * @param {Object} expenseData - The expense object to add.
     */
    const handleAddExpense = async (expenseData) => {
        if (!user) return;
        try {
            const newExpense = await expenseService.addExpense(expenseData, user.uid);
            setExpenses([...expenses, newExpense]);
        } catch (error) {
            console.error("Failed to add expense", error);
        }
    };

    /**
     * Handles deleting an expense.
     * @param {string} id - The ID of the expense to delete.
     */
    const handleDeleteExpense = async (id) => {
        if (!user) return;
        try {
            await expenseService.deleteExpense(id, user.uid);
            setExpenses(expenses.filter(exp => exp.id !== id));
        } catch (error) {
            console.error("Failed to delete expense", error);
        }
    };

    /**
     * Handles user sign-out.
     */
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    if (loading && !expenses.length) {
        // Show loading only on initial load regarding auth, 
        // or we can show a better loading skeleton.
        // For now, simple text or spinner.
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-2">

                            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                ExpenseTracker
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 hidden sm:block">
                                {user?.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ExpenseSummary expenses={expenses} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column - Form and Chart */}
                    <div className="lg:col-span-5 space-y-8">
                        <ExpenseForm onAddExpense={handleAddExpense} />
                        <ChartComponent expenses={expenses} />
                    </div>

                    {/* Right Column - List */}
                    <div className="lg:col-span-7">
                        <ExpenseList
                            expenses={expenses}
                            onDeleteExpense={handleDeleteExpense}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
