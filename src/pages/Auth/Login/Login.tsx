import { ChangeEvent, ChangeEventHandler, useState } from 'react';

type User = {
  email: string;
  password: string;
};
function Login() {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });

  const [isAuthenticate, setIsAuthenticate] = useState(false);

  const changeHandler = (event : ChangeEvent<HTMLInputElement>)

  return <div>Login(회원가입은 useNavigate 처리 고려)</div>;
}

export default Login;
