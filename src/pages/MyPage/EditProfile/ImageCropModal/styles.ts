/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const modalContainer = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  height: 420,
  backgroundColor: "#111",
  borderRadius: "16px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});

export const cropWrapper = css({
  width: "100%",
  height: "100%",
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
});

export const doneButton = css({
  marginTop: "12px",
  padding: "8px 18px",
  backgroundColor: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  zIndex: 9999,
  "&:hover": {
    backgroundColor: "#ddd",
  },
});
