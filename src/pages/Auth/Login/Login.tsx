import { ChangeEvent, useState } from 'react';
import { Alert, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../apis/instance';
import axios from 'axios';
import './Login.css';

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
  const [errMsg, setErrMsg] = useState<string>('login failed');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
    instance
      .post('/login', user)
      .then((res) => {
        const jwtToken = res.headers.authorization;
        if (jwtToken != null) {
          localStorage.setItem('jwt', jwtToken);
          setAuth(true);
        }
      })
      .catch((err: unknown) => {
        console.log(err);

        if (axios.isAxiosError(err)) {
          const backendMessage =
            err.response?.data?.message || err.response?.data?.error || err.message || '로그인에 실패했습니다.';
          setErrMsg(backendMessage);
        } else {
          setErrMsg('알 수 없는 오류가 발생했습니다.');
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
      <div className='login-page'>
        <div className='login-panel'>
          <Typography className='login-title' component='h1' variant='h5'>
            회원 로그인
          </Typography>

          <Stack spacing={2} className='login-form'>
            <TextField fullWidth label='이메일' name='email' onChange={changeHandler} />
            <TextField fullWidth type='password' label='패스워드' name='password' onChange={changeHandler} />
            <Button className='login-submit-button' fullWidth variant='outlined' color='primary' onClick={loginHandler}>
              로그인
            </Button>
          </Stack>

          <div className='oauth-divider'>
            <span>또는</span>
          </div>
          <p className='oauth-caption'>SNS 계정으로 로그인</p>

          <div className='oauth-button-list'>
            <a
              className='oauth-button google'
              href={`${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`}
              aria-label='구글 로그인'
            >
              <span className='oauth-icon' aria-hidden='true'>
                G
              </span>
              <span className='sr-only'>구글 로그인</span>
            </a>
            <a
              className='oauth-button naver'
              href={`${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/naver`}
              aria-label='네이버 로그인'
            >
              <span className='oauth-icon' aria-hidden='true'>
                N
              </span>
              <span className='sr-only'>네이버 로그인</span>
            </a>
            <a
              className='oauth-button kakao'
              href={`${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`}
              aria-label='카카오 로그인'
            >
              <span className='oauth-icon' aria-hidden='true'>
                K
              </span>
              <span className='sr-only'>카카오 로그인</span>
            </a>
          </div>

          <button
            type='button'
            className='signup-link'
            onClick={() => {
              navigate('/signup', { replace: true });
            }}
          >
            회원가입
          </button>
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='error' onClose={handleClose} sx={{ width: '100%' }}>
          {errMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
