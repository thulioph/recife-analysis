import React from 'react';
import Records from '../../utils/records';

// ====

class Resume extends React.Component {
    constructor(props) {
        super(props);
        
        this.records = new Records();
    }

    render() {
        const { 
            allRecords, allMayorEntry, 
            allViceMayorEntry, allPaidValue
        } = this.props;

        return (
            <section className="hero is-dark is-bold">
                <div className="hero-body">
                    <div className="container">
                        <nav className="level">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Movimentações</p>
                                    <p className="title">
                                        {allRecords.length}
                                    </p>
                                </div>
                            </div>

                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Gasto anual</p>
                                    <p className="title">
                                        {this.records.buildPaidValue(allPaidValue)}
                                    </p>
                                </div>
                            </div>

                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Transações do Prefeito</p>
                                    <p className="title">{allMayorEntry.length}</p>
                                </div>
                            </div>

                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Transações do Vice Prefeito</p>
                                    <p className="title">{allViceMayorEntry.length}</p>
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