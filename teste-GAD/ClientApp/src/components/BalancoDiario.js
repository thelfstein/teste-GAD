import React, { Component } from 'react';
import { MakeRequest } from "../util/HttpHandler"
import { Button, FormGroup, Label, Input, Row, Col, FormFeedback } from 'reactstrap';
import moment from 'moment'


export class BalancoDiario extends Component {
    static displayName = BalancoDiario.name;

    constructor(props) {
        super(props);

        this.state = {
            balancoDiario: null,
            loading: false,
            dataBalanco: moment(new Date()).format("YYYY-MM-DD")
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        //this.getLancamentos();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

        let data = this.state.dataBalanco;

        this.getBalancoDia(data);
    }

    renderBalanco() {

        const balanco = this.state.balancoDiario;

        return (
            <div>
                <br />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>DataBalanco</th>
                            <th>Valor Total Crédito</th>
                            <th>Valor Total Débito</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{moment(balanco.dataBalanco).format("DD/MM/YYYY")}</td>
                            <td>{(balanco.valorTotalCredito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td>{(balanco.valorTotalDebito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            <td>{(balanco.valorSaldo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.state.balancoDiario == null ? '' : this.renderBalanco();
        return (
            <div>
                <h3 id="tabelLabel" >Balanço Diário</h3>
                <br />
                <Row>
                    <Col sm="3" md="3" lg="3">
                        <FormGroup>
                            <Label for="dataBalanco">Data Balanço</Label>
                            <Input type="date" name="dataBalanco" id="dataBalanco" value={this.state.dataBalanco} invalid={this.state.dataBalanco === ''} onChange={this.handleInputChange} />
                            <FormFeedback>Necessário preencher a data!</FormFeedback>
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col md="1" sm="1" lg="1">
                        <Button outline color="primary" onClick={() => this.handleSubmit()} disabled={this.state.dataBalanco === ''}>Consultar</Button>
                    </Col>
                </Row>
                {contents}
            </div>
        );
    }

    async getBalancoDia(date) {
        let url = `Balanco/GetBalancoByDate?date=${date}`

        this.setState({ loading: true });

        MakeRequest({ url }).then(resp => {
            const data = resp.data;
            this.setState({ balancoDiario: data, loading: false });
        }).catch(err => {
            console.log(err.response);
        });
    }
}
