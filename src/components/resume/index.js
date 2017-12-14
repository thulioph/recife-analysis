import React from 'react';

// ====

class Resume extends React.Component {
    render() {
        return (
            <section className="hero is-dark is-bold">
                <div className="hero-body">
                    <div className="container">
                        <nav className="level">
                            <div className="level-item has-text-centered">
                                <div id="total-box">
                                    <p className="heading">Movimentações</p>
                                    <p className="title"></p>
                                </div>
                            </div>

                            <div className="level-item has-text-centered">
                                <div id="total-paid-box">
                                    <p className="heading">Gasto anual</p>
                                    <p className="title"></p>
                                </div>
                            </div>

                            <div className="level-item has-text-centered">
                                <div id="total-prefeito-box">
                                    <p className="heading">Transações do Prefeito</p>
                                    <p className="title"></p>
                                </div>
                            </div>

                            <div className="level-item has-text-centered">
                                <div id="total-vice-prefeito-box">
                                    <p className="heading">Transações do Vice Prefeito</p>
                                    <p className="title"></p>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </section>
        );
    }
}

// ====

export default Resume;
