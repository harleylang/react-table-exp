import { useMachine } from "@xstate/react";
import { assign } from "xstate";

import ISorter from "../../ISorter";
import SortMachine from "./SortMachine.state";

const SortButtons = ({
  sorter,
  setSorter,
  clearSorter,
}: {
  sorter: ISorter;
  setSorter: (sorter: ISorter) => void;
  clearSorter: (sorter: ISorter) => void;
}) => {
  const [state, updateState] = useMachine(SortMachine, {
    actions: {
      reset: assign(() => {
        clearSorter(sorter);
        return { priority: 0 };
      }),
      increase: assign(({ priority }) => {
        let newPriority = priority + 1;
        updateData({
          direction: "ascending",
          priority: newPriority,
        });
        return { priority: newPriority };
      }),
      decrease: assign(({ priority }) => {
        let newPriority = priority + 1;
        updateData({
          direction: "descending",
          priority: newPriority,
        });
        return { priority: newPriority };
      }),
    },
  });

  const updateData = ({
    direction,
    priority,
  }: {
    direction: ISorter["direction"];
    priority: number;
  }) => {
    let updatedSorter: ISorter = {
      ...sorter,
      direction: direction,
      priority: priority,
    };
    setSorter(updatedSorter);
  };

  const handleIncrement = () => updateState("INCREMENT");
  const handleDecrement = () => updateState("DECREMENT");

  return (
    <>
      <button onClick={handleIncrement}>
        ^{state.matches("ascending") && state.context.priority}
      </button>
      <button onClick={handleDecrement}>
        _{state.matches("descending") && state.context.priority}
      </button>
    </>
  );
};

export default SortButtons;
