import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

export type transaction = {
  id: string;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
};

type CreateTransaction = {
  description: string;
  category: string;
  price: number;
  type: "income" | "outcome";
};

interface TransactionContextType {
  transactions: transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransaction) => Promise<CreateTransaction>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("/transactions", {
      params: {
        _sort: "createdAt",
        _order: "desc",
        q: query,
      },
    });

    setTransactions(response.data);
  }, []);

  const createTransaction = useCallback(async (data: CreateTransaction) => {
    const { description, category, price, type } = data;

    const response = await api.post("/transactions", {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    });

    setTransactions((state) => [response.data, ...state]);

    return response.data;
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
