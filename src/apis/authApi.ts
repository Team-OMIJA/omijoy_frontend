// 로그인 / 로그아웃 / 회원가입 / 유저 정보(프로필 수정)관련 api

import { instance } from './instance';

// Principal
export const getPrincipalReq = async () => {
  try {
    const response = await instance.get('/auth/principal');
    return response.data;
  } catch (error) {
    console.error('principal 요청 실패 : ', error);
    throw error;
  }
};
