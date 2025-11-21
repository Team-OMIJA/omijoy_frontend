export interface BasePerformance {
  id: string;
  poster: string;
  title: string;
  place: string;
  genre: string;
}

export interface TopRankPerformance extends BasePerformance {
  period: string;
  rank: string;
}

export interface AwardPerformance extends BasePerformance {
  stDate: string;
  edDate: string;
  awards: string;
}

// 백엔드 구조 그대로 사용
export interface UpcomingPerformance {
  prfId: string;
  posterImgUrl: string;
  prfNm: string;
  prfPlcNm: string;
  prfStartDt: string;
  prfEndDt: string;
  genreNm: string;
}

// KidPrfs for Banner
export interface KidsNewPerformancs {
  prfId: string;
  prfNm: string;
  posterImgUrl: string;
  prfStartDt: string;
  prfEndDt: string;
}
