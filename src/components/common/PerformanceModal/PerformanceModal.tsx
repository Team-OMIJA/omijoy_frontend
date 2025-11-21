import { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { instance } from "../../../apis/instance";
import { useFavoriteState } from "../../../stores/useFavoriteState";
import { useNavigate } from "react-router-dom";

type PerformanceDetail = {
  prfId: string;
  posterImgUrl: string;
  prfNm: string;
  prfPlcNm: string;
  area: string;
  prfStartDt: string;
  prfEndDt: string;
  dtGuidance: string;
  runtime: string;
  genreNm: string;
  prfAge: string;
  ticketPrice: string;
  providerUrl: string;
  favorited: boolean;
};

type CommonModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  prfId: string | null;
  // 메인 - 마이페이지 스크랩이 다르게 작동해서 마이페이지에서 열린 상태를 추가적으로 넘겨줌. 일종의 tag
  source?: "mypage" | "other";
};

// other = 기본값 set
function CommonModal({
  open,
  setOpen,
  prfId,
  source = "other",
}: CommonModalProps) {
  const [data, setData] = useState<PerformanceDetail | null>(null);
  // zustand로 관리
  const {
    favorites,
    fetchFavoriteState,
    toggleFavorite,
    removeFromFavoriteList,
  } = useFavoriteState();
  const isLiked = prfId ? favorites[prfId] ?? false : false;
  const navigate = useNavigate();

  // [지역] 제거
  const removeRegionTag = (text: string) => {
    return text.replace(/\[.*?\]/g, "").trim();
  };

  // 모달이 열릴 때 공연 정보 + 좋아요 상태 불러옴
  useEffect(() => {
    if (!open || !prfId) return;

    const fetchData = async () => {
      try {
        //  setIsLiked((prev) => !prev);
        //  await toggleFavoriteReq(prfId);

        const response = await instance.get(`/commonmodal/${prfId}`);
        setData(response.data);

        // 서버에서 현재 사용자의 좋아요 여부 함께 반환(백엔드에서 boolean favorited 로 정의 해놨음 )
        // zustand 전역상태에서도 현재 좋아요 여부 반영
        await fetchFavoriteState(prfId);
      } catch (error) {
        console.error("모달 데이터 요청 실패 : ", error);
      }
    };

    fetchData();
  }, [open, prfId]);

  // 모달 닫을 때 최종 상태가 바뀌었다면 DB 반영
  // favorite 누를때 마다 요청 x
  const handleClose = async () => {
    setOpen(false);
  };

  const handleToggleLocalFavorite = async () => {
    if (!prfId) return;
    await toggleFavorite(prfId);

    // 최신 zustand 상태 얻기
    const newState = useFavoriteState.getState().favorites[prfId];

    // 좋아요 취소일 때만 리스트에서 제거
    if (!newState) {
      removeFromFavoriteList(prfId);
      // 마이페이지에서 스크랩 취소 시 모달 닫힘
      if (source === "mypage") {
        setOpen(false);
      }
    }
  };

  const goDetailHandler = () => {
    navigate(`/performance/${prfId}`);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(0,0,0,0.25)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#0f0f0f",
          color: "#e0e0e0",
          borderRadius: "10px",
          p: 4,
          width: 750,
          display: "flex",
          gap: 4,
          overflowY: "auto",

          outline: "2px solid #b7b7b7",
          outlineOffset: "-2px",
        }}
      >
        {data ? (
          <>
            {/* 포스터 */}
            <img
              src={data.posterImgUrl}
              alt={data.prfNm}
              style={{
                width: 200,
                height: 280,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />

            {/* 오른쪽 정보 */}
            <Box sx={{ flex: 1, position: "relative" }}>
              {/* 상단 버튼(좋아요 + 닫기) */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <IconButton
                  onClick={handleToggleLocalFavorite}
                  sx={{
                    color: isLiked ? "red" : "#888",
                    "&:hover": {
                      color: "red",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>

                <IconButton
                  onClick={handleClose}
                  sx={{
                    color: "#777",
                    "&:hover": { color: "#aaa" },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* 제목 */}
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mb: 1,
                  mt: 1,
                  fontSize: "1.5rem",
                  pr: 6, // 버튼 영역과 겹치지 않도록 패딩
                }}
              >
                {removeRegionTag(data.prfNm)}
              </Typography>

              {/* 장소 */}
              <Typography sx={{ color: "#dbdbdb" }}>{data.prfPlcNm}</Typography>

              {/* 지역 */}
              <Typography sx={{ color: "#dbdbdb", fontSize: "0.9rem" }}>
                {data.area}
              </Typography>

              <Box sx={{ height: 8 }} />

              {/* 기간 */}
              <Typography sx={{ color: "#dbdbdb", fontSize: "0.9rem" }}>
                {data.prfStartDt} ~ {data.prfEndDt}
              </Typography>

              {/* 공연 시간 */}
              <Typography
                sx={{
                  color: "#a3a3a3",
                  fontSize: "0.8rem",
                  whiteSpace: "pre-line",
                  mt: 0.5,
                }}
              >
                {data.dtGuidance
                  .replace(/, /g, ", ")
                  .split(", ")
                  .map((part) => part.trim())
                  .join("\n")}
              </Typography>

              {/* 기타 정보 */}
              <Typography sx={{ color: "#a3a3a3", mt: 1, fontSize: "0.9rem" }}>
                ⏱ {data.runtime}
              </Typography>
              <Typography sx={{ color: "#a3a3a3", fontSize: "0.9rem" }}>
                🎭 {data.genreNm}
              </Typography>
              <Typography sx={{ color: "#a3a3a3", fontSize: "0.9rem" }}>
                👶 {data.prfAge}
              </Typography>

              <Box sx={{ height: 8 }} />

              {/* 가격 줄바꿈 처리 */}
              <Typography
                sx={{
                  color: "#a3a3a3",
                  whiteSpace: "pre-line",
                  fontSize: "0.8rem",
                }}
              >
                {(() => {
                  const priceArray = data.ticketPrice
                    .split(",")
                    .map((p) => p.trim())
                    .filter((p) => p !== "");

                  const grouped = [];
                  for (let i = 0; i < priceArray.length; i++) {
                    if (
                      priceArray[i + 1] &&
                      /^[0-9]+원$/.test(priceArray[i + 1])
                    ) {
                      grouped.push(`${priceArray[i]},${priceArray[i + 1]}`);
                      i++;
                    } else {
                      grouped.push(priceArray[i]);
                    }
                  }

                  const lines = [];
                  for (let i = 0; i < grouped.length; i += 2) {
                    if (grouped[i + 1])
                      lines.push(`${grouped[i]}  ${grouped[i + 1]}`);
                    else lines.push(grouped[i]);
                  }

                  return lines.join("\n");
                })()}
              </Typography>

              {/* 아래 버튼들 */}
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                  onClick={goDetailHandler}
                  variant="contained"
                  sx={{
                    backgroundColor: "#3A3A3A",
                    "&:hover": { backgroundColor: "#2C2C2C" },
                    color: "#dbdbdb",
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  상세 페이지
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#eab308",
                    color: "#1a1a1a",
                    px: 3,
                    "&:hover": { backgroundColor: "#facc15" },
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  예매 바로가기 →
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Typography sx={{ textAlign: "center", width: "100%" }}>
            공연 정보를 불러오는 중입니다...
          </Typography>
        )}
      </Box>
    </Modal>
  );
}

export default CommonModal;
