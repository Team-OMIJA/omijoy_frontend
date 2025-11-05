import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

// 박스오피스 전체순위 프록시
app.get("/kopis", async (req, res) => {
  const { service, stdate, eddate } = req.query;
  const url = `http://www.kopis.or.kr/openApi/restful/boxoffice?service=${service}&stdate=${stdate}&eddate=${eddate}&catecode=&area=`;

  try {
    const response = await axios.get(url, { responseType: "text" });
    res.send(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).send("Proxy failed");
  }
});

// 2 카카오맵 행정구역 변환 프록시 추가
app.get("/kakao/coord2region", async (req, res) => {
  const { x, y } = req.query;

  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.VITE_KAKAO_API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Proxy Error (Kakao):",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Kakao API proxy failed" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
