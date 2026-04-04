import { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FinanceContext = createContext();

const initialTransactions = [
  { id: uuidv4(), date: '2026-03-25', amount: 4500, category: 'Salary', type: 'income', description: 'Monthly Salary' },
  { id: uuidv4(), date: '2026-03-28', amount: -1500, category: 'Rent', type: 'expense', description: 'Apartment Rent' },
  { id: uuidv4(), date: '2026-04-01', amount: -200, category: 'Groceries', type: 'expense', description: 'Whole Foods' },
  { id: uuidv4(), date: '2026-04-02', amount: -60, category: 'Entertainment', type: 'expense', description: 'Netflix & Spotify' },
  { id: uuidv4(), date: '2026-04-03', amount: 300, category: 'Freelance', type: 'income', description: 'Design Gig' },
];

const initialState = {
  transactions: JSON.parse(localStorage.getItem('transactions')) || initialTransactions,
  role: 'viewer', // 'viewer' or 'admin'
};

const financeReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      const newTransactionsAdd = [action.payload, ...state.transactions];
      localStorage.setItem('transactions', JSON.stringify(newTransactionsAdd));
      return { ...state, transactions: newTransactionsAdd };
    case 'DELETE_TRANSACTION':
      const newTransactionsDel = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem('transactions', JSON.stringify(newTransactionsDel));
      return { ...state, transactions: newTransactionsDel };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    default:
      return state;
  }
};

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: { ...transaction, id: uuidv4() } });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const setRole = (role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
  };

  return (
    <FinanceContext.Provider value={{
      transactions: state.transactions,
      role: state.role,
      addTransaction,
      deleteTransaction,
      setRole
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
