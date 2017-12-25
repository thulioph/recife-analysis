import React from 'react';
import * as d3 from 'd3';

import Records from '../../utils/records';

import store from '../../store';
import { changeBubbleValue } from '../../actions/graphic';

// ====

class Bubble extends React.Component {
    constructor(props) {
        super(props);

        this.createBubbleChart = this.createBubbleChart.bind(this);
        this.buildBubbleChart = this.buildBubbleChart.bind(this);
        this.updateMouseMove = this.updateMouseMove.bind(this);
        this.updateOnClick = this.updateOnClick.bind(this);

        this.utils = new Records();
    }

    buildBubbleChart(svg, color, pack, data, tooltip) {
        const root = d3.hierarchy({children: data})
                        .sum((obj) => Number(parseInt(obj.valor_pago, 10)))
                        .each((el) => el.data._id);
        
        const node = svg.selectAll('.node')
                        .data(pack(root).leaves())
                        .enter()
                        .append('g')
                        .attr('class', 'node')
                        .attr('transform', (d) =>  `translate(${d.x}, ${d.y})`);

        node.append('circle')
            .attr('id', (el) => el.data._id)
            .attr('r', (el) => el.r)
            .style('fill', (el) => color(el.data.mes_movimentacao))
            .on('click', (el) => this.updateOnClick(el))
            .on('mousemove', (el) => this.updateMouseMove(el, tooltip))
            .on('mouseout', (el) => tooltip.style('display', 'none'));
        
        // node.append('text')
        //     .text((el) => `${el.data.mes_movimentacao}/${el.data.ano_movimentacao}`);
    }

    updateMouseMove(el, tooltip) {
        tooltip
            .style('left', `${(d3.event.pageX - 120)}px`)
            .style('top', `${(d3.event.pageY - 160)}px`)
            .style('display', 'inline-block')
            .html(
                `
                    ${el.data.subelemento_nome} <br />
                    <span>${this.utils.buildPaidValue(el.data.valor_pago)}</span>
                `
            )
    }

    updateOnClick(el) {
        store.dispatch(
            changeBubbleValue(el.data)
        );
    }

    createBubbleChart(data) {
        const svg = d3.select(this.node);
        const width = svg.attr('width');
        const height = svg.attr('height');

        const color = d3.scaleOrdinal(d3.schemeCategory20c);
        const pack = d3.pack().size([width, height]).padding(0.5);
        const tooltip = d3.select('body').append('aside').attr('class', 'tooltip ');

        this.buildBubbleChart(svg, color, pack, data, tooltip);
    }

    componentDidMount() {
        const { data } = this.props;
        this.createBubbleChart(data);
    }

    componentDidUpdate() {
        const { data } = this.props;
        this.createBubbleChart(data);
    }

    render() {
        return (
            <svg
                ref={node => this.node = node}
                width={960}
                height={960}>
            </svg>
        );
    }
}

// ====

export default Bubble;