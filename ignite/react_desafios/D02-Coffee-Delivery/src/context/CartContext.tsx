import { ReactNode, createContext } from "react";

type selectedCoffee = {
  id: string;
  quantity: number;
};

interface CartContextType {
  totalItems: number;
  selectedCoffees: selectedCoffee[];
  addCoffee: (id: string, quantity: number) => void;
  removeCoffee: (id: string) => void;
}

export const CartContext = createContext({} as CartContextType);

interface CartContextProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  let selectedCoffees = [] as selectedCoffee[];
  let totalItems = 5;

  function addCoffee(id: string, quantity: number) {
    return console.log({ id, quantity });
  }

  function removeCoffee(id: string) {
    return console.log(id);
  }

  return (
    <CartContext.Provider
      value={{
        totalItems,
        selectedCoffees,
        addCoffee,
        removeCoffee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
