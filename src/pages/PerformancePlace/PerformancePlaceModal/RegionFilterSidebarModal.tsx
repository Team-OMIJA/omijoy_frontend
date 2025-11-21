import { useState } from "react";
import { KOREA_REGIONS } from "../../../utils/regions";
import { FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";
import * as S from "./RegionFilterSidebarModal.styles";

type SidoKey = keyof typeof KOREA_REGIONS;

interface RegionFilterSidebarProps {
  selectedSido: SidoKey | "";
  selectedGugun: string;
  onSidoChange: (sido: SidoKey | "") => void;
  onGugunChange: (gugun: string) => void;
  onApply: () => void;
}

function RegionFilterSidebar({
  selectedSido,
  selectedGugun,
  onSidoChange,
  onGugunChange,
  onApply,
}: RegionFilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <S.SidebarContainer isOpen={isOpen}>
      <S.SidebarToggleButton
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "필터 접기" : "필터 열기"}
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </S.SidebarToggleButton>

      <S.SidebarHeader>
        <FiMapPin /> 지역 필터
      </S.SidebarHeader>
      <S.SidebarContent>
        <S.FilterSection>
          <S.SectionTitle>시 / 도 선택</S.SectionTitle>
          <S.ButtonGrid>
            {Object.keys(KOREA_REGIONS).map((sido) => (
              <S.FilterButton
                key={sido}
                active={selectedSido === sido}
                onClick={() => {
                  onSidoChange(sido as SidoKey);
                  onGugunChange("");
                }}
              >
                {sido}
              </S.FilterButton>
            ))}
          </S.ButtonGrid>
        </S.FilterSection>
        {selectedSido && (
          <S.FilterSection>
            <S.SectionTitle>{selectedSido} 상세 지역</S.SectionTitle>
            <S.ButtonGrid>
              <S.FilterButton
                active={selectedGugun === ""}
                onClick={() => onGugunChange("")}
              >
                전체
              </S.FilterButton>
              {KOREA_REGIONS[selectedSido as SidoKey]?.map((gugun) => (
                <S.FilterButton
                  key={gugun}
                  active={selectedGugun === gugun}
                  onClick={() => onGugunChange(gugun)}
                >
                  {gugun}
                </S.FilterButton>
              ))}
            </S.ButtonGrid>
          </S.FilterSection>
        )}
      </S.SidebarContent>
      <S.SidebarFooter>
        <S.ApplyButton onClick={onApply}>검색</S.ApplyButton>
      </S.SidebarFooter>
    </S.SidebarContainer>
  );
}

export default RegionFilterSidebar;
