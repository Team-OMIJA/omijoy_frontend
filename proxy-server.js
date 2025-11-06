import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

// 박스오피스 전체순위 프록시
app.get("/kopis/boxoffice", async (req, res) => {
  const { service, stdate, eddate } = req.query;
  const url = `http://www.kopis.or.kr/openApi/restful/boxoffice?service=${service}&stdate=${stdate}&eddate=${eddate}&catecode=&area=`;

  try {
    const response = await axios.get(url, { responseType: "text" });
    res.send(response.data);
  } catch (error) {
    console.error("Proxy Error (boxoffice):", error.message);
    res.status(500).send("Proxy failed");
  }
});

// 수상작 추천 프록시
app.get("/kopis/awards", async (req, res) => {
  const { service, stdate, eddate } = req.query;
  const url = `http://www.kopis.or.kr/openApi/restful/prfawad?service=${service}&stdate=${stdate}&eddate=${eddate}&cpage=1&rows=100`;

  try {
    const response = await axios.get(url, { responseType: "text" });
    res.send(response.data);
  } catch (error) {
    console.error("Proxy Error (awards):", error.message);
    res.status(500).send("Proxy failed");
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
