import { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toggleFavoriteReq } from "../../../apis/favoriteApi";
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
function CommonModal({ open, setOpen, prfId, source = "other" }: CommonModalProps) {
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
      if(source === "mypage") {
        setOpen(false);
      }
    }
  };

  const goDetailHandler = () => {
    navigate(`/performance/${prfId}`);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#111",
          color: "#fff",
          borderRadius: "16px",
          p: 4,
          width: 700,
          height: 450,
          display: "flex",
          gap: 4,
          boxShadow: 24,
          overflowY: "auto",
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
              {/* 닫기 버튼 */}
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "#fff",
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* 제목 */}
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mb: 1,
                  mt: 1,
                  fontSize: "1.3rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {data.prfNm}
              </Typography>
              {/* 공연 지역 */}
              <Typography sx={{ color: "#ccc" }}>{data.area}</Typography>
              {/* 공연 장소 */}
              <Typography sx={{ color: "#ccc" }}>{data.prfPlcNm}</Typography>

              <Box sx={{ height: 8 }} />

              {/* 기간 */}
              <Typography sx={{ color: "#ccc", fontSize: "0.9rem" }}>
                {data.prfStartDt} ~ {data.prfEndDt}
              </Typography>

              {/* 공연 시간 - 모두 시작시간이므로 , 로 구분*/}
              <Typography
                sx={{
                  color: "#aaa",
                  fontSize: "0.8rem",
                  whiteSpace: "pre-line",
                  mt: 0.5,
                }}
              >
                {data.dtGuidance
                  // 콤마 뒤에 줄바꿈 추가
                  .replace(/, /g, ", ")
                  .split(", ")
                  .map((part) => part.trim())
                  .join("\n")}
              </Typography>

              {/* 기타 정보 */}
              <Typography sx={{ color: "#bbb", mt: 1, fontSize: "0.9rem" }}>
                ⏱ {data.runtime}
              </Typography>
              <Typography sx={{ color: "#bbb", fontSize: "0.9rem" }}>
                🎭 {data.genreNm}
              </Typography>
              <Typography sx={{ color: "#bbb", fontSize: "0.9rem" }}>
                👶 {data.prfAge}
              </Typography>

              <Box sx={{ height: 8 }} />

              {/* 가격 줄바꿈 (콤마는 숫자 안에서는 유지, 항목 사이에서만 줄바꿈)*/}
              <Typography
                sx={{
                  color: "#bbb",
                  whiteSpace: "pre-line",
                  fontSize: "0.8rem",
                }}
              >
                {(() => {
                  // 쉼표 기준으로 각 항목 분리
                  const priceArray = data.ticketPrice
                    .split(",")
                    .map((p) => p.trim())
                    .filter((p) => p !== "");
                  // "석" 이 포함된 부분만 남기고 불필요한 숫자 조각 제거
                  const grouped = [];
                  for (let i = 0; i < priceArray.length; i++) {
                    if (
                      priceArray[i + 1] &&
                      // 다음 항목이 "000원"으로 끝나면 합쳐줌
                      /^[0-9]+원$/.test(priceArray[i + 1])
                    ) {
                      grouped.push(`${priceArray[i]},${priceArray[i + 1]}`);
                      i++;
                      // 다음 항목 건너뛰기
                    } else {
                      grouped.push(priceArray[i]);
                    }
                  }

                  // 두 개씩 묶어서 한 줄로 표시
                  const lines = [];
                  for (let i = 0; i < grouped.length; i += 2) {
                    if (grouped[i + 1]) {
                      lines.push(`${grouped[i]}  ${grouped[i + 1]}`);
                    } else {
                      lines.push(grouped[i]);
                    }
                  }
                  // 줄바꿈 적용
                  return lines.join("\n");
                })()}
              </Typography>

              {/* ❤️ 좋아요 버튼 */}
              <Box
                sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <IconButton
                  onClick={handleToggleLocalFavorite}
                  sx={{
                    color: isLiked ? "red" : "#777",
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "red", // 마우스 올렸을 때 빨갛게
                      transform: "scale(1.1)", // 살짝 커지는 애니메이션 (선택)
                    },
                  }}
                >
                  {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography sx={{ fontSize: "0.9rem" }}>
                  {isLiked ? "스크랩됨" : "스크랩"}
                </Typography>
              </Box>

              {/* 버튼 */}
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                  onClick={goDetailHandler}
                  variant="contained"
                  sx={{
                    backgroundColor: "#444",
                    "&:hover": { backgroundColor: "#555" },
                    textTransform: "none",
                  }}
                >
                  상세 페이지
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "#666",
                    "&:hover": { borderColor: "#999" },
                    textTransform: "none",
                  }}
                  onClick={() => {
                    if (data.providerUrl) {
                      window.open(data.providerUrl, "_blank");
                      // 새 탭에서 열기
                    } else {
                      alert("예매 링크가 없습니다.");
                    }
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
