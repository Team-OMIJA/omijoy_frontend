/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useNavigate } from "react-router-dom";

function DiscountInfoBanner() {
  const navigate = useNavigate();

  const bannerUrl =
    "https://tkfile.yes24.com/Upload2/Display/202509/20250925/wel_mv_dc.png/dims/quality/70/";

  return (
    <s.Container>
      <s.BannerWrapper
        onClick={() => navigate("/discountinfo")}
        style={{ cursor: "pointer" }}
      >
        <s.BackgroundBlur img={bannerUrl} />

        <s.DarkOverlay />

        <s.FullImage src={bannerUrl} />
      </s.BannerWrapper>
    </s.Container>
  );
}

export default DiscountInfoBanner;
