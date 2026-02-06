import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

/**
 * Service object for handling expense-related operations with Firestore.
 */
export const expenseService = {
    /**
     * Fetches expenses for a specific user from Firestore.
     * @param {string} userId - The user's unique ID.
     * @returns {Promise<Array>} A promise that resolves to an array of expense objects.
     */
    getExpenses: async (userId) => {
        if (!userId) return [];
        try {
            // Reference: users/{userId}/expenses
            // Accessing the subcollection 'expenses' within the specific user's document
            const expensesRef = collection(db, 'users', userId, 'expenses');
            const querySnapshot = await getDocs(expensesRef);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error getting expenses: ", error);
            return [];
        }
    },

    /**
     * Adds a new expense to Firestore for a specific user.
     * @param {Object} expense - The expense data object.
     * @param {string} userId - The user's unique ID.
     * @returns {Promise<Object>} A promise that resolves to the added expense object with its generated ID.
     */
    addExpense: async (expense, userId) => {
        if (!userId) throw new Error("User ID is required");
        try {
            const newExpense = {
                ...expense,
                // userId is implicitly part of the path now, but keeping it in data doesn't hurt
                userId,
                createdAt: new Date().toISOString()
            };
            // Add to: users/{userId}/expenses
            // Storing the expense in the user-specific subcollection
            const docRef = await addDoc(collection(db, 'users', userId, 'expenses'), newExpense);
            return { id: docRef.id, ...newExpense };
        } catch (error) {
            console.error("Error adding expense: ", error);
            throw error;
        }
    },

    /**
     * Deletes a specific expense from Firestore.
     * @param {string} id - The ID of the expense document to delete.
     * @param {string} userId - The user's unique ID.
     * @returns {Promise<void>}
     */
    deleteExpense: async (id, userId) => {
        if (!userId) throw new Error("User ID is required to delete");
        try {
            // Delete from: users/{userId}/expenses/{id}
            // Removing the document from the user's subcollection
            await deleteDoc(doc(db, 'users', userId, 'expenses', id));
        } catch (error) {
            console.error("Error deleting expense: ", error);
            throw error;
        }
    },

    /**
     * Calculates the total amount of all expenses.
     * @param {Array} expenses - Array of expense objects.
     * @returns {number} The total sum of expenses.
     */
    getTotal: (expenses) => {
        return expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    },

    /**
     * Extracts unique categories from the list of expenses.
     * @param {Array} expenses - Array of expense objects.
     * @returns {Array<string>} An array of unique category names.
     */
    getCategories: (expenses) => {
        const categories = [...new Set(expenses.map(item => item.category))];
        return categories;
    }
};
