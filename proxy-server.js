import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

// 박스오피스 전체순위 프록시
app.get("/kopis", async (req, res) => {
  const { service, stdate, eddate, area } = req.query;
  const url = area
    ? `http://www.kopis.or.kr/openApi/restful/boxoffice?service=${service}&stdate=${stdate}&eddate=${eddate}&catecode=&area=`
    : `http://www.kopis.or.kr/openApi/restful/boxoffice?service=${service}&stdate=${stdate}&eddate=${eddate}&catecode=&area=${area}`;

  try {
    const response = await axios.get(url, { responseType: "text" });
    res.send(response.data);
  } catch (error) {
    console.error("Proxy Error:", error.message);
    res.status(500).send("Proxy failed");
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
