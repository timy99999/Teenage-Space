import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-ts.png';
import { supabase } from '../lib/supabase';
import { api } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import type { Profile } from '../types';

type View = 'login' | 'reg1' | 'reg2' | 'reg3';

export function AuthPage() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const { flash } = useUI();

  const [view, setView] = useState<View>('login');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [resendLeft, setResendLeft] = useState(0);
  const resendTimer = useRef<number>();

  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const [username, setUsername] = useState('');
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');

  useEffect(() => () => window.clearInterval(resendTimer.current), []);

  function startResend() {
    setResendLeft(30);
    window.clearInterval(resendTimer.current);
    resendTimer.current = window.setInterval(() => {
      setResendLeft((v) => {
        if (v <= 1) {
          window.clearInterval(resendTimer.current);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  }

  async function finishSignIn() {
    await refreshProfile();
    navigate('/');
  }

  async function onLogin() {
    if (!loginUser || !loginPass) {
      setError('Заполните оба поля');
      return;
    }
    setError('');
    setBusy(true);
    try {
      const { email: resolvedEmail } = await api.get<{ email: string }>(
        `/auth/lookup-email?username=${encodeURIComponent(loginUser)}`
      );
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: resolvedEmail, password: loginPass });
      if (signInError) throw signInError;
      await finishSignIn();
    } catch {
      setError('Неверный username или пароль');
    } finally {
      setBusy(false);
    }
  }

  async function onReg1() {
    if (!name || !birth || !email) {
      setError('Заполните все поля');
      return;
    }
    setError('');
    setBusy(true);
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
      if (otpError) throw otpError;
      setView('reg2');
      startResend();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось отправить код');
    } finally {
      setBusy(false);
    }
  }

  async function onReg2() {
    if (!code || code.length < 4) {
      setError('Введите код из письма');
      return;
    }
    setError('');
    setBusy(true);
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({ email, token: code, type: 'email' });
      if (verifyError) throw verifyError;
      setView('reg3');
    } catch {
      setError('Неверный код подтверждения');
    } finally {
      setBusy(false);
    }
  }

  async function onReg3() {
    if (!/^[A-Za-z0-9_]{4,15}$/.test(username)) {
      setError('Username: латиница, цифры и _, от 4 до 15 символов');
      return;
    }
    if (username.toLowerCase() === 'admin') {
      setError('Этот Username уже занят');
      return;
    }
    if (!/^(?=.*[A-Za-z]).{8,}$/.test(pw)) {
      setError('Пароль: минимум 8 символов и латинские буквы');
      return;
    }
    if (pw !== pw2) {
      setError('Пароли не совпадают');
      return;
    }
    setError('');
    setBusy(true);
    try {
      const { error: pwError } = await supabase.auth.updateUser({ password: pw });
      if (pwError) throw pwError;
      await api.patch<Profile>('/profile', { username, name, birthDate: birth });
      flash('Аккаунт создан');
      await finishSignIn();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось создать аккаунт');
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
  }

  async function onResend() {
    if (resendLeft > 0) return;
    await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    startResend();
    flash('Код отправлен ещё раз');
  }

  const config: Record<
    View,
    { title: string; hint: string; primary: string; google: boolean; switchLabel: string; resend?: boolean }
  > = {
    login: { title: 'Вход', hint: 'Войдите, чтобы сохранять мероприятия и голосовать', primary: 'Войти', google: true, switchLabel: 'Создать аккаунт' },
    reg1: { title: 'Создать аккаунт', hint: 'Шаг 1 из 3 — расскажите о себе', primary: 'Продолжить', google: true, switchLabel: 'Войти в существующий аккаунт' },
    reg2: { title: 'Подтвердите email', hint: `Мы отправили код на ${email || 'вашу почту'}`, primary: 'Продолжить', google: false, switchLabel: 'Назад', resend: true },
    reg3: { title: 'Почти готово', hint: 'Шаг 3 из 3 — придумайте username и пароль', primary: 'Создать аккаунт', google: false, switchLabel: 'Назад' }
  };
  const c = config[view];

  function onPrimary() {
    if (view === 'login') return onLogin();
    if (view === 'reg1') return onReg1();
    if (view === 'reg2') return onReg2();
    return onReg3();
  }

  function onSwitch() {
    setError('');
    if (view === 'login') setView('reg1');
    else if (view === 'reg1') setView('login');
    else if (view === 'reg2') setView('reg1');
    else setView('reg2');
  }

  return (
    <div className="ts-auth-page">
      <div className="ts-auth-box">
        <div className="ts-auth-head">
          <div className="ts-auth-logo">
            <img src={logo} alt="Teenage Space" />
          </div>
          <div className="ts-auth-title">{c.title}</div>
          <div className="ts-auth-hint">{c.hint}</div>
        </div>
        <div className="ts-auth-form">
          {view === 'login' && (
            <>
              <input className="ts-input auth" placeholder="Username" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} />
              <input
                className="ts-input auth"
                placeholder="Пароль"
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />
            </>
          )}
          {view === 'reg1' && (
            <>
              <input className="ts-input auth" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="ts-input auth" placeholder="Дата рождения" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />
              <input className="ts-input auth" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </>
          )}
          {view === 'reg2' && <input className="ts-input auth" placeholder="Код подтверждения" value={code} onChange={(e) => setCode(e.target.value)} />}
          {view === 'reg3' && (
            <>
              <input className="ts-input auth" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input className="ts-input auth" placeholder="Пароль" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
              <input className="ts-input auth" placeholder="Повторите пароль" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
            </>
          )}

          {error && <div className="ts-auth-error">{error}</div>}
          {c.resend && (
            <button className="ts-auth-resend" onClick={onResend}>
              {resendLeft > 0 ? `Отправить ещё раз через ${resendLeft} с` : 'Отправить ещё раз'}
            </button>
          )}

          <button className="ts-btn-plain-outline" style={{ marginTop: 6, border: '1.5px solid var(--ts-violet)', color: 'var(--ts-blue)' }} onClick={onPrimary} disabled={busy}>
            {c.primary}
          </button>
          {c.google && (
            <button className="ts-btn-plain-outline" onClick={onGoogle}>
              Продолжить с Google
            </button>
          )}
          <button className="ts-auth-switch" onClick={onSwitch}>
            {c.switchLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
