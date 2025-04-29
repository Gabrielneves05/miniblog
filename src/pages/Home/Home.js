import styles from "./Home.module.css";

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetail from "../../components/PostDetail";

export default function Home() {
    const [query, setQuery] = useState('');
    const {documents: posts, loading} = useFetchDocuments('posts');

    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();

        if(query) {
            return navigate(`/search?q=${query}`);
        }
    }

    return (
        <div className={styles.home}>
            <h1>Veja as publicações mais recentes</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input 
                    type="text" 
                    placeholder="Buscar por tags..." 
                    onChange={event => setQuery(event.target.value)} 
                />
                <button className="btn btn-dark">Pesquisar</button>
            </form>

            <div>
                {loading && <p>Carregando...</p>}
                {posts && posts.map(post => <PostDetail post={post} key={post.id} />)}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não existem publicações</p>
                        <Link to="/posts/create" className="btn">Criar publicação</Link>
                    </div>
                )}
            </div>
        </div>
    );
}