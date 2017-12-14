import React from 'react';
import * as d3 from 'd3';

// ====

let margin = { top: 0, right: 50, bottom: 30, left: 0 };
let width = screen.width;
let height = 300 - 50;

let x = d3.scaleBand().range([0, width]).paddingInner(0.1);
let y = d3.scaleLinear().range([height, 0]);

let svg = d3.select('.graphics').append('svg');

const viz = svg
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

// ====

class GraphicBar extends React.Component {
    displayMoreInformation(obj) {
        console.warn(`O custo foi de: ${buildPaidValue(obj.valor_pago)}`);
    }

    buildRecordsGraphic(arr) {
        x.domain(arr.map((obj) => obj.mes_movimentacao));
        y.domain([0, d3.max(arr, ((obj) => parseInt(obj.valor_pago)))]);

        // add the rectangles
        viz
            .selectAll('.bar')
            .remove().exit() // clear the last data
            .data(arr).enter() // call the new data
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (obj) => x(obj.mes_movimentacao))
            .attr('width', x.bandwidth())
            .attr('y', (obj) => y(parseInt(obj.valor_pago)))
            .attr('height', (obj) => buildHeightBar(parseInt(obj.valor_pago)))
            .style('fill', (obj) => {
                if (parseInt(obj.valor_pago) <= 0) {
                    return '#F00'; // negative
                }
            })
            .on('click', (obj) => displayMoreInformation(obj));

        // add the xAxis
        viz.append('g').attr('transform', "translate(0," + height + ")").call(d3.axisBottom(x));

        // add the yAxis
        viz.append('g').call(d3.axisLeft(y).ticks(10));
    }

    buildHeightBar(value) {
        if (value !== 0 && Math.sign(value) === 1) {
            return height - y(value);
        } else {
            console.warn('diferente', value);
            return y(Math.abs(value));
        }
    }

    componentDidMount() {}

    render() {
        return(
            <section className="section">
                <div className="container is-fluid">
                    <h1 className="title">Gráficos</h1>
                </div>

                <aside className="graphics"></aside>
            </section>
        );
    }
}

// ====

export default GraphicBar;