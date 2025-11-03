
import { Route, Routes } from "react-router-dom";
import PerformanceList from "../../pages/Performance/PerformanceList/PerformanceList";
import PerformanceDetail from "../../pages/Performance/PerformanceDetail/PerformanceDetail";

function PerformanceRouter() {
  return (
    <Routes>
      <Route index element={<PerformanceList />} />
      <Route path=":id" element={<PerformanceDetail />} />
    </Routes>
  );
}

export default PerformanceRouter;
