/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useQuery } from "@tanstack/react-query";
import { getFlagListReq } from "../../../apis/flagApi";
import { usePrincipalState } from "../../../stores/usePrincipalState";
import { PiFlagBannerBold } from "react-icons/pi";

function Flaglist() {
  const { principal } = usePrincipalState();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["flags", principal?.id],
    queryFn: () => getFlagListReq(),
    enabled: !!principal?.id,
  });

  if (isLoading) return <div css={s.loading}>로딩중...</div>;
  if (isError) return <div css={s.error}>에러 발생</div>;

  const flagList = data ?? [];

  return (
    <div css={s.container}>
      {/* Header */}
      <div css={s.header}>
        <PiFlagBannerBold size={30} />
        <h2 css={s.title}>Flag</h2>
      </div>

      {/* List */}
      {flagList.length > 0 ? (
        <ul css={s.list}>
          {flagList.map((flag) => (
            // <li key={flag.flagId} css={s.item}>
            //   <div css={s.placeName}>{flag.prfPlcId?.prfPlcName}</div>
            //   <div css={s.address}>{flag.prfPlcId?.address}</div>
            // </li>
                    <li key={flag.flagId} css={s.card}>
              <div css={s.placeName}>{flag.prfPlcId?.prfPlcName}</div>
              <div css={s.address}>{flag.prfPlcId?.address}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p css={s.empty}>플래그한 공연장이 없습니다.</p>
      )}
    </div>
  );
}

export default Flaglist;
