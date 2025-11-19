import { useEffect } from "react";
import { getFlagListReq } from "../../../apis/flagApi";
import { useQuery } from "@tanstack/react-query";
import { usePrincipalState } from "../../../stores/usePrincipalState";

function Flaglist() {
  const { principal } = usePrincipalState();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["flags", principal?.id],
    queryFn: () => getFlagListReq(),
    // 로그인 전 호출되지 않음
    enabled: !!principal?.id,
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>에러 발생</div>;
  }

  const flagList = data ?? [];

  return (
    <div>
      {flagList.length > 0 ? (
        flagList.map((flag) => (
          <div key={flag.flagId}>
            {flag.prfPlcId?.prfPlcName}
            {flag.prfPlcId?.address}
            {flag.prfPlcId?.prfPlcId}
          </div>
        ))
      ) : (
        <div>플래그 없음</div>
      )}
    </div>
  );
}

export default Flaglist;
