import React from 'react';
import * as d3 from 'd3';

import Records from '../../utils/records';

// ====

class Bubble extends React.Component {
    state = {
        current: {
            nome: '',
            total: '',
            unidade: '',
            elemento: ''
        }
    };

    constructor(props) {
        super(props);

        this.createBubbleChart = this.createBubbleChart.bind(this);
        this.buildBubbleChart = this.buildBubbleChart.bind(this);
        this.updateMouseMove = this.updateMouseMove.bind(this);

        this.utils = new Records();
    }

    buildBubbleChart(svg, color, pack, data) {
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
            .on('click', (el) => this.updateMouseMove(el));
        
        node.append('clipPath')
            .attr('id', (el) => `clip-${el.data._id}`)
            .append('use')
            .attr('xlink:href', (el) => `#${el.data._id}`);

        node.append('text')
            .attr('clipPath', (el) => `url(#clip-${el.data._id})`)
            .selectAll('tspan')
            .data((el) => el.data.subelemento_nome.split(' ')[0])
            .enter()
            .append('tspan')
            .style('text-align', 'center')
            .style('font-size', '10')
            .style('text-anchor', 'middle')
            .text((el) => el);

        node.append('title')
            .text((el) => `${el.data.subelemento_nome} - ${this.utils.buildPaidValue(el.data.valor_pago)}`);
    }

    updateMouseMove(el) {
        // console.log(el.data.mes_movimentacao);

        this.setState({
            current: {
                nome: el.data.subelemento_nome,
                total: this.utils.buildPaidValue(el.data.valor_pago),
                unidade: el.data.unidade_nome,
                elemento: el.data.elemento_nome
            }
        });
    }

    createBubbleChart(data) {
        const svg = d3.select(this.node);
        const width = svg.attr('width');
        const height = svg.attr('height');

        const color = d3.scaleOrdinal(d3.schemeCategory20c);
        const pack = d3.pack().size([width, height]).padding(0.5);

        this.buildBubbleChart(svg, color, pack, data);
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
        const { current } = this.state;

        return (
            <div>
                <h4>{current.nome}</h4>
                <h4>{current.total}</h4>
                <h4>{current.unidade}</h4>
                <h4>{current.elemento}</h4>

                <svg
                    ref={node => this.node = node}
                    width={960}
                    height={960}>
                </svg>
            </div>
        );
    }
}

// ====

export default Bubble;