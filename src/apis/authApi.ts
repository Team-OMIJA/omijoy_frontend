// 로그인 / 로그아웃 / 회원가입 / 유저 정보(프로필 수정)관련 api

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URLL;

// Principal
export const getPrincipalReq = async () => {
  const jwt = sessionStorage.getItem("jwt");
  if (!jwt) throw new Error("JWT 토큰이 없습니다.")

    try {
      const response = await axios.get(
       `${BASE_URL}/`
      )
    }
}