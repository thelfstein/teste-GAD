import React, { Component } from 'react';
import { MakeRequest } from "../util/HttpHandler"
import { FormLancamento } from '../util/FormLancamento'

export class EditLancamento extends Component {
    static displayName = EditLancamento.name;

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

    }

    componentDidMount() {
        const lancamentoId = this.props.match.params.IdLancamento;
        this.getLancamentoById(lancamentoId);
    }

    handleSubmit(event) {
        alert('Dados' + this.state.lancamentoData.valor);
        event.preventDefault();
    }


    render() {
        let content
        
        content = this.state.loading ? <p><em>Carregando...</em></p> :
            <FormLancamento isEdit={true} data={this.state.lancamentoData} />

        return (
            <div>
                {content}
            </div>
        );
    }

    async getLancamentoById(id) {
        MakeRequest({ url: 'LancamentoFinanceiro/GetLancamentoFinanceiroById?id=' + id }).then(resp => {
            const data = resp.data;
            console.log(data);
            this.setState({ lancamentoData: data, loading: false });
        }).catch(err => {
            console.log(err.response);
        });
    }
}
