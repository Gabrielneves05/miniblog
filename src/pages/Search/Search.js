import styles from "./Search.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

import { Link } from "react-router-dom";

import PostDetail from "../../components/PostDetail";

export default function Search() {
    const query = useQuery();
    const search = query.get('q');

    const {documents:posts} = useFetchDocuments('posts', search);

    return (
        <div className={styles.searchContainer}>
            <h1>Resultados da busca</h1>
            <p>Encontramos {posts?.length} publicações relacionadas a "{search}"</p>
            <div>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontradas publicações a partir da sua busca...</p>
                        <Link to="/" className="btn btn-dark">Voltar</Link>
                    </div>
                )}
                {posts && posts.map(post => (
                    <PostDetail post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
}