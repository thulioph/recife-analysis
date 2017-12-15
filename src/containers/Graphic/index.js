import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/navbar';
import Resume from '../../components/resume';

import GraphicBar from '../../components/graphic/bar';
import GraphicPie from '../../components/graphic/pie';

// ====

class Graphic extends React.Component {
    render() {
        const { allRecords, pathname, barCurrentValue } = this.props;

        return(
            <div>
                <Navbar pathname={pathname} />

                <Resume 
                    boxOne={{}} 
                    boxTwo={{}} 
                    boxTree={{}} 
                    boxFour={{}} 
                />

                <section className="section">
                    <div className="container is-fluid">
                        <h1 className="title">Valor Pago x Mês</h1>
                        <h2 className="subtitle">{barCurrentValue}</h2>

                        <GraphicBar data={allRecords} />
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    
                    <div className="container is-fluid">
                        <h1 className="title">Gráficos</h1>
                        <h2 className="subtitle"></h2>

                        <GraphicPie data={allRecords} />
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
        barCurrentValue: state.graphic.barCurrentValue
    })
)(Graphic);
