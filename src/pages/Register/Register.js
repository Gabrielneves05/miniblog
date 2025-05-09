import styles from './Register.module.css';
import { useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('Fraca');
  const [strengthPercentage, setStrengthPercentage] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const { createUser, loading } = useAuthentication();

  // Função para verificar a força da senha
  const checkPasswordStrength = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const weakRegex = /^(?=.*[a-zA-Z]).{2,}$/;

    if (password.length > 0) {
      setPasswordStrength('Fraca');
      setStrengthPercentage(30);
    }

    if (strongRegex.test(password)) {
      setPasswordStrength('Forte');
      setStrengthPercentage(100);
    } else if (mediumRegex.test(password)) {
      setPasswordStrength('Média');
      setStrengthPercentage(60);
    } else if (weakRegex.test(password)) {
      setPasswordStrength('Fraca');
      setStrengthPercentage(30);
    } else {
      setPasswordStrength('Fraca');
      setStrengthPercentage(0);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    const user = {
      displayName,
      email,
      password,
    };

    const response = await createUser(user);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success('Cadastro realizado com sucesso');
    }
  };

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para publicar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="Nome"
            required
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                checkPasswordStrength(event.target.value);
              }}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          {/* Barra de força da senha */}
          {password && (
            <div className={styles.passwordStrengthContainer}>
              <div
                className={styles.passwordStrengthBar}
                style={{
                  width: `${strengthPercentage}%`,
                  backgroundColor:
                    strengthPercentage === 100
                      ? 'green'
                      : strengthPercentage >= 60
                      ? 'orange'
                      : 'red',
                }}
              ></div>
              <p>{passwordStrength && `Senha: ${passwordStrength}`}</p>
            </div>
          )}
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>

        {!loading && <button className="btn">Cadastrar</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
      </form>
    </div>
  );
}