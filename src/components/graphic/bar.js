import React from 'react';
import * as d3 from 'd3';

import Records from '../../utils/records';

// ====

let width = window.screen.width;
let height = 300 - 50;

class GraphicBar extends React.Component {
    constructor(props) {
        super(props);

        this.margin = { 
            top: 0, 
            right: 50, 
            bottom: 30, 
            left: 0
        };

        this.records = new Records();

        this.createCharBar = this.createCharBar.bind(this);

        this.buildHeightBar = this.buildHeightBar.bind(this);
        this.buildRecordsGraphic = this.buildRecordsGraphic.bind(this);
        this.displayMoreInformation = this.displayMoreInformation.bind(this);
    }

    displayMoreInformation(obj) {
        console.warn(
            `O custo foi de: ${this.records.buildPaidValue(obj.valor_pago)}
        `);
    }

    buildRecordsGraphic(arr, viz, x, y) {
        x.domain(arr.map((obj) => obj.mes_movimentacao));
        y.domain([0, d3.max(arr, ((obj) => parseInt(obj.valor_pago, 10)))]);

        // add the rectangles
        viz.selectAll('.bar')
            .remove().exit() // clear the last data
            .data(arr).enter() // call the new data
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (obj) => x(obj.mes_movimentacao))
            .attr('width', x.bandwidth())
            .attr('y', (obj) => y(parseInt(obj.valor_pago, 10)))
            .attr('height', (obj) => this.buildHeightBar(parseInt(obj.valor_pago, 10), y))
            .style('fill', (obj) => {
                if (parseInt(obj.valor_pago, 10) <= 0) {
                    return '#F00'; // negative
                }
            })
            .on('click', (obj) => this.displayMoreInformation(obj));

        // add the xAxis
        viz.append('g').attr('transform', "translate(0," + height + ")").call(d3.axisBottom(x));

        // add the yAxis
        viz.append('g').call(d3.axisLeft(y).ticks(10));
    }

    buildHeightBar(value, y) {
        if (value !== 0 && Math.sign(value) === 1) {
            return height - y(value);
        } else {
            console.warn('diferente', value);
            return y(Math.abs(value));
        }
    }

    createCharBar() {
        const x = d3.scaleBand().range([0, width]).paddingInner(0.1);
        const y = d3.scaleLinear().range([height, 0]);

        const viz = d3.select(this.node);

        viz
            .attr('width', width + this.margin.left + this.margin.right)
            .attr('height', height + this.margin.top + this.margin.bottom)
            .append('g')
                .attr('transform', "translate(" + this.margin.left + "," + this.margin.top + ")");

        const { data } = this.props;

        // avoid the graphic to render many times getting the size of array
        if (data.length > 99) {
            this.buildRecordsGraphic(data, viz, x, y);
        }
    }

    componentDidMount() {
        this.createCharBar();
    }
    
    componentDidUpdate() {
        this.createCharBar();
    }

    render() {
        return(
            <section className="section">
                <div className="container is-fluid">
                    <h1 className="title">Gráficos</h1>
                </div>

                <aside className="graphics">
                    <svg 
                        ref={node => this.node = node}
                        width={500}
                        height={500}>
                    </svg>
                </aside>
            </section>
        );
    }
}

// ====

export default GraphicBar;