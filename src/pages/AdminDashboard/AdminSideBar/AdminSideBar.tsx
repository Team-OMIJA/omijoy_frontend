/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FiHome, FiUser, FiDatabase, FiBarChart2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <s.Sidebar>
      <s.Logo>AdminPage</s.Logo>

      {/* 구분선 추가 */}
      <div
        style={{
          height: "2px",
          background: "#2a2f3a",
          margin: "4px 10px",
          marginBottom: "-20px",
        }}
      />

      <s.Menu>
        <li onClick={() => navigate("/adminpage")}>
          <FiHome /> Dashboard
        </li>

        <li>
          <FiBarChart2 /> 통계
        </li>

        <li>
          <FiDatabase /> 공연 관리
        </li>

        <li>
          <FiUser /> 사용자 관리
        </li>
      </s.Menu>
    </s.Sidebar>
  );
}

export default AdminSidebar;
