import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Lancamentos } from './components/Lancamentos';
import { EditLancamento } from './components/EditLancamento';
import { NewLancamento } from './components/NewLancamento';
import { BalancoDiario } from './components/BalancoDiario';
import { BalancoMensal } from './components/BalancoMensal';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Lancamentos} />
                <Route path='/new-lancamento/' component={NewLancamento} />
                <Route path='/edit-lancamento/:IdLancamento' component={EditLancamento} />                
                <Route path='/balanco-diario/' component={BalancoDiario} />                
                <Route path='/balanco-mensal/' component={BalancoMensal} />                
            </Layout>
        );
    }
}
