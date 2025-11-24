export interface PerformancePlace {
  id: number; // 내부 PK
  prfPlcId: string; // 공연장 ID (FK)
  prfPlcName: string; // 공연장 이름
  prfPlcUrl: string; // 홈페이지 링크
  telNo: string; // 전화번호

  address: string; // 주소
  la: number; // 위도
  lo: number; // 경도

  // 편의시설
  parkBarrier: string; // 장애인 주차장 여부 (Y/N)
  parkingLot: string; // 일반 주차장 여부 (Y/N)
  eleve: string; // 엘리베이터 여부 (Y/N)

  // 프론트에서 관리하는 상태
  flagged: boolean; // 플래그 여부 (유저가 체크한 상태)

  
}
