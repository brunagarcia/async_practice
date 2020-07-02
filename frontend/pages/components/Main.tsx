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
  position: absolute;
  background-image: url(require("../../public/static/banner.png"));
`;

export default function Main() {
  return (
    <PageWrapper>
      {/* Styled Component */}
      <HeaderBanner></HeaderBanner>
      {/* Component holding form and instructions */}
      <Content></Content>
    </PageWrapper>
  );
}
