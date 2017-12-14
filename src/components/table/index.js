import React from 'react';

// ====

class Table extends React.Component {
    handleClick(obj) {
        console.table(obj);
    }

    buildPaidValue(value) {
        return Number(parseInt(value)).toLocaleString("pt-BR", {
            minimumFractionDigits: 2, style: 'currency', currency: 'BRL'
        });
    }

    render() {
        const { rows } = this.props;

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
                        {rows.map((el) => (
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