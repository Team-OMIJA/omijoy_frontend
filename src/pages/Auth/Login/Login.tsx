import { ChangeEvent, useState } from 'react';
import { Button, Snackbar, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = () => {
    axios
      .post(import.meta.env.VITE_API_URL + '/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
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

  return (
    <>
      <Stack spacing={2} mt={2} alignItems='center'>
        <TextField label='Email' name='email' onChange={changeHandler} />
        <TextField type='password' label='Password' name='password' onChange={changeHandler} />
        <Button variant='outlined' color='primary' onClick={loginHandler}>
          Login
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message='Id 혹은 비밀번호가 들렸습니다.'
        />
      </Stack>

      <Button
        onClick={() => {
          navigate('/signup', { replace: true });
        }}
      >
        회원가입
      </Button>
    </>
  );
}

export default Login;
