// import { BrowserRouter } from "react-router-dom"
// import MainRouter from "./routes/MainRouter/MainRouter"

// function App() {


//   return (
//     <>
//      <BrowserRouter>
//      <MainRouter/>
//      </BrowserRouter>
//     </>
//   )
// }

// export default App
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes/MainRouter/MainRouter";
import { useEffect } from "react";
import { usePrincipalState } from "./stores/usePrincipalState";

function App() {
  const { login } = usePrincipalState();

  useEffect(() => {
    // 🔹 더미 로그인 유저 (프론트 전용)
    login({
      id: 1,
      username: "테스트유저",
      email: "test@example.com",
      profileImg:
        "https://firebasestorage.googleapis.com/v0/b/runnershigh-c00a7.firebasestorage.app/o/profile-img%2Ff07b29c9-0252-4347-a351-e2c2c286d454.png?alt=media&token=868fcb4f-ae43-48ec-a69b-ebdc73f77270",
      role: "USER",
    });
  }, [login]);

  return (
    <>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </>
  );
}

export default App;