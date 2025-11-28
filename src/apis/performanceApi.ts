import axios from 'axios';
import { TopRankPerformance, AwardPerformance, UpcomingPerformance, KidsNewPerformancs } from '../types/homePageTypes';
import { PerformanceDetailPage } from '../types/performancePageTypes';
import { formatNewDate, formatPeriod } from '../components/FormatDate/FormatDate';
import { removeRegionTag } from '../components/removeRegionTag/removeRegionTag';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// TopRankList
export const fetchTopRankPerformances = async (genreCode = ''): Promise<TopRankPerformance[]> => {  // genreCode = '' 추가
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 30);

  const stDate = formatNewDate(pastDate);
  const edDate = formatNewDate(today);

  const url = `${BASE_URL}/kopis/boxoffice?stdate=${stDate}&eddate=${edDate}&catecode=${genreCode}&area=`;  // ${genreCode} 추가

  try {
    const response = await axios.get(url, { responseType: 'text' });
    const parser = new DOMParser();
    const xmlData = parser.parseFromString(response.data, 'text/xml');
    const boxList = xmlData.getElementsByTagName('boxof');

    const result = Array.from(boxList).map((box) => ({
      id: box.getElementsByTagName('mt20id')[0]?.textContent || '',
      title: removeRegionTag(box.getElementsByTagName('prfnm')[0]?.textContent || ''),
      place: box.getElementsByTagName('prfplcnm')[0]?.textContent || '',
      poster: box.getElementsByTagName('poster')[0]?.textContent || '',
      period: formatPeriod(box.getElementsByTagName('prfpd')[0]?.textContent || ''),
      rank: box.getElementsByTagName('rnum')[0]?.textContent || '',
      genre: box.getElementsByTagName('cate')[0]?.textContent || '',
    }));

    return result.slice(0, 10);
  } catch (err) {
    console.error('Failed to fetch KOPIS API', err);
    return [];
  }
};

// AwardRecommendList
export const fetchAwardPerformances = async (): Promise<AwardPerformance[]> => {
  try {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 6);

    const stDate = formatNewDate(today);
    const edDate = formatNewDate(futureDate);

    const url = `${BASE_URL}/kopis/awards?&stdate=${stDate}&eddate=${edDate}&cpage=1&rows=100`;

    const res = await axios.get(url, { responseType: 'text' });
    const parser = new DOMParser();
    const xml = parser.parseFromString(res.data, 'text/xml');

    const allPerformances: AwardPerformance[] = Array.from(xml.getElementsByTagName('db')).map((item) => ({
      id: item.getElementsByTagName('mt20id')[0]?.textContent || '',
      poster: item.getElementsByTagName('poster')[0]?.textContent || '',
      title: removeRegionTag(item.getElementsByTagName('prfnm')[0]?.textContent || ''),
      place: item.getElementsByTagName('fcltynm')[0]?.textContent || '',
      stDate: item.getElementsByTagName('prfpdfrom')[0]?.textContent || '',
      edDate: item.getElementsByTagName('prfpdto')[0]?.textContent || '',
      genre: item.getElementsByTagName('genrenm')[0]?.textContent || '',
      awards: item.getElementsByTagName('awards')[0]?.textContent || '',
    }));

    // 중복 제거 (제목에서 [지역] 제외하고 비교)
    const uniquePerformances = allPerformances.filter((item, index, self) => {
      const baseTitle = item.title.replace(/\[.*?\]/g, '').trim();
      return (
        index ===
        self.findIndex((t) => {
          const compareTitle = t.title.replace(/\[.*?\]/g, '').trim();
          return compareTitle === baseTitle;
        })
      );
    });

    return uniquePerformances;
  } catch (error) {
    console.error('Failed to fetch award performances:', error);
    return [];
  }
};

// UpcomingList
export const getUpcomingPerformances = async (): Promise<UpcomingPerformance[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/performances/upcoming`);

    return (response.data as UpcomingPerformance[]).map((p) => ({
      ...p,
      prfNm: removeRegionTag(p.prfNm),
    }));
  } catch (err) {
    console.error('Failed to get upcoming data from server', err);
    return [];
  }
};

// KidPrfs for Banner
export const fetchKidsPrfsThisMonth = async (): Promise<KidsNewPerformancs[]> => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  try {
    const res = await axios.get(`${BASE_URL}/performances/kids`);
    return res.data;
  } catch (err) {
    console.error('Failed to fetch kidsNewPerformances data from server', err);
    return [];
  }
};

// 공연 상세페이지 정보
export const fetchPerformanceDetail = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/prfDetails/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch performance detail');
    }
    const data: PerformanceDetailPage = await res.json();
    return data;
  } catch (error) {
    console.error('공연 상세 정보 API 실패:', error);
    throw error;
  }
};