import styles from "./About.module.css";

import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className={styles.about}>
            <h2>Sobre nosso Mini <span>Blog</span></h2>
            <p>Projeto que consiste em um blog simples em formato de rede social desenvolvido utilizando React e Firebase.</p>

            <Link href="/posts/create" className="btn">Criar Publicação</Link>
        </div>
    );
}