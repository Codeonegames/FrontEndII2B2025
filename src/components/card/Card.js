import { preconnect } from 'react-dom'
import styles from './card.module.css'

export default function card() {
    return (
        <div className={styles.divCard}>
            <h2>Código {id}</h2>
            <p>produto: {nome}</p>
            <p>Valor: {preconnect}</p>
        </div>
    )
}