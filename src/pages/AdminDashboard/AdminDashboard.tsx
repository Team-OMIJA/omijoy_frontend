import MonthlyNewSignUps from "../AdminDashboard/MonthlyNewSignUps/MonthlyNewSignUps";
import ScrapTop10List from "../AdminDashboard/ScrapTop10List/ScrapTop10List";
import WeeklySiteViews from "../AdminDashboard/SiteViews/WeeklySiteViews";
import AdminSidebar from "./AdminSideBar/AdminSideBar";
import * as s from "./AdminSideBar/AdminSideBarStyles";

function AdminDashboard() {
  return (
    <s.Layout>
      <AdminSidebar />

      {/* 오른쪽 본문 */}
      <s.Content>
        <h1>관리자 대시보드</h1>

        <MonthlyNewSignUps />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "50px",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <WeeklySiteViews />
          <ScrapTop10List />
        </div>
      </s.Content>
    </s.Layout>
  );
}
export default AdminDashboard;
