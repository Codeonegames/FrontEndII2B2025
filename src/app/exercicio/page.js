//https://api.front.dev.vilhena.ifro.edu.br/msgs
'use client';
import { use, useEffect, useState } from "react";
import styles from './page.module.css';


export default function Localidades() {

    const [msg, setMsg] = useState([]);
    const [nome, setNome] = useState('');
    const [turma, setTurma] = useState('');
    const [mensagem, setMensagem] = useState('');

    const getMsgs = async () => {
        try {
            const response = await fetch('https://api.front.dev.vilhena.ifro.edu.br/msgs');
            if (!response.ok) {
                setStatus(response.statusText);
                throw new Error(`Erro ao buscar dados: ${response.statusText}`)
            }
            console.log(response);
            const dados = await response.json();
            setMsg(dados);
            console.log(dados);
        } catch (e) {
            console.log(`Ocorreu um erro: ${e.message}`);
        }
    }

    const enviarForm = async () {
        const mensagem = {nome, turma, msg};
        const response = await fetch('https://api.front.dev.vilhena.ifro.edu.br/msgs', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(mensagem),
        });

        const data = await response.json();
        if(!response.ok) {
            throw new Error(data.Error || "Erro ao enviar a mensagem...");
        }
        } catch (e) {
            alert('Erro ao enviar mensagem: ')
        }
    }

    useEffect(() => {

        getMsgs();
    }, [])

    return (
        <div>
            <h1>Localidades</h1>
            {status && <p>{status}</p>}
            {paises &&
                <div>
                    <button type="button" onClick={() => { setShowTblPaises(!showTblPaises) }}>{showTblPaises ? 'Ocultar Paises' : 'Mostrar Países'}</button>
                    {showTblPaises &&
                        <table className={styles.tbl}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>PAÍS</th>
                                    <th>REGIÃO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paises.map(pais => (
                                    <tr key={pais.id.M49}>
                                        <td>{pais.id.M49}</td>
                                        <td>{pais.nome}</td>
                                        <td>{pais['sub-regiao'].regiao.nome}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }

                    <select
                        onChange={ev => { const valor = ev.target.value;  getCidades(valor); setUfSelecionado(valor) }}
                    >
                        <option value='' disabled>Escolha a Unidade Federativa</option>
                        {ufs.map(uf => (
                            <option value={uf.id} key={uf.id}>{`${uf.id} - ${uf.nome} / ${uf.sigla}`}</option>
                        ))}
                    </select>
                    <p>Estado Selecionado: {ufSelecionado}</p>
                    {/* exibam a lista de cidades em uma tabela. */}

                    {cidades &&
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOME</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cidades.map(cidade => (
                                    <tr key={cidade.id}>
                                        <td>{cidade.id}</td>
                                        <td>{cidade.nome}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    }

                </div>
            }
        </div>
    )
}