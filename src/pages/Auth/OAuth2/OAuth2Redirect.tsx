// src/pages/OAuth2Redirect.tsx
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, CircularProgress, Container, Stack, Typography, Snackbar } from '@mui/material';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function OAuth2Redirect() {
  const query = useQuery();
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = query.get('token');
    const backendError = query.get('error') || query.get('error_description'); // 혹시 실패 케이스
    const next = query.get('redirect') || '/';

    if (backendError) {
      setErrorMsg(decodeURIComponent(backendError));
      setOpen(true);
      return;
    }

    if (!token) {
      setErrorMsg('토큰이 전달되지 않았습니다. 다시 로그인해 주세요.');
      setOpen(true);
      return;
    }

    localStorage.setItem('jwt', `Bearer ${token}`);

    const cleanPath = '/login/oauth2';
    window.history.replaceState({}, document.title, cleanPath);

    navigate(next, { replace: true });
  }, [query, navigate]);

  return (
    <Container maxWidth='sm' sx={{ mt: 8 }}>
      <Stack spacing={2} alignItems='center' justifyContent='center'>
        <CircularProgress />
        <Typography variant='h6'>로그인 처리 중입니다…</Typography>
        <Typography variant='body2' color='text.secondary'>
          창을 닫지 말고 잠시만 기다려 주세요.
        </Typography>
      </Stack>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='error' onClose={() => setOpen(false)}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default OAuth2Redirect;
