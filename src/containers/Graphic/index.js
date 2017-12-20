import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/navbar';
import Resume from '../../components/resume';
import GraphicBar from '../../components/graphic/bar';
import GraphicPie from '../../components/graphic/pie';
import Bubble from '../../components/graphic/bubble';

import Storage from '../../utils/storage';

// ====

class Graphic extends React.Component {
    constructor(props) {
        super(props);

        this.storage = new Storage('api_data');
    }

    componentDidMount() {
        this.data = this.storage.get();
    }

    render() {
        let { allRecords, pathname, barCurrentValue } = this.props;

        if (allRecords) {
            allRecords = this.storage.get().records;
        }

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
                        <h1 className="title">Pie</h1>
                        <h2 className="subtitle"></h2>

                        <GraphicPie data={allRecords} />
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    
                    <div className="container is-fluid">
                        <h1 className="title">Valor pago por mês</h1>
                        <h2 className="subtitle"></h2>

                        <Bubble data={allRecords} />
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
