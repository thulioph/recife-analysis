import React from 'react';
import Records from '../../utils/records';

// ====

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.utils = new Records();
    }

    render() {
        return (
            <table className="table is-striped is-hoverable is-narrow card-table">
                <thead>
                    <tr>
                        <th>key</th>
                        <th>value</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>        
                    <tr>
                        <td>ação</td>
                        <td>{this.props.acao_nome}</td>
                    </tr>
                    
                    <tr>
                        <td>credor</td>
                        <td>{this.props.credor_nome}</td>
                    </tr>

                    <tr>
                        <td>subfunção</td>
                        <td>{this.props.subfuncao_nome}</td>
                    </tr>
                    
                    <tr>
                        <td>categoria economica</td>
                        <td>{this.props.categoria_economica_nome}</td>
                    </tr>
                    
                    <tr>
                        <td>função</td>
                        <td>{this.props.funcao_nome}</td>
                    </tr>
                    
                    <tr>
                        <td>programa</td>
                        <td>{this.props.programa_nome}</td>
                    </tr>

                    <tr>
                        <td>modalidade da licitacao</td>
                        <td>{this.props.modalidade_licitacao_nome}</td>
                    </tr>
                    
                    <tr>
                        <td>grupo de despesas</td>
                        <td>{this.props.grupo_despesa_nome}</td>
                    </tr>

                    <tr>
                        <td>unidade</td>
                        <td>{this.props.unidade_nome}</td>
                    </tr>
                    
                    <tr>
                        <td>orgão</td>
                        <td>{this.props.orgao_nome}</td>
                    </tr>

                    <tr>
                        <td>subelemento</td>
                        <td>{this.props.subelemento_nome}</td>
                    </tr>
                    
                    <tr>
                        <td>elemento</td>
                        <td>{this.props.elemento_nome}</td>
                    </tr>
                    
                    <tr>
                        <td>valor pago</td>
                        <td>{this.utils.buildPaidValue(this.props.valor_pago)}</td>
                    </tr>
                    
                    <tr>
                        <td>mês/ano</td>
                        <td>{this.props.mes_movimentacao}/{this.props.ano_movimentacao}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

// ====

export default Card;