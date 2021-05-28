import React, { useReducer, createContext } from 'react';
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{ "amount": 100, "category": "Salary", "type": "Income", "date": "2021-05-24", "id": "e9309fff-3a78-4648-8cf6-d1dbcf509f8b" }];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState)//complex version of useState

    console.log(transactions);
    //Action creators
    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    const balance = transactions.reduce((acc, curVal) =>
        curVal.type === 'Expense' ? acc - curVal.amount : acc + curVal.amount, 0);

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}