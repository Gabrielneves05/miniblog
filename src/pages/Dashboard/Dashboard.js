import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

import Loading from "../../components/Loading/Loading";


export default function Dashboard() {
    const { user } = useAuthValue();
    const uid = user.uid;

    const { documents: posts, loading, error } = useFetchDocuments('posts', null, uid);

    const { deleteDocument } = useDeleteDocument('posts');

    if(loading) {
        return <Loading />;
    }

    return (
        <div className={styles.dashboard}>
            <h1>Dashboard</h1>
            <p>Gerencie suas publicações</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Você não tem publicações</p>
                    <Link to="/posts/create" className="btn">Criar publicação</Link>
                </div>
            ) : (
                <>
                    <div className={styles.postHeader}>
                        <span>Título</span>
                        <span>Ações</span>
                    </div>

                    {posts && posts.map(post => (
                        <div key={post.id} className={styles.postRow}>
                            <p>{post.title}</p>
                            <div className={styles.postActions}>
                                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                                    Ver publicação
                                </Link>
                                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                                    Editar
                                </Link>

                                <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Excluir</button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}