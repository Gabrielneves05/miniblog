import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');
    
    const handleSubmit = event => {
        event.preventDefault();
    }

    return (
        <div className={styles.create_post}>
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

                <button className="btn">Publicar</button>
            </form>
        </div>
    );
}