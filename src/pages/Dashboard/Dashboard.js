import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';


export default function Dashboard() {
    const { user } = useAuthValue();
    const uid = user.uid;

    const posts = [];

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Gerencie suas publicações</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Você não tem publicações</p>
                    <Link to="/posts/create" className="btn">Criar publicação</Link>
                </div>
            ) : (
                <div>
                    <p>Tem posts!</p>
                </div>
            )}
        </div>
    );
}