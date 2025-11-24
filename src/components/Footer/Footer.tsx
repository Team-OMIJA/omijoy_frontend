import * as s from "./styles";

export default function Footer() {
  return (
    <s.Wrapper>
      <s.Container>
        <s.Title>OMIJOY</s.Title>
        <s.Item>Performance data provided by KOPIS API</s.Item>
        <s.Item>Contact: omijoy.contact@gmail.com</s.Item>

        <div style={{ marginTop: "12px", opacity: 0.7 }}>
          © {new Date().getFullYear()} OMIJOY. All Rights Reserved.
        </div>
      </s.Container>
    </s.Wrapper>
  );
}
