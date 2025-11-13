import { ChangeEvent, useState } from 'react';
import { Alert, Button, Snackbar, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
      .catch((err) => {
        console.log(err);
        setErrMsg(err);
      });
  };

  if (isAuthenticate) {
    window.location.replace(`${import.meta.env.BASE_URL}`);
  }

  return (
    <>
      <Stack spacing={2} mt={2} alignItems='center'>
        <TextField label='Email' name='email' onChange={changeHandler} />
        <TextField type='password' label='Password' name='password' onChange={changeHandler} />
        <Button variant='outlined' color='primary' onClick={loginHandler}>
          Login
        </Button>
        <a href={`${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/google`}>구글 로그인</a>
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
