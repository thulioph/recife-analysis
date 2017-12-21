import React from 'react';
import * as d3 from 'd3';

import Records from '../../utils/records';

import store from '../../store';
import { changeBarCurrentValue } from '../../actions/graphic';

// ====

class GraphicBar extends React.Component {
    constructor(props) {
        super(props);

        this.records = new Records();

        this.margin = {top: 20, right: 20, bottom: 30, left: 80};

        this.createCharBar = this.createCharBar.bind(this);
        this.displayMoreInformation = this.displayMoreInformation.bind(this);
        this.buildChart = this.buildChart.bind(this);
    }

    displayMoreInformation(obj) {
        store.dispatch(
            changeBarCurrentValue(this.records.buildPaidValue(obj.valor_pago))
        );
    }

    buildChart(data, svg, width, height, tooltip, x, y, g) {
        data.sort((a, b) => parseInt(b.mes_movimentacao, 10) - parseInt(a.mes_movimentacao, 10));

        x.domain([0, d3.max(data, (el) => parseInt(el.valor_pago, 10))]);
        y.domain(data.map((el) => el.mes_movimentacao)).padding(0.2);

        g.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat((el) => parseInt(el / 1000)).tickSizeInner([-height]));
        
        g.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(y));

        g.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('height', y.bandwidth())
            .attr('y', (el) => y(el.mes_movimentacao))
            .attr('width', (el) => x(Math.abs(parseInt(el.valor_pago, 10))))
            .on('mousemove', (el) => {
                tooltip
                    .style('left', `${(d3.event.pageX - 50)}px`)
                    .style('top', `${(d3.event.pageY - 70)}px`)
                    .style('display', 'inline-block')
                    .html(
                        (this.records.buildPaidValue(el.valor_pago))
                    )
            })
            .on('mouseout', () => tooltip.style('display', 'none'));
    }

    createCharBar(data) {
        const svg = d3.select(this.node);

        const width = svg.attr('width') - this.margin.left - this.margin.right;
        const height = svg.attr('height') - this.margin.top - this.margin.bottom;

        const tooltip = d3.select('body').append('div').attr('class', 'tooltip');
        
        const x = d3.scaleLinear().range([0, width]);
        const y = d3.scaleBand().range([height, 0]);

        const g = svg.append('g').attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.buildChart(data, svg, width, height, tooltip, x, y, g);
    }

    componentDidMount() {
        const { data } = this.props;
        this.createCharBar(data);
    }
    
    componentDidUpdate() {
        const { data } = this.props;
        this.createCharBar(data);
    }

    render() {
        return(
            <svg 
                ref={node => this.node = node}
                width={960}
                height={500}>
            </svg>
        );
    }
}

// ====

export default GraphicBar;