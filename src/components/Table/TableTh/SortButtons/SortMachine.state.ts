import { createMachine, assign } from "xstate";

interface ISortButtonContext {
  priority: number;
}

const SortMachine = createMachine<ISortButtonContext>(
  {
    id: "sortMachine",
    initial: "idle",
    context: {
      priority: 0,
    },
    states: {
      idle: {
        on: {
          INCREMENT: { actions: ["increase"], target: "ascending" },
          DECREMENT: { actions: ["decrease"], target: "descending" },
        },
      },
      ascending: {
        on: {
          INCREMENT: { actions: ["increase"], target: "ascending" },
          DECREMENT: { actions: ["reset"], target: "idle" },
        },
      },
      descending: {
        on: {
          INCREMENT: { actions: ["reset"], target: "idle" },
          DECREMENT: { actions: ["decrease"], target: "descending" },
        },
      },
    },
  },
  {
    actions: {
      reset: assign(() => {
        return { priority: 0 };
      }),
      increase: assign(({ priority }: ISortButtonContext) => {
        return { priority: priority + 1 };
      }),
      decrease: assign(({ priority }: ISortButtonContext) => {
        return { priority: priority + 1 };
      }),
    },
  }
);

export default SortMachine;
