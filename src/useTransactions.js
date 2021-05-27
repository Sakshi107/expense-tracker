//customHook

import { useContext } from 'react';
import { ExpenseTrackerContext } from './context/context';
import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';

const useTransactions = (title) => {
    resetCategories();
    const { transactions } = useContext(ExpenseTrackerContext);
    const selectedTypeTransactions = transactions.filter((t) => t.type === title);
    const total = selectedTypeTransactions.reduce((acc, curVal) => acc += curVal.amount, 0);//0 is initial value of acc
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    console.log({ categories, total, selectedTypeTransactions })

    selectedTypeTransactions.forEach((t) => {
        const category = categories.find((c) => c.type === t.category)
        if (category)
            category.amount += t.amount;
    });

    const filteredCategories = categories.filter((c) => c.amount > 0);

    const chartData = {
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color),
        }],
        labels: filteredCategories.map((c) => c.type),
    }

    return { filteredCategories,chartData, total };
}

export default useTransactions;


