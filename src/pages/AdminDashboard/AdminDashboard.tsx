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
          gap: "20px",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <WeeklySiteViews />
        <ScrapTop10List />
      </div>
    </>
  );
}
export default AdminDashboard;
