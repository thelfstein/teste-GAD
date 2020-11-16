import React, { Component } from 'react';
import { MakeRequest } from "../util/HttpHandler"
import { Button, FormGroup, Label, Input, Row, Col, Alert } from 'reactstrap';
import moment from 'moment'



export class BalancoMensal extends Component {
    static displayName = BalancoMensal.name;

    constructor(props) {
        super(props);

        this.state = {
            balancoDiario: null,
            loading: false,
            dataBalanco: moment(new Date()).format("YYYY-MM")
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

        let data = this.state.dataBalanco + '-01';

        this.getBalancoMes(data);
    }

    renderBalanco() {

        const balanco = this.state.balancoDiario;

        let content

        if (balanco.length === 0) {
            content = <div>
                <br />
                <Alert color='danger'>Não há lançamentos para o mês desejado</Alert>
            </div>
        } else {
            content = <div>
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
                        {balanco.map(b =>
                            <tr key={b.dataBalanco}>
                                <td>{moment(b.dataBalanco).format("DD/MM/YYYY")}</td>
                                <td>{(b.valorTotalCredito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{(b.valorTotalDebito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{(b.valorSaldo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        }

        return content;
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.state.balancoDiario == null ? '' : this.renderBalanco();
        return (
            <div>
                <h3 id="tabelLabel" >Balan�o Di�rio</h3>
                <br />
                <Row>
                    <Col sm="3" md="3" lg="3">
                        <FormGroup>
                            <Label for="dataBalanco">Data Balan�o</Label>
                            <Input type="month" name="dataBalanco" id="dataBalanco" value={this.state.dataBalanco} onChange={this.handleInputChange} />
                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col md="1" sm="1" lg="1">
                        <Button outline color="primary" onClick={() => this.handleSubmit()}>Consultar</Button>
                    </Col>
                </Row>
                {contents}
            </div>
        );
    }

    async getBalancoMes(date) {
        let url = `Balanco/GetBalancoByMonth?date=${date}`

        this.setState({ loading: true });

        MakeRequest({ url }).then(resp => {
            const data = resp.data;
            this.setState({ balancoDiario: data, loading: false });
        }).catch(err => {
            alert(err.message);
            console.log(err.response);
        });
    }
}
