import styled from "styled-components";

const PageNav = ({
  pages,
  current,
  setPage,
}: {
  pages: number;
  current: number;
  setPage: (page: number) => void;
}) => {
  const handlePage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let target = e.currentTarget.getAttribute("data-value");
    let tint = target && parseInt(target);
    if (tint && tint !== current) setPage(tint);
  };

  return (
    <Container>
      {Array.from({ length: pages }, (_, i) => i + 1).map((i) => (
        <button
          key={`pagenav-button-${i}`}
          disabled={current === i}
          data-value={i}
          onClick={handlePage}
        >
          {i}
        </button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  & > * {
    margin-right: 16px;
  }
`;

export default PageNav;
