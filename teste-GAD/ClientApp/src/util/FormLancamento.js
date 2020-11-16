import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import moment from 'moment'
import { MakeRequest } from "../util/HttpHandler"

export class FormLancamento extends Component {
    static displayName = FormLancamento.name;

    constructor(props) {
        super(props);

        const isEdit = this.props.isEdit;

        if (isEdit) {
            const data = this.props.data;

            this.state = {
                id: data.id,
                dataLancamento: moment(data.dataHoraLancamento).format("YYYY-MM-DD"),
                horaLancamento: moment(data.dataHoraLancamento).format("HH:mm:ss"),
                valor: data.valor,
                tipo: data.tipo,
                status: data.status
            }
        } else {
            this.state = {
                id: 0,
                dataLancamento: moment(new Date()).format("YYYY-MM-DD"),
                horaLancamento: moment(new Date()).format("HH:mm:ss"),
                valor: 0,
                tipo: 'D',
                status: false
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
        if (!window.confirm('Deseja salvar os dados?'))
            return;

        const isEdit = this.props.isEdit;

        const dados = this.state;

        let hora = dados.horaLancamento;

        hora = hora.length === 5 ? hora + ':00' : hora

        const fullDate = `${dados.dataLancamento}T${hora}.000Z`

        let postData = {
            id: dados.id,
            dataHoraLancamento: fullDate,
            valor: dados.valor,
            tipo: dados.tipo,
            status: dados.status
        }

        this.postLancamento(postData, isEdit, false);
    }

    handleDelete() {
        if (!window.confirm('Deseja deletar o dado?'))
            return;

        const dados = this.state;

        let hora = dados.horaLancamento;

        hora = hora.length === 5 ? hora + ':00' : hora

        const fullDate = `${dados.dataLancamento}T${hora}.000Z`

        let postData = {
            id: dados.id,
            dataHoraLancamento: fullDate,
            valor: dados.valor,
            tipo: dados.tipo,
            status: dados.status
        }

        this.postLancamento(postData, false, true);
    }

    redirectToHome() {
        this.props.history.push('/');
    }


    render() {
        let conciliadoDiv = '';
        let deleteDiv = '';

        const isEdit = this.props.isEdit;

        if (isEdit) {
            conciliadoDiv = <Row>
                <Col md="3" sm="3" lg="3">
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="status" value={this.state.status} onChange={this.handleInputChange} />{' '}
                                Conciliado
                            </Label>
                    </FormGroup>
                </Col>
            </Row>

            deleteDiv = <Col md="1" sm="1" lg="1">
                <Button outline color="danger" onClick={() => this.handleDelete()}>Deletar</Button>
            </Col>

        }

        return (
            <div>
                <Form>
                    <Row>
                        <Col md="3" sm="3" lg="3">
                            <FormGroup>
                                <Label for="horaLancamento">Data Lançamento</Label>
                                <Input type="date" name="dataLancamento" id="dataLancamento" value={this.state.dataLancamento} onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col md="3" sm="3" lg="3">
                            <FormGroup>
                                <Label for="dataLancamento">Hora Lançamento</Label>
                                <Input type="time" name="horaLancamento" id="horaLancamento" value={this.state.horaLancamento} onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col md="3" sm="3" lg="3">
                            <FormGroup>
                                <Label for="valor">Valor</Label>
                                <Input type="number" name="valor" id="valor" value={this.state.valor} onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col md="3" sm="3" lg="3">
                            <FormGroup>
                                <Label for="tipoOperacao">Tipo</Label>
                                <Input type="select" name="tipo" id="tipo" value={this.state.tipo} onChange={this.handleInputChange}>
                                    <option value='C'>Crédito</option>
                                    <option value='D'>Débito</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    {conciliadoDiv}
                </Form>
                <br/>
                <Row>
                    <Col md="1" sm="1" lg="1">
                        <Button outline color="primary" onClick={() => this.handleSubmit()}>Salvar</Button>
                    </Col>
                    {deleteDiv}
                </Row>
            </div>
        )
    }

    postLancamento(dados, isEdit, isDelete) {
        let url
        let httpType;

        if (isEdit) {
            url = 'LancamentoFinanceiro/PutLancamentoFinanceiro'
            httpType = 'PUT'
        }
        else {
            url = 'LancamentoFinanceiro/PostLancamentoFinanceiro'
            httpType = 'POST'
        }

        if (isDelete) {
            url = 'LancamentoFinanceiro/DeleteLancamentoFinanceiro'
            httpType = 'DELETE'
        }

        MakeRequest({ url: url, data: dados, method: httpType }).then(resp => {
            alert(isEdit ? 'Dado alterado com sucesso!' : isDelete ? 'Dado deletado com sucesso!' : 'Dado criado com sucesso!');
            this.redirectToHome();
        }).catch(err => {
            alert('Erro:' + err.message);
        });
    }
}
