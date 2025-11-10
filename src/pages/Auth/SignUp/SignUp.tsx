import { ChangeEvent, useState } from 'react';
import { Button, Snackbar, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const [snack, setSnack] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signUpHandler = () => {
    if (!form.email || !form.password) {
      setSnack({ open: true, message: '이메일과 비밀번호를 입력해주세요.' });
      return;
    }

    if (form.password !== form.confirm) {
      setSnack({ open: true, message: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    axios
      .post(
        import.meta.env.VITE_API_BASE_URL + '/signup',
        { email: form.email, password: form.password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        setSnack({ open: true, message: '회원가입이 완료되었습니다.' });
        navigate('/login', { replace: true });
      })
      .catch(() => setSnack({ open: true, message: '회원가입에 실패했습니다.' }));
  };

  const isDisabled = !form.email || !form.password || form.password !== form.confirm;

  return (
    <>
      <Stack spacing={2} mt={2} alignItems='center'>
        <TextField label='이메일' name='email' type='email' value={form.email} onChange={changeHandler} />
        <TextField label='비밀번호' name='password' type='password' value={form.password} onChange={changeHandler} />
        <TextField label='비밀번호 확인' name='confirm' type='password' value={form.confirm} onChange={changeHandler} />
        <Button variant='contained' color='primary' onClick={signUpHandler} disabled={isDisabled}>
          회원가입
        </Button>
      </Stack>
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
