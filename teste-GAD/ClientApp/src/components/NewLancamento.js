import React, { Component } from 'react';
import { FormLancamento } from '../util/FormLancamento'

export class NewLancamento extends Component {
    static displayName = NewLancamento.name;

    constructor(props) {
        super(props);

        this.state = {
            lancamentoData: {
                dataLancamento: new Date(),
                horaLancamento: new Date(),
                valor: 0
            }
        };

    }

    handleSubmit(event) {
        alert('Dados' + this.state.lancamentoData.valor);
        event.preventDefault();
    }


    render() {

        return (
            <div>
                <h3 id="tabelLabel" >Novo Lançamento</h3>
                <br />
                <FormLancamento isEdit={false} />
            </div>

        )

    }

}
