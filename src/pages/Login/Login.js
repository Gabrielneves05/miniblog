import styles from './Login.module.css';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async event => {
        event.preventDefault();

        const user = {
            email,
            password
        }

        const response = await login(user);

        if(response?.error) {
            toast.error(response?.error);
        } else {
            toast.success('Acesso realizado com sucesso');
        }
    }

    return (
        <div className={styles.login}>
            <h1>Acessse sua conta</h1>
            <p>Insira suas credenciais para acessar sua conta</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email:</span>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="E-mail" 
                        required 
                        value={email}
                        onChange={event => setEmail(event.target.value)}
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
                            onChange={event => setPassword(event.target.value)}
                        />
                        <span
                            className={styles.eyeIcon}
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </label>

                {!loading && <button className="btn">Entrar</button>}
                {loading && <button className="btn" disabled>Aguarde...</button>}
            </form>
        </div>
    );
}