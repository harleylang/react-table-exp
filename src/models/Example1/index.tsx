import { useMachine } from "@xstate/react";
import styled from "styled-components";

import Input from "components/Input";
import PageNav from "components/PageNav";
import RadioGroup from "components/RadioGroup";
import Table from "components/Table";
import SmartTable, { Filter } from "machines/SmartTable";

import data from "./data";

const { header, rows } = data;
const colourOptions = [
  "all",
  ...rows.map((r) => r[2]).filter((v, i, a) => a.indexOf(v) === i),
];
const TableStateMachine = SmartTable.withConfig(
  {},
  {
    ...SmartTable.context,
    header: header,
    rowsOG: rows,
    rowsF: rows,
  }
);

const Example1 = () => {
  const [state, updateMachine] = useMachine(TableStateMachine, {
    devTools: true,
  });

  /* 
  
  TODO:

  - sort ascending / descending AFTER filter BEFORE pagination
  - set pagination
  - documentation of logic
  
  */

  const clearFilter = (id: string) => updateMachine("CLEAR", { id });
  const updateFilter = (filter: Filter) => updateMachine("UPDATE", { filter });
  const resetFilters = () => updateMachine("RESET");

  const handlePage = (page: number) => updateMachine("PAGE", { page });

  const pageRows = state.context.rowsOG.length === state.context.rowsF.length
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
          clearFilter={clearFilter}
          setFilter={updateFilter}
        />
        <RadioGroup
          key={`radio-color-${state.context.ripcord}`}
          group="colors"
          options={colourOptions}
          clearFilter={clearFilter}
          setFilter={updateFilter}
        />
        <button onClick={resetFilters}>Clear All Filters</button>
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
