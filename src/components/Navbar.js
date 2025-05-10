import styles from './Navbar.module.css';
import { useAuthentication } from '../hooks/useAuthentication';
import { useAuthValue } from '../context/AuthContext';
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      
      <div className={styles.menuButton} onClick={toggleMenu}>
        <div className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <ul className={`${styles.links_list} ${isMenuOpen ? styles.active : ''}`}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink 
                to="/login" 
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/register" 
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastrar-se
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink 
                to="/posts/create" 
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Nova publicação
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => (isActive ? styles.active : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink 
            to="/about" 
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <li>
            <button 
              className={styles.logoutBtn} 
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
            >
              Sair
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}