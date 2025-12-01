/** @jsxImportSource @emotion/react */
import * as s from "./FooterStyles";

export default function Footer() {
  return (
    <s.Wrapper>
      <s.Container>
        <s.Title>OMIJOY</s.Title>
        <s.Item>Performance data provided by KOPIS API</s.Item>
        <s.Item>Contact: omijoy.contact@gmail.com</s.Item>

        <s.Copyright>
          © {new Date().getFullYear()} OMIJOY. All Rights Reserved.
        </s.Copyright>
      </s.Container>
    </s.Wrapper>
  );
}
