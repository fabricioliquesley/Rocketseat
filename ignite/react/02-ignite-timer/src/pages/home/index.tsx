import { Minus, Play, Plus } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";
import { useForm } from "react-hook-form";

export function Home() {
  const { register, handleSubmit, watch } = useForm();

  function handleCreateNewCycle(data: any) {
    console.log(data);
  }

  const taskInputIsEmpty = watch("task")

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para o seu projeto"
            list={"task-suggestions"}
            {...register("task")}
          />
          <datalist id="task-suggestions">
            <option value="gerenciador de senhas" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <div>
            <MinutesAmountInput
              id="minutesAmount"
              type="number"
              placeholder="00"
              step={5}
              min={5}
              max={60}
              {...register("minutesAmount", {valueAsNumber: true})}
            />
          </div>
          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton type="submit" disabled={!taskInputIsEmpty}>
          <Play size={24} />
          começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
