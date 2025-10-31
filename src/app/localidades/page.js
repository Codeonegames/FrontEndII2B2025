'use client';
import { useEffect, useState } from "react";
import styles from './page.module.css';

export default function Localidades() {

    const [paises, setPaises] = useState(null);
    const [status, setStatus] = useState('Carregando lista de países...');

    const getPaises = async () => {
        try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/paises?orderBy=nome');
            if (!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.statusText}`)
            }
            console.log(response);
            const dados = await response.json();
            setPaises(dados);
            setStatus("Lista de países carregados");
            console.log(dados);
            setStatus(null);
        } catch (e) {
            setStatus(`Ocorreu um erro: ${e.message}`);
            console.log(`Ocorreu um erro: ${e.message}`);
        }
    }

    useEffect(() => {
        getPaises();
    }, [])

    return (
        <>
            <div>
                <h1>Localidades</h1>
                {status && <p>{status}</p>}
            </div>
            {paises &&
                <div>
                    <table className={styles.tbl}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Região</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paises.map(sla => (
                                <tr key={sla.id.M49}>
                                    <td>{sla.id.M49}</td>
                                    <td>{sla["sub-regiao"].regiao.nome}</td>
                                    <td>{sla.nome}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            }
        </>

    )
}