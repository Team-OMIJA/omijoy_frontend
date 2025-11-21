import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../apis/instance';
import './SignUp.css';

type SignUpForm = {
  email: string;
  password: string;
  confirm: string;
};

function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState<SignUpForm>({
    email: '',
    password: '',
    confirm: '',
  });

  const [errorMessage, setErrorMessage] = useState<{
    email: string;
    password: string;
    confirm: string;
  }>({
    email: '',
    password: '',
    confirm: '',
  });

  const [snack, setSnack] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  // 정규식: 기본 이메일 형식, 비밀번호는 영문/숫자/특수문자 포함 8~15자
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

  useEffect(() => {
    const nextErrors: { email: string; password: string; confirm: string } = {
      email: '',
      password: '',
      confirm: '',
    };

    if (form.email.length > 0 && !emailRegex.test(form.email)) {
      nextErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    if (form.password.length > 0 && !pwRegex.test(form.password)) {
      nextErrors.password = '영문/숫자/특수문자 조합 8~15자';
    }

    if (form.confirm.length > 0 && form.confirm !== form.password) {
      nextErrors.confirm = '비밀번호가 일치하지 않습니다.';
    }

    setErrorMessage(nextErrors);
  }, [form.email, form.password, form.confirm]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signUpHandler = () => {
    if (!form.email || !form.password) {
      setSnack({ open: true, message: '이메일과 비밀번호를 입력해 주세요.' });
      return;
    }

    if (!emailRegex.test(form.email)) {
      setSnack({ open: true, message: '올바른 이메일 형식이 아닙니다.' });
      return;
    }

    if (!pwRegex.test(form.password)) {
      setSnack({ open: true, message: '영문/숫자/특수문자 조합 8~15자' });
      return;
    }

    if (form.password !== form.confirm) {
      setSnack({ open: true, message: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    instance
      .post('/signup', { email: form.email, password: form.password })
      .then(() => {
        setSnack({ open: true, message: '회원가입이 완료되었습니다.' });
        navigate('/login', { replace: true });
      })
      .catch(() => setSnack({ open: true, message: '회원가입에 실패했습니다.' }));
  };

  const isDisabled =
    !form.email ||
    !form.password ||
    !form.confirm ||
    !emailRegex.test(form.email) ||
    !pwRegex.test(form.password) ||
    form.password !== form.confirm;

  return (
    <>
      <div className='signup-page'>
        <div className='signup-panel'>
          <Typography className='signup-title' component='h1' variant='h5'>
            회원가입
          </Typography>
          <p className='signup-caption'>
            새로운 계정을 만들어
            <br /> 오미조이 커뮤니티와 혜택을 즐겨보세요.
          </p>

          <Stack spacing={2} className='signup-form'>
            <TextField
              label='이메일'
              name='email'
              type='email'
              value={form.email}
              onChange={changeHandler}
              error={!!errorMessage.email}
              helperText={errorMessage.email || ' '}
            />
            <TextField
              label='비밀번호'
              name='password'
              type='password'
              value={form.password}
              onChange={changeHandler}
              error={!!errorMessage.password}
              helperText={errorMessage.password || ' '}
            />
            <TextField
              label='비밀번호 확인'
              name='confirm'
              type='password'
              value={form.confirm}
              onChange={changeHandler}
              error={!!errorMessage.confirm}
              helperText={errorMessage.confirm || ' '}
            />
            <Button
              className='signup-submit-button'
              variant='outlined'
              color='primary'
              onClick={signUpHandler}
              disabled={isDisabled}
            >
              회원가입
            </Button>
          </Stack>

          <button
            type='button'
            className='signup-link'
            onClick={() => {
              navigate('/login', { replace: true });
            }}
          >
            이미 계정이 있으신가요? 로그인하기
          </button>
        </div>
      </div>

      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack({ ...snack, open: false })}
        message={snack.message}
      />
    </>
  );
}

export default SignUp;
