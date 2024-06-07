import { TaskStatus } from "../../context/CyclesContext";
import { ActionTypes } from "./actions";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  status: TaskStatus;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export const CyclesReducer = (state: CyclesState, action: any) => {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      };
    case ActionTypes.FINISH_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.status === "inProgress") {
            cycle.status = action.payload.status;
          }

          return cycle;
        }),
        activeCycleId: null,
      };
    default:
      return state;
  }
};
export { ActionTypes };

