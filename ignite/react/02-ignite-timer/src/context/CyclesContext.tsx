import { ReactNode, createContext, useState } from "react";

export type TaskStatus = "ready" | "interrupted" | "inProgress";

interface CyclesContextProviderProps {
  children: ReactNode;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  status: TaskStatus;
}

interface CycleFormData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  createNewCycle: (data: CycleFormData) => void;
  finishCycle: (status: TaskStatus) => void;
  changeAmountSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function createNewCycle(data: CycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
      status: "inProgress",
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
  }

  function finishCycle(status: TaskStatus) {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.status === "inProgress") {
          cycle.status = status;
        }

        return cycle;
      })
    );

    setActiveCycleId(null);
  }

  function changeAmountSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        finishCycle,
        changeAmountSecondsPassed,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
