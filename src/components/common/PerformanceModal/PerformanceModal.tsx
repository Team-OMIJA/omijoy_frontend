import { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

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
};

type CommonModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  prfId: string | null;
};

function CommonModal({ open, setOpen, prfId }: CommonModalProps) {
  const [data, setData] = useState<PerformanceDetail | null>(null);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/commonmodal/${prfId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("모달 데이터 요청 실패:", err));
  }, [prfId]);

  const handleClose = () => setOpen(false);

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

              {/* 공연 장소 */}
              <Typography sx={{ color: "#ccc" }}>{data.prfPlcNm}</Typography>

              <Box sx={{ height: 8 }} />

              {/* 기간 */}
              <Typography sx={{ color: "#ccc", fontSize: "0.9rem" }}>
                {data.prfStartDt} ~ {data.prfEndDt}
              </Typography>

              {/* 🔹 공연 시간 — 모두 시작시간이므로 ,로 구분 */}
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

              {/* 🔹 가격 줄바꿈 (콤마는 숫자 안에서는 유지, 항목 사이에서만 줄바꿈) */}
              <Typography
                sx={{
                  color: "#bbb",
                  whiteSpace: "pre-line",
                  fontSize: "0.8rem",
                }}
              >
                {" "}
                {(() => {
                  // 1️⃣ 쉼표 기준으로 각 항목 분리
                  const priceArray = data.ticketPrice
                    .split(",")
                    .map((p) => p.trim())
                    .filter((p) => p !== "");

                  // 2️⃣ "석"이 포함된 부분만 남기고 불필요한 숫자 조각 제거
                  const grouped = [];
                  for (let i = 0; i < priceArray.length; i++) {
                    // 다음 항목이 "000원"으로 끝나면 합쳐줌
                    if (
                      priceArray[i + 1] &&
                      /^[0-9]+원$/.test(priceArray[i + 1])
                    ) {
                      grouped.push(`${priceArray[i]},${priceArray[i + 1]}`);
                      i++; // 다음 항목 건너뛰기
                    } else {
                      grouped.push(priceArray[i]);
                    }
                  }

                  // 3️⃣ 두 개씩 묶어서 한 줄로 표시
                  const lines = [];
                  for (let i = 0; i < grouped.length; i += 2) {
                    if (grouped[i + 1]) {
                      lines.push(`${grouped[i]}  ${grouped[i + 1]}`);
                    } else {
                      lines.push(grouped[i]);
                    }
                  }

                  // 4️⃣ 줄바꿈 적용
                  return lines.join("\n");
                })()}
              </Typography>

              {/* 버튼 */}
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
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
                      window.open(data.providerUrl, "_blank"); // 새 탭에서 열기
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
