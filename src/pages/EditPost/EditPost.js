import styles from './EditPost.module.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

export default function EditPost() {
    const { id } = useParams();
    const {document: post} = useFetchDocument('posts', id);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if(post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);

            const TextTags = post.tagsArray.join(', ');

            setTags(TextTags);
        }
    }, [post]);

    const {user} = useAuthValue();

    const {insertDocument, response} = useInsertDocument('posts');

    const navigate = useNavigate();
    
    const handleSubmit = event => {
        event.preventDefault();
        setFormError('');

        // Validate image URL
        try {
            new URL(image);
        } catch (error) {
            setFormError('URL da imagem inválida!');
        }

        // Array tags created
        const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());

        // All values checked
        if(!title || !image || !tags || !body) {
            setFormError('Preencha todos os campos!');
        }

        if(formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        // Home page redirect
        navigate('/');
    }

    return (
        <div className={styles.editPost}>
            {post && (
                <>
                    <h2>Editar publicação</h2>
                    <p>Altere as informações da publicação</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título:</span>
                            <input 
                                type="text" 
                                name="title"
                                placeholder="Insira um título"
                                required
                                onChange={event => setTitle(event.target.value)}
                                value={title}
                            />
                        </label>
                        <label>
                            <span>URL da Imagem:</span>
                            <input 
                                type="text" 
                                name="image"
                                placeholder="Insira a URL da imagem"
                                required
                                onChange={event => setImage(event.target.value)}
                                value={image}
                            />
                        </label>

                        <p className={styles.previewTitle}>Preview da imagem:</p>
                        <img 
                            className={styles.imagePreview} 
                            src={post.image} 
                            alt={post.title} 
                        />

                        <label>
                            <span>Conteúdo:</span>
                            <textarea
                                name="body" 
                                placeholder="Insira o conteúdo"
                                required
                                onChange={event => setBody(event.target.value)}
                                value={body}
                            ></textarea>
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input 
                                type="text" 
                                name="tags"
                                placeholder="Insira tags separadas por vírgula"
                                required
                                onChange={event => setTags(event.target.value)}
                                value={tags}
                            />
                        </label>

                        {!response.loading && <button className="btn">Editar</button>}
                        {response.loading && <button className="btn" disabled>Aguarde...</button>}
                        {response.error && <p className="error">{response.error}</p>}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    );
}