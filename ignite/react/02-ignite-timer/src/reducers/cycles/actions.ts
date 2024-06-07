import { TaskStatus } from "../../context/CyclesContext";
import { Cycle } from "./reducer";

export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  FINISH_CYCLE = "FINISH_CYCLE",
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  };
}

export function finishCycleAction(status: TaskStatus) {
  return {
    type: ActionTypes.FINISH_CYCLE,
    payload: {
      status,
    },
  };
}
