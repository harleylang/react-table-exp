import { useMachine } from "@xstate/react";
import styled from "styled-components";

import Input from "components/Input";
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
    headerOG: header,
    rowsOG: rows,
    header: header,
    rows: rows,
  }
);

const Example1 = () => {
  const [state, useState] = useMachine(TableStateMachine, { devTools: true });

  const updateFilter = (filter: Filter) => useState("UPDATE", { filter });

  return (
    <Container>
      <h3>Example 1</h3>
      <FilterRow>
        <Input
          min={0}
          max={10}
          val={10}
          type={"number"}
          setFilter={updateFilter}
        />
        <RadioGroup
          group="colors"
          options={colourOptions}
          setFilter={updateFilter}
        />
      </FilterRow>
      <Table header={state.context.header} rows={state.context.rows} />
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
