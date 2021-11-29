import Styled from "styled-components";

const StyledEmptyState = Styled.h4`
`;

const EmptyState = () => (
  <StyledEmptyState>{"No results found."}</StyledEmptyState>
);

export default EmptyState;
