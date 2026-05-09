import { useCallback, useState } from "react";
import type { RunnerSnapshot, RunnerState } from "../shared/types/workflow";
import { fakeRunners } from "./fakeData";

export const useRunnerState = () => {
  const [runners, setRunners] = useState<RunnerSnapshot[]>(fakeRunners);

  const setRunnerState = useCallback(
    (runnerId: string, state: RunnerState) => {
      setRunners((prev) =>
        prev.map((runner) =>
          runner.runnerId === runnerId
            ? { ...runner, state, updatedAt: new Date().toISOString() }
            : runner,
        ),
      );
    },
    [],
  );

  return {
    runners,
    setRunnerState,
  };
};
