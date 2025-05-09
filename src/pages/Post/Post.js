import styles from "./Post.module.css";

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import Loading from "../../components/Loading/Loading";

export default function Post() {
    const { id } = useParams();
    const { document: post, loading } = useFetchDocument("posts", id);

    return (
        <div className={styles.postContainer}>
            {loading && <Loading />}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} />
                    <p>{post.body}</p>
                    <h3>Esta publicação se refere a:</h3>
                    <div className={styles.tags}>
                        {post.tagsArray.map(tag => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}