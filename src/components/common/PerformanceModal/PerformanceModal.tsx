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
  prfId: string;
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

  // zustand
  const {
    favorites,
    fetchFavoriteState,
    toggleFavorite,
    removeFromFavoriteList,
    fetchFavoriteCount,
  } = useFavoriteState();

  const navigate = useNavigate();

  // 모달 UI 전용 좋아요 상태 (하트 / 카운트)(DB요청 안감)
  const [localLiked, setLocalLiked] = useState(false);
  const [localScrapCount, setLocalScrapCount] = useState(0);

  // 모달이 열릴 때 공연 정보 + 좋아요 상태 불러옴
  useEffect(() => {
    if (!open || !prfId) return;

    const fetchData = async () => {
      // 서버에서 모달 데이터 가져옴
      const response = await instance.get(`/commonmodal/${prfId}`);
      setData(response.data);

      // 사용자 좋아요 여부 로드 - zustand
      const serverLiked = await fetchFavoriteState(prfId);

      // 좋아요 카운트 로드 - zustand
      await fetchFavoriteCount(prfId);

      // UI 상태 세팅
      setLocalLiked(serverLiked);
      // 비동기라서 해당 타이밍에 값이 변경되지 않았을 가능성 있음
      setLocalScrapCount(useFavoriteState.getState().favoriteCount[prfId] ?? 0);
    };
    fetchData();
  }, [open, prfId]);

  // UI에서 하트를 누를 때 서버 요청 없이 UI 상태만 변경
  const handleToggleLocalFavorite = async () => {
    // 반전시켜야 토글됨
    const newLiked = !localLiked;
    setLocalLiked(newLiked);

    // 카운트 UI 즉시 반영
    setLocalScrapCount((prev) => (newLiked ? prev + 1 : Math.max(prev - 1, 0)));

    // 마이페이지에서 스크랩 취소 시
    // 서버 반영 + 리스트 제거 + 모달 닫기
    if (source === "mypage" && newLiked === false) {
      await toggleFavorite(prfId);
      removeFromFavoriteList(prfId);
      setOpen(false);
    }
  };

  // 모달 닫힐 대 변경된 좋아요 상태만 최종 DB 반영
  const handleClose = async () => {
    if (source !== "mypage") {
      if (prfId && localLiked !== favorites[prfId]) {
        await toggleFavorite(prfId); // 서버 요청 1회
      }
    }

    // MyPage에서 스크랩 취소 시 리스트에서 제거 - 모달 닫음

    if (source === "mypage" && localLiked === false) {
      removeFromFavoriteList(prfId);
    }

    setOpen(false);
  };

  // 상세페이지 전환
  const goDetailHandler = () => navigate(`/performance/${prfId}`);

  // 티켓 판매처 페이지
  const goTicketHandler = () => {
    if (data?.providerUrl) {
      window.open(data.providerUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!prfId) return null;

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
      sx={{ backdropFilter: "blur(3px)", backgroundColor: "rgba(0,0,0,0.25)" }}
    >
      <s.ModalContainer>
        <s.Poster src={data.posterImgUrl} alt={data.prfNm} />

        <s.InfoWrapper>
          {/* 상단 버튼 */}
          <s.TopRightButtons>
            <s.HeartWrapper>
              <IconButton
                onClick={handleToggleLocalFavorite}
                sx={{
                  color: localLiked ? "red" : "#888",
                  "&:hover": { color: "red", transform: "scale(1.1)" },
                }}
              >
                {localLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>

              {localScrapCount > 0 && (
                <s.ScrapCountText>{localScrapCount}</s.ScrapCountText>
              )}
            </s.HeartWrapper>

            <IconButton
              onClick={handleClose}
              sx={{ color: "#777", "&:hover": { color: "#aaa" } }}
            >
              <CloseIcon />
            </IconButton>
          </s.TopRightButtons>

          {/* 제목 */}
          <s.Title>{removeRegionTag(data.prfNm)}</s.Title>

          {/* 장소 */}
          <Typography sx={{ color: "#dbdbdb" }}>{data.prfPlcNm}</Typography>
          {/* 지역 */}
          <Typography
            sx={{ color: "#a3a3a3", fontSize: "0.9rem", marginTop: "3px" }}
          >
            {data.area}
          </Typography>

          <Box sx={{ height: 8 }} />
          {/* 기간 */}
          <Typography
            sx={{
              color: "#a3a3a3",
              fontSize: "0.9rem",
              marginTop: "3px",
              marginBottom: "8px",
            }}
          >
            {data.prfStartDt} ~ {data.prfEndDt}
          </Typography>

          {/* 관람시간 */}
          <s.InfoText>
            <AccessTimeIcon sx={{ fontSize: 18, marginRight: "6px" }} />
            {data.runtime?.trim() || "예매처 참고"}
          </s.InfoText>

          {/* 장르 */}
          <s.InfoText>
            <TheaterComedyIcon sx={{ fontSize: 18, marginRight: "6px" }} />
            {/* {" "} */}
            {data.genreNm}
          </s.InfoText>

          <s.InfoText>
            <ChildCareIcon sx={{ fontSize: 18, marginRight: "6px" }} />{" "}
            {data.prfAge}
          </s.InfoText>

          {/* 가격 타이틀*/}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#a3a3a3",
              marginTop: "8px",
            }}
          >
            <ConfirmationNumberIcon sx={{ fontSize: 18, marginRight: "6px" }} />
            <Typography sx={{ fontSize: "0.9rem" }}>가격</Typography>
          </Box>
          {/* 가격 */}
          <s.PriceText>
            {/* {data.ticketPrice || "예매처 참고"} */}
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
