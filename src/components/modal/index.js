import React from 'react';

import store from '../../store';
import { displayModal } from '../../actions/system';

// ====

class Modal extends React.Component {
    closeModal() {
        store.dispatch(
            displayModal(false)
        );
    }

    render() {
        const { isActive, content } = this.props;
        console.table(content);
        
        return (
            <div className={isActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{content.unidade_nome}</p>
                    </header>

                    <section className="modal-card-body">
                        <table className="table is-striped is-narrow is-fullwidth">
                            <tbody>
                                <tr><td>{content.programa_nome}</td></tr>

                                <tr><td>{content.grupo_despesa_nome}</td></tr>
                                <tr><td>{content.subelemento_nome}</td></tr>
                                <tr><td>{content.categoria_economica_nome}</td></tr>

                                <tr><td>{content.orgao_nome}</td></tr>
                                <tr><td>{content.acao_nome}</td></tr>
                                <tr><td>{content.elemento_nome}</td></tr>
                                <tr><td>{content.funcao_nome}</td></tr>
                                
                                <tr><td>{content.valor_pago}</td></tr>
                            </tbody>
                        </table>
                    </section>

                    <footer className="modal-card-foot">
                        <button
                            onClick={() => this.closeModal()}
                            id="close-modal"
                            className="button is-light"
                            aria-label="close">
                            OK
                        </button>
                    </footer>
                </div>
            </div>
        );
    }
}

// ====

export default Modal;