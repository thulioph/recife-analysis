import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/navbar';
import Menu from '../../components/menu';
import BubbleGraphic from '../../components/graphic/bubble';
import Card from '../../components/card';

// ====

class Bubble extends React.Component {
    render() {
        const { pathname, allRecords, bubbleValue } = this.props;

        let BubbleCardComponent;

        if (bubbleValue) {
            BubbleCardComponent = <Card {...bubbleValue} />
        }

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
                            {BubbleCardComponent}

                            <BubbleGraphic data={allRecords} />
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
        allRecords: state.table.allRecords,
        bubbleValue: state.graphic.bubbleCurrentValue
    })
)(Bubble);
