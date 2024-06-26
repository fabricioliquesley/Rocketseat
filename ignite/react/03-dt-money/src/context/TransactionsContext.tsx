import { ReactNode, createContext, useEffect, useState } from "react";

export type transaction = {
  id: string;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
};

interface TransactionContextType {
  transactions: transaction[];
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3000/transactions");
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
}
