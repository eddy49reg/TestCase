import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<SignInResponse>(
        'http://localhost:4000/auth/sign-in',
        {
          email,
          password,
        }
      );

      const { accessToken, refreshToken } = response.data;

      // Сохраняем токены в localStorage или используйте другой подход
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Перенаправляем пользователя на главную страницу
      navigate('/main');
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error(axiosError);
      setError(
        axiosError.response?.status !== 200
          ? 'Неверный адрес электронной почты или пароль'
          : 'Что-то пошло не так'
      );
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>
        <div>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default AuthPage;
