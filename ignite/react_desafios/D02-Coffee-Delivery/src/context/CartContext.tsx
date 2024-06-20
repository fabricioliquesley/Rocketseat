import { ReactNode, createContext, useState } from "react";

type selectedCoffee = {
  id: string;
  quantity: number;
};

interface CartContextType {
  totalItems: number;
  selectedCoffees: selectedCoffee[];
  addCoffee: (id: string, quantity: number) => void;
  removeAUnityOfCoffee: (id: string) => void;
  removeCoffee: (id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext({} as CartContextType);

interface CartContextProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [selectedCoffees, setSelectedCoffees] = useState<selectedCoffee[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  function addCoffee(id: string, quantity: number) {
    const newSelectedCoffee = {
      id,
      quantity,
    };

    if (selectedCoffees.length > 0) {
      const [coffeeAlreadySelected] = selectedCoffees.filter(
        (c) => c.id === id
      );

      if (coffeeAlreadySelected) {
        const selectedCoffeesUpdate = selectedCoffees.map((selectedCoffee) => {
          if (selectedCoffee.id === id) {
            selectedCoffee.quantity += quantity;
          }

          return selectedCoffee;
        });

        setSelectedCoffees(selectedCoffeesUpdate);
      } else {
        setSelectedCoffees((prev) => [...prev, newSelectedCoffee]);

        setTotalItems((prev) => prev + 1);
      }
    } else {
      setSelectedCoffees((prev) => [...prev, newSelectedCoffee]);

      setTotalItems((prev) => prev + 1);
    }
  }

  function removeAUnityOfCoffee(id: string) {
    const selectedCoffeesUpdate = selectedCoffees.filter((selectedCoffee) => {
      if (selectedCoffee.id === id) {
        selectedCoffee.quantity -= 1;

        if (selectedCoffee.quantity === 0) {
          setTotalItems((prev) => prev - 1);
          return;
        }
      }

      return selectedCoffee;
    });

    setSelectedCoffees(selectedCoffeesUpdate);
  }

  function removeCoffee(id: string) {
    const filteredSelectedCoffees = selectedCoffees.filter(
      (coffee) => coffee.id !== id
    );

    setSelectedCoffees(filteredSelectedCoffees);
    setTotalItems((prev) => prev - 1);
  }

  function clearCart() {
    setTotalItems(0);
    setSelectedCoffees([]);
  }

  return (
    <CartContext.Provider
      value={{
        totalItems,
        selectedCoffees,
        addCoffee,
        removeAUnityOfCoffee,
        removeCoffee,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
