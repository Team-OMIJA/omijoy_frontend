import MonthlyNewSignUps from "../AdminDashboard/MonthlyNewSignUps/MonthlyNewSignUps";
import ScrapTop10List from "../AdminDashboard/ScrapTop10List/ScrapTop10List";
import WeeklySiteViews from "../AdminDashboard/SiteViews/WeeklySiteViews";

function AdminDashboard() {
  return (
    <>
      <MonthlyNewSignUps />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start", // 🔥 세로 정렬 위로 맞추기!
          gap: "10px",
          width: "100%",
          marginTop: "40px",
        }}
      >
        <WeeklySiteViews />
        <ScrapTop10List />
      </div>
    </>
  );
}
export default AdminDashboard;
