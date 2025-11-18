// import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { SlHeart } from "react-icons/sl";
// import { ImHeart } from "react-icons/im";
// import {
//   toggleFavoriteReq,
//   getFavoritePrfListReq,
// } from "../../../apis/favoriteApi";

// interface PerformanceDetail {
//   prfId: string;
//   prfNm: string;
//   prfStartDt: string;
//   prfEndDt: string;
//   prfPlcNm: string;
//   prfAge: string;
//   runtime: string;
//   ticketPrice: string;
//   posterImgUrl: string;
//   area: string;
//   genreNm: string;
//   visit: string;
//   child: string;
//   festival: string;
//   dtGuidance: string;
//   detailImgUrl: string;
//   providerUrl: string;
// }

// function PerformanceDetail() {
//   // 공연 id
//   const { id } = useParams<{ id: string }>();
//   const [performance, setPerformance] = useState<PerformanceDetail | null>(
//     null
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   // UI 전용 좋아요 상태
//   const [liked, setLiked] = useState(false);

//   // 최초 좋아요 상태(리렌더링 필요없어서 useRef 사용)
//   const initalLikedRef = useRef<boolean>(false);

//   // 최초 1회 - 공연정보 - 좋아요 초기값 로딩
//   useEffect(() => {
//     if (!id) return;

//     let ignore = false;

//     const load = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/prfDetails/${id}`);
//         const data = await response.json();
//         if (!ignore) setPerformance(data);

//         // 좋아요 초기 상태 로딩
//         const favorites = await getFavoritePrfListReq();
//         const isLiked = favorites.some((f) => f.prfId === id);

//         // 좋아요가 false 상태가 아니라면
//         // UI 반영
//         if (!ignore) {
//           setLiked(isLiked);

//           // 최초 상태 저장
//           initalLikedRef.current = isLiked;
//         }
//       } catch (error) {
//         console.error("공연 상세 정보 불러오기 실패", error);
//         setPerformance(null);
//         alert("공연 정보를 불러올 수 없습니다.");
//       } finally {
//         if (!ignore) setIsLoading(false);
//       }
//     };

//     load();

//     // 페이지 벗어날 때 한 번만 db 반영 cleanup 함수
//     return () => {
//       ignore = true;

//       // 최초 liked 가 현재 liked 상태랑 다를때 수정
//       if (initalLikedRef.current !== liked) {
//         toggleFavoriteReq(id);
//         console.log("좋아요 변경사항 DB 반영됨:", liked);
//       }
//     };
//   }, [id]);
//   // id 값이 변경될 때만 언마운트... 이거 혹시 다른 공연 들어갔다가 마이페이지 가야지 반영되는거 아님? 확인 할 것

//   //   const fetchLikedStatus = async () => {
//   //     try {
//   //       const favorites = await getFavoritePrfListReq();
//   //       const isLiked = favorites.some((f) => f.prfId === id);

//   //       setLiked(isLiked);
//   //       setInitalLiked(isLiked); // 초기값 저장
//   //     } catch (error) {
//   //       console.error("좋아요 상태 조회 실패", error);
//   //     }
//   //   };

//   //   fetchLikedStatus();

//   //   return () => {
//   //     if (initialLiked !== liked) {
//   //       toggleFavoriteReq(id!);
//   //       console.log("좋아요 변경사항 DB 반영됨");
//   //     }
//   //   };
//   // }, [id, liked, initialLiked]);

//   const handleToggleFavorite = () => {
//     // try {
//     //   if (!id) return;
//     //   await toggleFavoriteReq(id);
//     //   setLiked((prev) => !prev);
//     // } catch (err) {
//     //   console.error("좋아요 토글 실패", err);
//     //   alert("로그인이 필요합니다.");
//     // }
//     setLiked((prev) => !prev); // 서버 요청 x
//   };

//   if (isLoading) return <div>로딩 중...</div>;
//   if (!performance) return <div>공연 정보를 찾을 수 없습니다.</div>;

//   const HeartIcon = liked ? ImHeart : SlHeart;

//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <div
//         style={{
//           display: "flex",
//           padding: "40px",
//           borderRadius: "16px",
//           width: "75%",
//           marginRight: "120px",
//           marginTop: "25px",
//           alignItems: "center",
//           position: "relative",
//         }}
//       >
//         <img
//           src={performance.posterImgUrl}
//           alt={performance.prfNm}
//           width={400}
//           height={500}
//           style={{ borderRadius: "10px" }}
//         />
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             marginTop: "-95px",
//             marginLeft: "100px",
//           }}
//         >
//           <div>
//             <h1 style={{ position: "absolute", marginTop: "-210px" }}>
//               {performance.prfNm}
//             </h1>
//           </div>
//           <div
//             style={{
//               position: "absolute",
//               marginTop: "-10px",
//               lineHeight: "1",
//             }}
//           >
//             <h2>{performance.area}</h2>
//             <p>{performance.prfPlcNm}</p>
//             <p style={{ whiteSpace: "pre-line" }}>
//               {performance.prfStartDt} ~ {performance.prfEndDt}
//               <br />
//               {performance.dtGuidance?.toString()}
//             </p>
//             <p>
//               ⏱ {performance.runtime} <br /> 🎭 {performance.genreNm}
//               <br />
//               👶 {performance.prfAge}
//               <br />
//               {performance.child === "Y" && "어린이 동반 가능"}
//             </p>
//             <p>
//               {performance.ticketPrice
//                 ?.toString()
//                 .split(", ")
//                 .map((price, index) => (
//                   <span key={index}>
//                     {price}
//                     <br />
//                   </span>
//                 ))}
//             </p>
//             {performance.visit === "Y" && <p>내한</p>}
//             {performance.festival === "Y" && <p>축제</p>}
//           </div>
//         </div>
//         <HeartIcon
//           style={{
//             position: "absolute",
//             top: "40px",
//             right: "-70px",
//             fontSize: "40px",
//             color: "crimson",
//             cursor: "pointer",
//           }}
//           onClick={handleToggleFavorite}
//         />
//         {performance.providerUrl && (
//           <button
//             onClick={() => {
//               const firstUrl = performance.providerUrl.split(",")[0].trim();
//               const validUrl = firstUrl.startsWith("http")
//                 ? firstUrl
//                 : `https://${firstUrl}`;
//               window.open(validUrl, "_blank");
//             }}
//             style={{
//               position: "absolute",
//               bottom: "40px",
//               right: "-100px",
//               padding: "0 30px",
//               lineHeight: "60px",
//               fontSize: "23px",
//               cursor: "pointer",
//               borderRadius: "30px",
//               backgroundColor: "black",
//               color: "white",
//             }}
//           >
//             예매 바로가기→
//           </button>
//         )}
//       </div>
//       <hr
//         style={{ width: "100%", border: "1px solid #ccc", margin: "50px 0" }}
//       />

//       {performance.detailImgUrl && performance.detailImgUrl.trim() !== "" && (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {performance.detailImgUrl
//             .split(",")
//             .map((url) => url.trim())
//             .filter((url) => url)
//             .map((url, idx) => (
//               <img
//                 key={idx}
//                 src={url}
//                 alt={`detail-${idx}`}
//                 style={{ width: "100%", maxWidth: "800px" }}
//               />
//             ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PerformanceDetail;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SlHeart } from "react-icons/sl";
import { ImHeart } from "react-icons/im";
import { toggleFavoriteReq, getFavoritePrfListReq } from "../../../apis/favoriteApi";

interface PerformanceDetail {
  prfId: string;
  prfNm: string;
  prfStartDt: string;
  prfEndDt: string;
  prfPlcNm: string;
  prfAge: string;
  runtime: string;
  ticketPrice: string;
  posterImgUrl: string;
  area: string;
  genreNm: string;
  visit: string;
  child: string;
  festival: string;
  dtGuidance: string;
  detailImgUrl: string;
  providerUrl: string;
}

function PerformanceDetail() {
  const { id } = useParams<{ id: string }>();
  const [performance, setPerformance] = useState<PerformanceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const res = await fetch(`http://localhost:8080/prfDetails/${id}`);
        const data: PerformanceDetail = await res.json();
        setPerformance(data);
      } catch (err) {
        console.error("공연 상세 정보 불러오기 실패", err);
        setPerformance(null);
        alert("공연 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    const fetchLikedStatus = async () => {
      try {
        const favorites = (await getFavoritePrfListReq()) as { prfId: string }[];
        if (favorites.some((fav) => fav.prfId === id)) {
          setLiked(true);
        }
      } catch (err) {
        console.error("좋아요 상태 확인 실패", err);
      }
    };

      fetchPerformance();
      fetchLikedStatus();
    }, [id]);

    const handleToggleFavorite = async () => {
      try {
        if (!id) return;
        await toggleFavoriteReq(id);
        setLiked((prev) => !prev);
      } catch (err) {
        console.error("좋아요 토글 실패", err);
        alert("로그인이 필요합니다.");
      }
    };

  if (loading) return <div>로딩 중...</div>;
  if (!performance) return <div>공연 정보를 찾을 수 없습니다.</div>;

  const HeartIcon = liked ? ImHeart : SlHeart;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", padding: "40px", borderRadius: "16px", width: "75%", marginRight: "120px", marginTop: "25px", alignItems: "center", position: "relative"}}>
        <img src={performance.posterImgUrl} alt={performance.prfNm} width={400} height={500} style={{ borderRadius: "10px" }}/>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", marginTop: "-95px",marginLeft: "100px"}}>
          <div>
            <h1 style={{position: "absolute", marginTop: "-210px"}}>{performance.prfNm}</h1>
          </div>
          <div style={{ position: "absolute", marginTop: "-10px", lineHeight: "1" }}>
            <h2>{performance.area}</h2>
            <p>{performance.prfPlcNm}</p>
            <p style={{ whiteSpace: 'pre-line' }}>
              {performance.prfStartDt} ~ {performance.prfEndDt}
              <br />
              {performance.dtGuidance?.toString()}
            </p>
            <p>⏱ {performance.runtime} <br /> 🎭 {performance.genreNm}<br />👶 {performance.prfAge}<br />{performance.child === "Y" && "어린이 동반 가능"}</p>
            <p>
              {performance.ticketPrice?.toString().split(', ').map((price, index) => (
                <span key={index}>
                  {price}
                  <br />
                </span>
              ))}
            </p>
            {performance.visit === "Y" && <p>내한</p>}
            {performance.festival === "Y" && <p>축제</p>}
          </div>
        </div>
        <HeartIcon style={{position: "absolute", top: "40px", right: "-70px", fontSize: "40px", color: "crimson", cursor: "pointer"}}  onClick={handleToggleFavorite}/>
        {performance.providerUrl && (
        <button
          onClick={() => {const firstUrl = performance.providerUrl.split(",")[0].trim();
            const validUrl = firstUrl.startsWith("http") ? firstUrl : `https://${firstUrl}`;
            window.open(validUrl, "_blank");
          }}
          style={{position: "absolute", bottom: "40px", right: "-100px", padding: "0 30px", lineHeight: "60px", fontSize: "23px",cursor: "pointer", borderRadius: "30px", backgroundColor: "black", color: "white"}}>예매 바로가기→</button>)}
      </div>
        <hr style={{ width: "100%", border: "1px solid #ccc", margin: "50px 0" }} />

      {performance.detailImgUrl && performance.detailImgUrl.trim() !== "" && (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          {performance.detailImgUrl
            .split(",")
            .map(url => url.trim())
            .filter(url => url)
            .map((url, idx) => (
              <img key={idx} src={url} alt={`detail-${idx}`} style={{ width: "100%", maxWidth: "800px"}}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default PerformanceDetail;