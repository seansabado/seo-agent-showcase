import { useCallback, useState } from "react";
import type { MachineSnapshot, MachineState } from "../shared/types/pos";
import { fakeMachines } from "./fakeData";

export const useMachineState = () => {
  const [machines, setMachines] = useState<MachineSnapshot[]>(fakeMachines);

  const setMachineState = useCallback(
    (machineId: string, state: MachineState) => {
      setMachines((prev) =>
        prev.map((machine) =>
          machine.machineId === machineId
            ? { ...machine, state, updatedAt: new Date().toISOString() }
            : machine,
        ),
      );
    },
    [],
  );

  return {
    machines,
    setMachineState,
  };
};
