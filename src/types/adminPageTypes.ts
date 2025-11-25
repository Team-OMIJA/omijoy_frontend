export type WeeklyView = {
  createDt: string;
  views: number;
};

export type ScrapRank = {
  prfId: string;
  prfName: string;
  scrapCount: number;
  posterImgUrl: string;
  prfStartDt: string;
  prfEndDt: string;
};

export type NewSignUps = {
  dayOfMonth: number;
  signUpCount: number;
};
