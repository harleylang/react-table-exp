import styled from "styled-components";

import Input from "components/Input";
import RadioGroup from "components/RadioGroup";
import Table from "components/Table";

import data from "./data";

const Example1 = () => {
  const { header, rows } = data;
  const colourOptions = rows
    .map((r) => r[2])
    .filter((v, i, a) => a.indexOf(v) === i);
  return (
    <Container>
      <h3>Example 1</h3>
      <FilterRow>
        <Input min={0} max={10} val={0} type={"number"} />
        <RadioGroup group="colors" options={colourOptions} />
      </FilterRow>
      <Table header={header} rows={rows} />
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
