import { useState } from "react";
import { KOREA_REGIONS } from "../../../utils/regions";
import { FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi";
import "../PerformancePlace/PerformancePlaceStyles.css";

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
    <div className={`sidebar-container ${isOpen ? "" : "closed"}`}>
    
      <button 
        className="sidebar-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "필터 접기" : "필터 열기"}
      >
        {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
      </button>

      <div className="sidebar-header">
        <FiMapPin /> 지역 필터
      </div>
      <div className="sidebar-content">
        <div className="filter-section">
          <div className="section-title">시 / 도 선택</div>
          <div className="button-grid">
            {Object.keys(KOREA_REGIONS).map((sido) => (
              <button
                key={sido}
                className={`filter-btn ${selectedSido === sido ? "active" : ""}`}
                onClick={() => {
                  onSidoChange(sido as SidoKey);
                  onGugunChange("");
                }}
              >
                {sido}
              </button>
            ))}
          </div>
        </div>
        {selectedSido && (
          <div className="filter-section">
            <div className="section-title">{selectedSido} 상세 지역</div>
            <div className="button-grid">
              <button
                className={`filter-btn ${selectedGugun === "" ? "active" : ""}`}
                onClick={() => onGugunChange("")}
              >
                전체
              </button>
              {KOREA_REGIONS[selectedSido as SidoKey]?.map((gugun) => (
                <button
                  key={gugun}
                  className={`filter-btn ${selectedGugun === gugun ? "active" : ""}`}
                  onClick={() => onGugunChange(gugun)}
                >
                  {gugun}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="sidebar-footer">
        <button className="apply-btn" onClick={onApply}>
          검색
        </button>
      </div>
    </div>
  );
}

export default RegionFilterSidebar;