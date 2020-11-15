import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Lancamentos } from './components/Lancamentos';
import { EditLancamento } from './components/EditLancamento';
import { NewLancamento } from './components/NewLancamento';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Lancamentos} />
                <Route path='/new-lancamento/' component={NewLancamento} />
                <Route path='/edit-lancamento/:IdLancamento' component={EditLancamento} />
            </Layout>
        );
    }
}
