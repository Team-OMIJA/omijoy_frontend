/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const modalContainer = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  height: 420,
  backgroundColor: "#121212",
  borderRadius: "3px",
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
  // borderRadius: "9px",
  overflow: "hidden",
});

export const doneButton = css({
  marginTop: "12px",
  marginLeft: "250px",
  padding: "8px 18px",
  backgroundColor: "#181818ff",
  color: "#fefefeff",
  border: "none",
  borderRadius: "20px",
  cursor: "pointer",
  zIndex: 9999,
  "&:hover": {
    backgroundColor: "#2f2f2fff",
  },
});
