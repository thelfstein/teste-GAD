import React, { Component } from 'react';
import { MakeRequest } from "../util/HttpHandler"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { Button } from 'reactstrap'



export class Lancamentos extends Component {
    static displayName = Lancamentos.name;

    constructor(props) {
        super(props);

        this.state = { lancamentos: [], loading: true };

    }

    componentDidMount() {
        this.getLancamentos();
    }    

    static renderLancamentos(lancamentos) {
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
                            <td>{(l.valor).toLocaleString()}</td>
                            <td>{l.tipoString}</td>
                            <td>{l.status ? "Sim" : "Não"}</td>
                            <td>
                                <Button  title="Editar" disabled={l.status} size="sm">
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
            : Lancamentos.renderLancamentos(this.state.lancamentos);
        return (
            <div>
                <h3 id="tabelLabel" >Lançamentos Financeiros</h3>
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
