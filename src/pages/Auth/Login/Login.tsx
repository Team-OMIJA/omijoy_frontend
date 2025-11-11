import { ChangeEvent, useState } from 'react';
import { Alert, Button, Snackbar, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { instance } from '../../../apis/instance';

type User = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  const [isAuthenticate, setAuth] = useState(false);
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('login failed');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
    instance
      .post('/login', user)
      .then((res) => {
        const jwtToken = res.headers.authorization;
        if (jwtToken != null) {
          sessionStorage.setItem('jwt', jwtToken);
          setAuth(true);
        }
      })
      .catch((err) => console.log(err));
  };

  if (isAuthenticate) {
    window.location.replace(`${import.meta.env.BASE_URL}`);
  }

  const authenticateWithGoogleToken = async (idToken: string): Promise<string> => {
    console.log('Google ID 토큰을 백엔드로 전송합니다.', idToken.substring(0, 30) + '...');
    try {
      const response = await instance.post(`/api/auth/google`, { idToken });
      const backendJwt = response.data.token;
      if (!backendJwt) {
        throw new Error('백엔드에서 JWT 토큰을 보내지 않았습니다.');
      }
      console.log('JWT가 백엔드로부터 전성됨 : ', backendJwt.substring(0, 15) + '...');
      return backendJwt; // 'Bearer <token>' 형태로 return
    } catch (err) {
      console.log('Backend Google Auth Error' + err);
      if (axios.isAxiosError(err) && err.response) {
        throw new Error(
          err.response.data?.message || err.response.data?.err || `백엔드 구글 인증 실패 (${err.response.status})`
        );
      } else if (err instanceof Error) {
        throw err;
      } else {
        throw new Error('예측 불가능한 오류가 구글 인증 시에 발생하였습니다.');
      }
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log('Google Login Success(Frontend 상황에서 ) : ', credentialResponse);
    if (credentialResponse.credential) {
      try {
        const backendJwt = await authenticateWithGoogleToken(credentialResponse.credential);
        sessionStorage.setItem('jwt', backendJwt);
        setAuth(true);
      } catch (err: any) {
        console.error('구글 로그인 후에 백엔드 부분에서 인증 실패.', err);
        setErrMsg(`구글 로그인은 성공했는데 백엔드에서 실패하였습니다. ${err?.message || '알수 없는 에러'}`);
        setOpen(true);
      } finally {
        if (isAuthenticate) {
          window.location.replace(`${import.meta.env.BASE_URL}`);
        }
      }
    } else {
      console.error('응답 결과에서 Google Credential을 찾을 수 없습니다. ');
      setErrMsg('Google Login Failed : Credential Not Found');
      setOpen(true);
    }
  };

  const handleGoogleLoginError = () => {
    console.error('Google Login Failed (frontend)');
    setErrMsg('구글 로그인 자체가 실패했습니다. 다시 시도하거나 좀 있다 시도해 주세요');
    setOpen(true);
  };

  return (
    <>
      <Stack spacing={2} mt={2} alignItems='center'>
        <TextField label='Email' name='email' onChange={changeHandler} />
        <TextField type='password' label='Password' name='password' onChange={changeHandler} />
        <Button variant='outlined' color='primary' onClick={loginHandler}>
          Login
        </Button>
        <GoogleLogin
          width='300px'
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
          useOneTap={false}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message='Id 혹은 비밀번호가 틀렸습니다.'
        />
      </Stack>

      <Button
        onClick={() => {
          navigate('/signup', { replace: true });
        }}
      >
        회원가입
      </Button>
      <Snackbar open={open} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity='error' onClose={() => setOpen(false)}>
          {errMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
