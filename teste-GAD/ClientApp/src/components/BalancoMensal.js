import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { MakeRequest } from "../util/HttpHandler"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { Button } from 'reactstrap'



export class BalancoMensal extends Component {
    static displayName = BalancoMensal.name;

    constructor(props) {
        super(props);

        this.state = { lancamentos: [], loading: true };
    }

    componentDidMount() {
        this.getLancamentos();
    }

    renderLancamentos(lancamentos) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Data Hora Lançamento</th>
                        <th>Valor</th>
                        <th>Tipo</th>
                        <th>Conciliado</th>
                        <th>-</th>
                    </tr>
                </thead>
                <tbody>
                    {lancamentos.map(l =>
                        <tr key={l.id}>
                            <td>{moment(l.dataHoraLancamento).format("DD/MM/YYYY HH:mm")}</td>
                            <td>{(l.valor).toLocaleString('pt-BR', {style:'currency',currency:'BRL'})}</td>
                            <td>{l.tipoString}</td>
                            <td>{l.status ? "Sim" : "Não"}</td>
                            <td>
                                <Button title="Editar" disabled={l.status} size="sm" onClick={() => { this.props.history.push('/edit-lancamento/' + l.id) }} >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderLancamentos(this.state.lancamentos);
        return (
            <div>
                <h3 id="tabelLabel" >Lançamentos Financeiros</h3>
                <br />
                <Link to='/new-lancamento/'><FontAwesomeIcon icon={faPlus} /> Adicionar Lançamento</Link>
                {contents}
            </div>
        );
    }

    async getLancamentos() {
        MakeRequest({ url: 'LancamentoFinanceiro/GetLancamentosFinanceiros' }).then(resp => {
            const data = resp.data;
            this.setState({ lancamentos: data, loading: false });
        }).catch(err => {
            console.log(err.response);
        });
    }
}
