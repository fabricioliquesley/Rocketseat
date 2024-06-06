import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../context/CyclesContext";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para o seu projeto"
        list={"task-suggestions"}
        disabled={!!activeCycle}
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
          disabled={!!activeCycle}
          {...register("minutesAmount", { valueAsNumber: true })}
        />
      </div>
      <span>minutos.</span>
    </FormContainer>
  );
}
