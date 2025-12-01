import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";

import * as s from "../PerformanceStyles";
import * as ts from "./styles";

import PerformanceModal from "../../../components/common/PerformanceModal/PerformanceModal";
import PrfListSkeleton from "../../../components/skeleton/PrfListSkeleton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { fetchTopRankPerformances } from "../../../apis/performanceApi";
import { TopRankPerformance } from "../../../types/homePageTypes";

function TopRankList() {
  const [performances, setPerformances] = useState<TopRankPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPrfId, setSelectedPrfId] = useState<string>("");

  // 추가
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const navigate = useNavigate();

  // 추가
  const autoplay = useRef(Autoplay({ delay: 4000 })); 

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchTopRankPerformances(selectedGenre);
      setPerformances(data);
      setLoading(false);
    };
    load();
  }, [selectedGenre]); // selectedGenre 추가

  // 추가
  const handleGenreChange = (genreCode: string) => {
    setSelectedGenre(genreCode);
  };  

  return (
    <s.SectionContainer>
      <s.SectionHeader>
        <s.SectionTitle>전체 공연 순위</s.SectionTitle>
        <s.SectionSubTitle>TOP 10</s.SectionSubTitle>

        <ts.MoreButton onClick={() => navigate("/performance")}>
          <ArrowForwardIosIcon style={{ fontSize: 22 }} />
        </ts.MoreButton>
      </s.SectionHeader>

      <ts.GenreFilter>
        <ts.GenreButton selected={selectedGenre === ""}onClick={() => handleGenreChange("")}>전체</ts.GenreButton>
        <ts.GenreButton selected={selectedGenre === "BBBE"}onClick={() => handleGenreChange("BBBE")}>대중무용</ts.GenreButton>
        <ts.GenreButton selected={selectedGenre === "CCCD"}onClick={() => handleGenreChange("CCCD")}>대중음악</ts.GenreButton>
        <ts.GenreButton selected={selectedGenre === "BBBC"}onClick={() => handleGenreChange("BBBC")}>무용(서양/한국무용)</ts.GenreButton>
        <ts.GenreButton selected={selectedGenre === "GGGA"}onClick={() => handleGenreChange("GGGA")}>뮤지컬</ts.GenreButton>
        <ts.GenreButton selected={selectedGenre === "CCCA"}onClick={() => handleGenreChange("CCCA")}>서양음악(클래식)</ts.GenreButton>
        <ts.GenreButton selected={selectedGenre === "EEEB"}onClick={() => handleGenreChange("EEEB")}>서커스/마술</ts.GenreButton>
        <ts.GenreButton selected={selectedGenre === "AAAA"}onClick={() => handleGenreChange("AAAA")}>연극</ts.GenreButton>
        <ts.GenreButton selected={selectedGenre === "CCCC"}onClick={() => handleGenreChange("CCCC")}>한국음악(국악)</ts.GenreButton>
      </ts.GenreFilter>

      {loading ? (
        <PrfListSkeleton />
      ) : (
        <div style={{ width: "100%", position: "relative" }}>
          <Carousel
            slideSize="20%"
            slideGap="30px"
            height={470}
            withControls={false}
            plugins={[autoplay.current]}
            emblaOptions={{
              align: "start",
              dragFree: true,
              slidesToScroll: 1,
            }}
          >
            {performances.map((p, i) => (
              <Carousel.Slide key={i}>
                <s.PerformanceCard>
                  <ts.RankCard
                    onClick={() => {
                      setSelectedPrfId(p.id);
                      setOpen(true);
                    }}
                  >
                    <ts.RankImage src={p.poster} alt={p.title} />
                    <ts.RankOverlay />
                    <ts.RankNumber>{p.rank}</ts.RankNumber>
                  </ts.RankCard>

                  <s.PerformanceTitle>{p.title}</s.PerformanceTitle>
                  <s.PerformancePlace>{p.place}</s.PerformancePlace>
                  <s.PerformancePeriod>{p.period}</s.PerformancePeriod>
                  <s.PerformanceGenre>{p.genre}</s.PerformanceGenre>
                </s.PerformanceCard>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      )}

      <PerformanceModal open={open} setOpen={setOpen} prfId={selectedPrfId} />
    </s.SectionContainer>
  );
}

export default TopRankList;