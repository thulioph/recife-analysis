import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/navbar';
import Menu from '../../components/menu';
import PieGraphic from '../../components/graphic/pie';

import Storage from '../../utils/storage';

// ====

class Pie extends React.Component {
    constructor(props) {
        super(props);

        this.storage = new Storage('api_data');
    }

    componentDidMount() {
        this.data = this.storage.get();
    }

    render() {
        const { pathname, allRecords } = this.props;

        return(
            <div>
                <Navbar />
                
                <section className="hero is-medium is-dark is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Análise
                            </h1>
                            
                            <h2 className="subtitle">
                                Despesas Orçamentárias do <strong>Recife</strong>.
                            </h2>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="app-container">
                        <section className="wrapper-menu">
                            <Menu pathname={pathname} />
                        </section>

                        <section className="section wrapper-content">
                            <PieGraphic data={allRecords} />
                        </section>
                    </div>
                </section>
            </div>
        )
    }
}

// ====

export default connect(
    (state) => ({
        allRecords: state.table.allRecords
    })
)(Pie);
