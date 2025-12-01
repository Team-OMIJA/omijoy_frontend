import * as s from "./AdminSideBarStyles";
import { FiHome, FiUser, FiDatabase, FiBarChart2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FiHome />, label: "Dashboard", path: "/adminpage" },
    { icon: <FiBarChart2 />, label: "통계", path: "/adminpage/statistics" },
    {
      icon: <FiDatabase />,
      label: "공연 관리",
      path: "/adminpage/performances",
    },
    { icon: <FiUser />, label: "사용자 관리", path: "/adminpage/users" },
  ];

  return (
    <s.Sidebar>
      <s.Logo>AdminPage</s.Logo>

      <s.Divider />

      <s.Menu>
        {menuItems.map((item) => (
          <li key={item.label} onClick={() => navigate(item.path)}>
            {item.icon} {item.label}
          </li>
        ))}
      </s.Menu>
    </s.Sidebar>
  );
}

export default AdminSidebar;
