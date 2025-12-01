/** @jsxImportSource @emotion/react */
import * as s from "./LoginStyles";
import { ChangeEvent, useState } from "react";
import { Alert, Snackbar, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../apis/instance";
import axios from "axios";

type User = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const [capsLockOn, setCapsLockOn] = useState(false);

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [isAuthenticate, setAuth] = useState(false);
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState<string>("login failed");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
    instance
      .post("/login", user)
      .then((res) => {
        const jwtToken = res.headers.authorization;
        if (jwtToken != null) {
          localStorage.setItem("jwt", jwtToken);
          setAuth(true);
        }
      })
      .catch((err: unknown) => {
        console.log(err);

        if (axios.isAxiosError(err)) {
          const backendMessage =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "로그인에 실패했습니다.";
          setErrMsg(backendMessage);
        } else {
          setErrMsg("알 수 없는 오류가 발생했습니다.");
        }

        setOpen(true);
      });
  };

  if (isAuthenticate) {
    window.location.replace(`${import.meta.env.BASE_URL}`);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <s.LoginPage>
        <s.LoginPanel>
          <s.LoginTitle component="h1" variant="h5">
            회원 로그인
          </s.LoginTitle>

          <s.LoginForm>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="이메일"
                name="email"
                onChange={changeHandler}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    loginHandler();
                  }
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="패스워드"
                name="password"
                onChange={changeHandler}
                onKeyDown={(e) => {
                  if (e.getModifierState && e.getModifierState("CapsLock")) {
                    setCapsLockOn(true);
                  } else {
                    setCapsLockOn(false);
                  }

                  if (e.key === "Enter") {
                    loginHandler();
                  }
                }}
                onKeyUp={(e) => {
                  if (e.getModifierState) {
                    setCapsLockOn(e.getModifierState("CapsLock"));
                  }
                }}
                error={capsLockOn}
                helperText={capsLockOn ? "CapsLock이 켜져 있습니다." : " "}
              />

              <s.LoginSubmitButton onClick={loginHandler}>
                로그인
              </s.LoginSubmitButton>
            </Stack>
          </s.LoginForm>

          <s.OAuthDivider>
            <span>또는</span>
          </s.OAuthDivider>

          <s.OAuthCaption>SNS 계정으로 로그인</s.OAuthCaption>

          <s.OAuthButtonList>
            <s.OAuthButton
              provider="google"
              href={`${
                import.meta.env.VITE_API_BASE_URL
              }/oauth2/authorization/google`}
            >
              <span className="oauth-icon">G</span>
            </s.OAuthButton>

            <s.OAuthButton
              provider="naver"
              href={`${
                import.meta.env.VITE_API_BASE_URL
              }/oauth2/authorization/naver`}
            >
              <span className="oauth-icon">N</span>
            </s.OAuthButton>

            <s.OAuthButton
              provider="kakao"
              href={`${
                import.meta.env.VITE_API_BASE_URL
              }/oauth2/authorization/kakao`}
            >
              <span className="oauth-icon">K</span>
            </s.OAuthButton>
          </s.OAuthButtonList>

          <s.SignupLink
            type="button"
            onClick={() => {
              navigate("/signup", { replace: true });
            }}
          >
            회원가입
          </s.SignupLink>
        </s.LoginPanel>
      </s.LoginPage>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
          {errMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
