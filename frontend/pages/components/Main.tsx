import styled from "@emotion/styled";
import Content from "./content/Content";

//My styles components:
const PageWrapper = styled.div`
  margin: 0px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
  color: black;
`;

const HeaderBanner = styled.header`
  top: 0px;
  position: sticky;
  height: 350px;
  width: 100%;
  background-size: cover;
  background-image: url("/banner.png");
  background-repeat: no-repeat;
`;

export default function Main() {
  return (
    <PageWrapper>
      {/* Styled Component */}
      <HeaderBanner />
      {/* Component holding form and instructions */}
      <Content></Content>
    </PageWrapper>
  );
}
