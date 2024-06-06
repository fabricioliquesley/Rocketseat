import { createContext, useState } from "react";

import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

type TaskStatus = "ready" | "interrupted" | "inProgress";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  status: TaskStatus;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  handleFinishCycle: (status: TaskStatus) => void;
  changeAmountSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, "informe a tarefa"),
  minutesAmount: z
    .number()
    .min(5, "O tempo de duração mínimo de um ciclo é 5 minutos")
    .max(60, "O tempo de duração máximo de um ciclo é 60 minutos"),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
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

    reset();
  }

  function handleFinishCycle(status: TaskStatus) {
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

  const taskInputIsEmpty = watch("task");

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            handleFinishCycle,
            amountSecondsPassed,
            changeAmountSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton
            type="button"
            onClick={() => handleFinishCycle("interrupted")}
          >
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={!taskInputIsEmpty}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
