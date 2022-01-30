import { useMachine } from "@xstate/react";
import styled from "styled-components";

import Input from "components/Input";
import PageNav from "components/PageNav";
import RadioGroup from "components/RadioGroup";
import Table, { TableMachine, IFilter } from "components/Table";

import data from "./data";
import RadioPagination from "components/RadioPagintion";
import ITable from "components/Table/ITable";
import ISorter from "components/Table/ISorter";

const { header, rows } = data;
const colourOptions = [
  "all",
  ...rows.map((r) => r[2]).filter((v, i, a) => a.indexOf(v) === i),
];
const configuredTableMachine = TableMachine.withConfig(
  {},
  {
    ...TableMachine.context,
    header: header.map((h, i) => {
      return {
        data: h,
        component: (data: string) => {
          return <u>{data}</u>;
        },
        sorter:
          h !== "Date"
            ? {
                id: `sorter-${h}`,
                coli: i
              }
            : undefined,
      };
    }),
    rows: rows.map((r) => {
      return r.map((c) => {
        return {
          data: c,
          component: (data: string) => {
            return <i>{data}</i>;
          },
        };
      });
    }),
  }
);

const Example1 = () => {
  const [state, updateMachine] = useMachine(configuredTableMachine, {
    devTools: true,
  });

  /* 
  
  TODO:
  - sort ascending / descending AFTER filter BEFORE pagination
    - pass along ascending / descending instructions to state machine
  - documentation of logic
  */

  const handleFilterClear = (id: string) =>
    updateMachine("FILTER_CLEAR", { id });
  const handleFilterUpdate = (filter: IFilter) =>
    updateMachine("FILTER_UPDATE", { filter });
  const handleFilterReset = () => updateMachine("FILTER_RESET");

  const handleSorterClear = (sorter: ISorter) => 
    updateMachine("SORTER_CLEAR", { sorter });
  const handleSorterUpdate = (sorter: ISorter) => 
    updateMachine("SORTER_UPDATE", { sorter });

  const handlePagingIndex = (page: number) =>
    updateMachine("PAGING_INDEX", { page });
  const handlePagingLength = (pagination: number) =>
    updateMachine("PAGING_LENGTH", { pagination });

  const pageRows =
    state.context.rowsOG.length === state.context.rowsFiltered.length
      ? state.context.rowsOG.length
      : state.context.rowsFiltered.length;

  const pages = Math.ceil(pageRows / state.context.pagination);

  return (
    <Container>
      <h3>Example 1</h3>
      <FilterRow>
        <Input
          key={`input-number-${state.context.ripcord}`}
          min={0}
          max={10}
          val={10}
          type={"number"}
          filter={(value) => {
            return {
              id: "number",
              logic: (rows: ITable["rows"]) => {
                // custom logic for handling this input changes!
                let targetColumn = 1;
                let newRows = [];
                for (let r = 0; r < rows.length; r++) {
                  let row = rows[r];
                  let target = parseInt(row[targetColumn].data);
                  if (target <= value) newRows.push(row);
                }
                return newRows;
              },
            };
          }}
          clearFilter={handleFilterClear}
          setFilter={handleFilterUpdate}
        />
        <RadioGroup
          key={`radio-color-${state.context.ripcord}`}
          group="colors"
          options={colourOptions}
          filter={(value) => {
            return {
              id: "color",
              logic: (rows: ITable["rows"]) => {
                // custom logic for handling  changes!
                let targetColumn = 2;
                if (value === "all") return rows;
                let newRows = [];
                for (let r = 0; r < rows.length; r++) {
                  let row = rows[r];
                  let target = row[targetColumn].data;
                  if (target === value) newRows.push(row);
                }
                return newRows;
              },
            };
          }}
          clearFilter={handleFilterClear}
          setFilter={handleFilterUpdate}
        />
        <button onClick={handleFilterReset}>Clear All Filters</button>
        <RadioPagination
          group={"paginationToggle"}
          options={[5, 10, 20, 50]}
          defaultOptionI={1}
          setPagination={handlePagingLength}
        />
      </FilterRow>
      <Table
        key={`table-${state.context.ripcord}`}
        header={state.context.header}
        rows={state.context.rows}
        setSorter={handleSorterUpdate}
        clearSorter={handleSorterClear}
      />
      <PageNav
        pages={pages}
        current={state.context.page}
        setPage={handlePagingIndex}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterRow = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  & > * {
    border: 1px solid black;
    padding: 16px;
    margin-right: 16px;
  }
`;

export default Example1;
