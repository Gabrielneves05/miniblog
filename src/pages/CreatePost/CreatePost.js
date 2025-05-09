import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { toast } from 'react-toastify';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');

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

        // Toast de sucesso
        toast.success('Publicação criada com sucesso');

        // Home page redirect
        navigate('/');
    }

    return (
        <div className={styles.createPost}>
            <h2>Criar publicação</h2>
            <p>Escreva e publique para compartilhar.</p>
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
                <label>
                    <span>Conteúdo:</span>
                    <textarea
                        name="body" 
                        placeholder="Insira o conteúdo"
                        required
                        onChange={event => setBody(event.target.value)}
                        value={body}
                    >

                    </textarea>
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

                {!response.loading && <button className="btn">Publicar</button>}
                {response.loading && <button className="btn" disabled>Aguarde...</button>}
                {response.error && <p className="error">{response.error}</p>}
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    );
}