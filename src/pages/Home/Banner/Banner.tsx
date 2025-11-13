import { Box } from "@mui/material";

function Banner() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        marginBottom: "50px",
      }}
    >
      <Box
        sx={{
          width: "1200px",
          height: "260px",
          backgroundColor: "#e5e7eb",
          borderRadius: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        Banner
      </Box>
    </Box>
  );
}

export default Banner;
