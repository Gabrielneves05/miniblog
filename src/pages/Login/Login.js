import styles from './Login.module.css';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async event => {
        event.preventDefault();

        setError('');

        const user = {
            email,
            password
        }

        const response = await login(user);

        console.log(response);
    }

    useEffect(() => {
        if(authError) {
            setError(authError);
        }
    }, [authError]);

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
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Senha" 
                        required 
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </label>

                {!loading && <button className="btn">Entrar</button>}
                {loading && <button className="btn" disabled>Aguarde...</button>}

                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}