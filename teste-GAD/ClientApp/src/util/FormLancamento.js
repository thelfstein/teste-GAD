import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import moment from 'moment'

export class FormLancamento extends Component {
    static displayName = FormLancamento.name;

    constructor(props) {
        super(props);

        const isEdit = this.props.isEdit;

        let lancamentoData;

        if (isEdit) {
            const data = this.props.data;

            lancamentoData = {
                dataLancamento: moment(data.dataHoraLancamento).format("YYYY-MM-DD"),
                horaLancamento: moment(data.dataHoraLancamento).format("HH:mm:ss"),
                valor: data.valor,
                tipo: data.tipo,
                status: data.status
            }
        } else {
            lancamentoData = {
                dataLancamento: moment(new Date()).format("YYYY-MM-DD"),
                horaLancamento: moment(new Date()).format("HH:mm:ss"),
                valor: 0,
                tipo: 'D',
                status: false
            }
        }

        this.state = {
            lancamentoData: lancamentoData
        };

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(value);

        this.setState({
            [name]: value
        });
    }


    handleSubmit(event) {
        alert('Dados' + this.state.lancamentoData.valor);
        event.preventDefault();
    }


    render() {
        let conciliadoDiv = '';

        const isEdit = this.props.isEdit;

        if (isEdit) {
            conciliadoDiv = <Row>
                <Col md="3" sm="3" lg="3">
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="checkbox" checked={this.state.lancamentoData.status} onChange={this.handleInputChange} />{' '}
                                Conciliado
                            </Label>
                    </FormGroup>
                </Col>
            </Row>
        }

        return (
            <Form>
                <Row>
                    <Col md="3" sm="3" lg="3">
                        <FormGroup>
                            <Label for="horaLancamento">Data Lançamento</Label>
                            <Input type="date" name="date" id="dataHoraLancamento" value={this.state.lancamentoData.dataLancamento} onChange={this.handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md="3" sm="3" lg="3">
                        <FormGroup>
                            <Label for="dataLancamento">Hora Lançamento</Label>
                            <Input type="time" name="time" id="dataHoraLancamento" value={this.state.lancamentoData.horaLancamento} onChange={this.handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md="3" sm="3" lg="3">
                        <FormGroup>
                            <Label for="valor">Valor</Label>
                            <Input type="number" name="number" id="valor" value={this.state.lancamentoData.valor} onChange={this.handleInputChange} />
                        </FormGroup>
                    </Col>
                    <Col md="3" sm="3" lg="3">
                        <FormGroup>
                            <Label for="tipoOperacao">Tipo</Label>
                            <Input type="select" name="select" id="tipoOperacao" value={this.state.lancamentoData.tipo} onChange={this.handleInputChange}>
                                <option value='C'>Crédito</option>
                                <option value='D'>Débito</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                {conciliadoDiv}
                <Row>
                    <Col md="12" sm="12" lg="12">
                        <Button outline color="primary" type="submit">Salvar</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
