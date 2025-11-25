import { useEffect, useState } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { instance } from "../../../apis/instance";
import { useFavoriteState } from "../../../stores/useFavoriteState";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { PerformanceDetail } from "../../../types/homePageTypes";
import { removeRegionTag } from "../../removeRegionTag/removeRegionTag";
import * as s from "./styles";

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
    if (!prfId || !data) return;
    await toggleFavorite(prfId);

    // 로컬 UI scrapCount 즉시 업데이트
    setData((prev) =>
      prev
        ? {
            ...prev,
            scrapCount: isLiked
              ? Math.max((prev.scrapCount ?? 0) - 1, 0) // 최소값을 0으로 고정하기 위해 사용
              : (prev.scrapCount ?? 0) + 1,
          }
        : prev
    );

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

  const goTicketHandler = () => {
    if (data?.providerUrl) {
      window.open(data.providerUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!data) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          backdropFilter: "blur(3px)",
          backgroundColor: "rgba(0,0,0,0.25)",
        }}
      >
        <s.ModalContainer>
          <Typography sx={{ textAlign: "center", width: "100%" }}>
            공연 정보를 불러오는 중...
          </Typography>
        </s.ModalContainer>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(0,0,0,0.25)",
      }}
    >
      <s.ModalContainer>
        {/* 포스터 */}
        <s.Poster src={data.posterImgUrl} alt={data.prfNm} />

        {/* 오른쪽 정보 */}
        <s.InfoWrapper>
          {/* 상단 버튼(하트 + 닫기) */}
          <s.TopRightButtons>
            {/* 하트 */}
            <s.HeartWrapper>
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

              {/* scrapCount > 0 일 때만 표시 */}
              {data?.scrapCount > 0 && (
                <s.ScrapCountText>{data.scrapCount}</s.ScrapCountText>
              )}
            </s.HeartWrapper>

            {/* X 버튼 */}
            <IconButton
              onClick={handleClose}
              sx={{
                color: "#777",
                "&:hover": { color: "#aaa" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </s.TopRightButtons>

          {/* 제목 */}
          <s.Title>{removeRegionTag(data.prfNm)}</s.Title>

          {/* 장소 */}
          <Typography sx={{ color: "#dbdbdb" }}>{data.prfPlcNm}</Typography>

          {/* 지역 */}
          <Typography sx={{ color: "#a3a3a3", fontSize: "0.9rem" }}>
            {data.area}
          </Typography>

          <Box sx={{ height: 8 }} />

          {/* 기간 */}
          <Typography sx={{ color: "#dbdbdb", fontSize: "0.9rem" }}>
            {data.prfStartDt} ~ {data.prfEndDt}
          </Typography>

          {/* 관람시간 */}
          <s.InfoText>
            <AccessTimeIcon sx={{ fontSize: 18, marginRight: "6px" }} />
            {data.runtime?.trim() ? data.runtime : "예매처 참고"}
          </s.InfoText>

          {/* 장르 */}
          <s.InfoText>
            <TheaterComedyIcon sx={{ fontSize: 18, marginRight: "6px" }} />
            {data.genreNm}
          </s.InfoText>

          {/* 관람등급 */}
          <s.InfoText>
            <ChildCareIcon sx={{ fontSize: 18, marginRight: "6px" }} />
            {data.prfAge}
          </s.InfoText>

          {/* 가격 타이틀 */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#a3a3a3",
              marginTop: "6px",
            }}
          >
            <ConfirmationNumberIcon sx={{ fontSize: 18, marginRight: "6px" }} />
            <Typography sx={{ fontSize: "0.9rem" }}>가격</Typography>
          </Box>

          {/* 가격 */}
          <s.PriceText>
            {(() => {
              if (!data?.ticketPrice || !data.ticketPrice.trim()) {
                return "예매처 참고";
              }

              const priceArray = data.ticketPrice
                .split(",")
                .map((p) => p.trim())
                .filter((p) => p !== "");

              const grouped: string[] = [];
              for (let i = 0; i < priceArray.length; i++) {
                if (priceArray[i + 1] && /^[0-9]+원$/.test(priceArray[i + 1])) {
                  grouped.push(`${priceArray[i]},${priceArray[i + 1]}`);
                  i++;
                } else {
                  grouped.push(priceArray[i]);
                }
              }

              const lines: string[] = [];
              for (let i = 0; i < grouped.length; i += 2) {
                if (grouped[i + 1])
                  lines.push(`${grouped[i]}  ${grouped[i + 1]}`);
                else lines.push(grouped[i]);
              }

              return lines.join("\n");
            })()}
          </s.PriceText>

          {/* 하단 버튼 */}
          <s.BottomButtons>
            <s.DetailButton onClick={goDetailHandler}>
              상세 페이지
            </s.DetailButton>

            <s.TicketButton onClick={goTicketHandler}>
              예매 바로가기 →
            </s.TicketButton>
          </s.BottomButtons>
        </s.InfoWrapper>
      </s.ModalContainer>
    </Modal>
  );
}

export default CommonModal;
