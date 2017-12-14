import React from 'react';

import RecifeApi from '../../utils/api/recife';

// ====

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            allPaidValues: 0,
            totalByPrefeito: [],
            totalByVicePrefeito: [],
            allRecords: [],
        };

        this.api = new RecifeApi();
    }

    buildPaidValues(arr) {
        return arr.map((el) => Number(parseInt(el.valor_pago))).reduce((a, b) => a + b, 0);
    }

    buildTotalByPrefeito(arr) {
        return arr.filter((el) => el.orgao_codigo === '10');
    }

    buildTotalByVicePrefeito(arr) {
        return arr.filter((el) => el.orgao_codigo === '12');
    }

    orderByMonth(arr) {
        return arr.sort((a, b) => a.mes_movimentacao - b.mes_movimentacao);
    }

    buildPaidValue(value) {
        return Number(parseInt(value)).toLocaleString("pt-BR", {
            minimumFractionDigits: 2, style: 'currency', currency: 'BRL'
        });
    }

    handleClick(obj) {
        console.warn(obj);
    }

    componentDidMount() {
        this.api.getAllData().then((arr) => {
            const recordsArr = arr.records;

            const allPaidValues = this.buildPaidValues(recordsArr);
            const totalByPrefeito = this.buildTotalByPrefeito(recordsArr);
            const totalByVicePrefeito = this.buildTotalByVicePrefeito(recordsArr);
            const orderedRecords = this.orderByMonth(recordsArr);

            this.setState({
                allPaidValues,
                totalByPrefeito,
                totalByVicePrefeito,
                allRecords: orderedRecords,
            });
        }).catch((err) => console.error(err));
    }

    render() {
        const { allRecords } = this.state;

        return (
            <section className="section">
                <table className="table is-striped is-hoverable is-narrow" id="table-primary">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Origem</th>
                            <th>Descrição</th>
                            <th>Tipo</th>
                            <th>Nome</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {allRecords.map((el) => (
                            <tr key={el._id}>
                                <td>{el.mes_movimentacao}/{el.ano_movimentacao}</td>
                                <td>{this.buildPaidValue(el.valor_pago)}</td>
                                <td>{el.orgao_nome}</td>
                                <td>{el.elemento_nome}</td>
                                <td>{el.subelemento_nome}</td>
                                <td>{el.acao_nome}</td>
                                <td>
                                    <button id={el._id} className="button is-info"
                                        onClick={(evt) => this.handleClick(el)}>
                                        detalhamento
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        );
    }
}

// ====

export default Table;