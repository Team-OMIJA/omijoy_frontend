import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getTop1FavoriteForBanner, ScrapRank } from "../../../apis/favoriteApi";
import { formatDateRange } from "../../../components/FormatDate/FormatDate";
import { formatDateDot } from "../../../components/FormatDate/FormatDate";

function Top1Favorite() {
  const [data, setData] = useState<ScrapRank | null>(null);

  useEffect(() => {
    (async () => {
      const top1 = await getTop1FavoriteForBanner();
      setData(top1);
    })();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          height: "370px",
          borderRadius: "18px",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        {/* 블러 배경 이미지 */}
        {data && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${data.posterImgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(14px)",
              transform: "scale(1.1)",
            }}
          ></Box>
        )}

        {/* 어둡게 오버레이 */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.45)",
          }}
        />

        {/* 왼쪽 텍스트 영역 */}
        {data && (
          <Box
            sx={{
              position: "absolute",
              left: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              color: "#fff",
              maxWidth: "60%",
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 500,
                opacity: 0.9,
                marginBottom: "6px",
              }}
            >
              누적 스크랩 수 1위
            </Typography>

            <Typography
              sx={{
                fontSize: "26px",
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: "10px",
                textShadow: "0px 4px 12px rgba(0,0,0,0.5)",
                wordBreak: "keep-all",
                overflowWrap: "break-word",
                whiteSpace: "normal", // 89, 90, 91 단어 단위로 줄바꿈
              }}
            >
              {data.prfName}
            </Typography>

            <Typography
              sx={{
                fontSize: "15px",
                color: "#ddd",
              }}
            >
              {formatDateRange(
                formatDateDot(data.prfStartDt),
                formatDateDot(data.prfEndDt)
              )}
            </Typography>
          </Box>
        )}

        {/* 오른쪽 포스터 이미지 */}
        {data && (
          <Box
            component="img"
            src={data.posterImgUrl}
            alt={data.prfName}
            sx={{
              position: "absolute",
              right: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "180px",
              height: "260px",
              objectFit: "cover",
              borderRadius: "10px",
              zIndex: 2,
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default Top1Favorite;
