import { ReactNode, createContext, useReducer, useState } from "react";
import { ActionTypes, Cycle, CyclesReducer } from "../reducers/Cycles";

export type TaskStatus = "ready" | "interrupted" | "inProgress";

interface CyclesContextProviderProps {
  children: ReactNode;
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
  const [cyclesState, dispatch] = useReducer(CyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { cycles, activeCycleId } = cyclesState;

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

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    });
    setAmountSecondsPassed(0);
  }

  function finishCycle(status: TaskStatus) {
    dispatch({
      type: ActionTypes.FINISH_CYCLE,
      payload: {
        status,
      },
    });
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
