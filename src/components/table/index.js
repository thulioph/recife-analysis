import React from 'react';

import Records from '../../utils/records';

import store from '../../store';
import { displayModal, updateModalContent } from '../../actions/system';

// ====

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.records = new Records();
    }

    handleClick(obj) {
        store.dispatch(
            updateModalContent(obj)
        );

        store.dispatch(
            displayModal(true)
        );
    }

    render() {
        const { rows } = this.props;

        return (
            <table className="table is-striped is-hoverable is-narrow" id="table-primary">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Valor</th>
                        <th>Origem</th>
                        <th>Descrição</th>
                        <th>Tipo</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((el) => (
                        <tr key={el._id}>
                            <td>{el.mes_movimentacao}/{el.ano_movimentacao}</td>
                            <td>{this.records.buildPaidValue(el.valor_pago)}</td>
                            <td>{el.orgao_nome}</td>
                            <td>{el.elemento_nome}</td>
                            <td>{el.subelemento_nome}</td>
                            <td>
                                <button id={el._id} className="button is-info"
                                    onClick={(evt) => this.handleClick(el)}>
                                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

// ====

export default Table;