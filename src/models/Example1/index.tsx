import { useMachine } from "@xstate/react";
import styled from "styled-components";

import Input from "components/Input";
import PageNav from "components/PageNav";
import RadioGroup from "components/RadioGroup";
import Table, { TableMachine, IFilter } from "components/Table";

import data from "./data";
import RadioPagination from "components/RadioPagintion";
import ITable from "components/Table/ITable";

const { header, rows } = data;
const colourOptions = [
  "all",
  ...rows.map((r) => r[2]).filter((v, i, a) => a.indexOf(v) === i),
];
const configuredTableMachine = TableMachine.withConfig(
  {},
  {
    ...TableMachine.context,
    header: header,
    rowsOG: rows,
  }
);

const Example1 = () => {
  const [state, updateMachine] = useMachine(configuredTableMachine, {
    devTools: true,
  });

  /* 
  
  TODO:

  - sort ascending / descending AFTER filter BEFORE pagination
  - ICell within "rows" => {
    data: any
    component: JSX.Element
  } => so that you can filter data, and then put the content within the element you have in mind
  - documentation of logic
  
  */

  const clearFilter = (id: string) => updateMachine("CLEAR", { id });
  const updateFilter = (filter: IFilter) => updateMachine("UPDATE", { filter });
  const resetFilters = () => updateMachine("RESET");

  const handlePage = (page: number) => updateMachine("PAGE", { page });
  const handlePagination = (pagination: number) =>
    updateMachine("PAGINATION", { pagination });

  const pageRows =
    state.context.rowsOG.length === state.context.rowsF.length
      ? state.context.rowsOG.length
      : state.context.rowsF.length;

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
          filter={(value) => { return {
            id: "number",
            logic: (rows: ITable["rows"]) => {
              // custom logic for handling this input changes!
              let targetColumn = 1;
              let newRows = [];
              for (let r = 0; r < rows.length; r++) {
                let row = rows[r];
                let target = parseInt(row[targetColumn]);
                if (target <= value) newRows.push(row);
              }
              return newRows;
            },
          }}}
          clearFilter={clearFilter}
          setFilter={updateFilter}
        />
        <RadioGroup
          key={`radio-color-${state.context.ripcord}`}
          group="colors"
          options={colourOptions}
          filter={(value) => { return {
            id: "color",
            logic: (rows: ITable["rows"]) => {
              // custom logic for handling  changes!
              let targetColumn = 2;
              if (value === "all") return rows;
              let newRows = [];
              for (let r = 0; r < rows.length; r++) {
                let row = rows[r];
                let target = row[targetColumn];
                if (target === value) newRows.push(row);
              }
              return newRows;
            }
          }}}
          clearFilter={clearFilter}
          setFilter={updateFilter}
        />
        <button onClick={resetFilters}>Clear All Filters</button>
        <RadioPagination
          group={"paginationToggle"}
          options={[5, 10, 20]}
          defaultOptionI={1}
          setPagination={handlePagination}
        />
      </FilterRow>
      <Table header={state.context.header} rows={state.context.rows} />
      <PageNav
        pages={pages}
        current={state.context.page}
        setPage={handlePage}
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
