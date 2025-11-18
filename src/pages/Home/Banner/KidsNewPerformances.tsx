import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetchKidsPrfsThisMonth } from "../../../apis/performanceApi";
import { KidsNewPerformancs } from "../../../types/homeTypes";
import { removeRegionTag } from "../../../apis/performanceApi";
import {
  formatDateRange,
  formatDateDot,
} from "../../../components/FormatDate/FormatDate";

function KidsNewPerformances() {
  // AwardRecommendList와 동일한 데이터 구조
  const [allData, setAllData] = useState<KidsNewPerformancs[]>([]);
  const [visibleData, setVisibleData] = useState<KidsNewPerformancs[]>([]);

  // 랜덤 3개 선택 (수상작의 pickRandomFive와 동일한 방식)
  const pickRandomThree = (arr: KidsNewPerformancs[]) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, 3);
  };

  // 첫 로딩 시 한 번만 랜덤 3개 선택
  useEffect(() => {
    (async () => {
      const data = await fetchKidsPrfsThisMonth();

      if (data && data.length > 0) {
        setAllData(data); // 전체 저장
        setVisibleData(pickRandomThree(data)); // 랜덤 3개 뽑기
      }
    })();
  }, []);

  // 데이터 준비 전에 렌더링 방지
  if (visibleData.length < 3) return null;

  const backgroundPoster = visibleData[0].posterImgUrl;

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
        }}
      >
        {/* 🔹 흐린 배경 이미지 */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${backgroundPoster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
            transform: "scale(1.1)",
          }}
        />

        {/* 🔹 어둡게 덮기 */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />

        {/* 🔹 상단 중앙 제목 */}
        <Typography
          sx={{
            position: "absolute",
            top: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontSize: "22px",
            fontWeight: 600,
            zIndex: 5,
            textAlign: "center",
          }}
        >
          이번 달 아이들이랑 보러가기 좋은 신규 공연 추천
        </Typography>

        {/* 🔹 메인 콘텐츠: 3개 카드 */}
        <Box
          sx={{
            position: "absolute",
            bottom: "25px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            zIndex: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          {visibleData.map((item, i) => (
            <Box
              key={i}
              sx={{
                width: "33%",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                borderRadius: "12px",
                padding: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "white",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.25)",
              }}
            >
              {/* 포스터 */}
              <img
                src={item.posterImgUrl}
                alt={item.prfNm}
                style={{
                  height: "180px",
                  width: "125px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                }}
              />

              {/* 제목 */}
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 600,
                  textAlign: "center",
                  marginBottom: "6px",
                  textShadow: "0px 2px 6px rgba(0,0,0,0.5)",
                  wordBreak: "keep-all",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {removeRegionTag(item.prfNm)}
              </Typography>

              {/* 날짜 */}
              <Typography
                sx={{
                  fontSize: "14px",
                  opacity: 0.9,
                }}
              >
                {formatDateRange(
                  formatDateDot(item.prfStartDt),
                  formatDateDot(item.prfEndDt)
                )}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default KidsNewPerformances;
