import React from 'react';
import * as d3 from 'd3';

// ====

class GraphicBar extends React.Component {
    constructor(props) {
        super(props);

        this.createCharPie = this.createCharPie.bind(this);
        this.buildChartPie = this.buildChartPie.bind(this);
    }

    buildChartPie() {}

    createCharPie(data) {
        const width = 400;
        const height = 400;
        const thickness = 40;
        const duration = 750;
        const padding = 10;
        const opacity = .8;
        const opacityHover = 1;
        const otherOpacityOnHover = .8;
        const tooltipMargin = 13;

        const radius = Math.min(width-padding, height-padding) / 2;
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const svg = d3.select(this.node).attr('class', 'pie').attr('width', width).attr('height', height);
        const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);

        const arc = d3.arc().innerRadius(0).outerRadius(radius);
        const pie = d3.pie().value((d) => parseInt(d.valor_pago, 10)).sort(null);

        const path = g.selectAll('path')
                        .data(pie(data))
                        .enter()
                        .append('g')
                        .append('path')
                        .attr('d', arc)
                        .attr('fill', (d, i) => color(i))
                        .style('opacity', opacity)
                        .style('stroke', 'white')
                        .on('mouseover', (el) => {})
                        .on('mousemove', (el) => {})
                        .on('mouseout', (el) => {})
        
        let legend = d3.select('#bar-wrapper').append('div')
                        .attr('class', 'legend')
                        .style('margin-top', '30px')
                        .style('overflow', 'scroll')
                        .style('height', '190px');

        let keys = legend.selectAll('.keys')
                        .data(data)
                        .enter()
                        .append('div')
                        .attr('class', 'key')
                        .style('display', 'flex')
                        .style('align-items', 'center')
                        .style('margin-right', '20px');
        
        keys.append('div')
			.attr('class', 'symbol')
			.style('height', '10px')
			.style('width', '10px')
			.style('margin', '5px 5px')
            .style('background-color', (d, i) => color(i));
            
        keys.append('div')
            .attr('class', 'name')
            .text(d => `${d.grupo_despesa_nome} (${d.valor_pago})`);
        
        keys.exit().remove();
    }

    componentDidMount() {
        const { data } = this.props;
        this.createCharPie(data);
    }

    componentDidUpdate() {
        const { data } = this.props;
        this.createCharPie(data);
    }

    render() {
        return (
            <aside id="bar-wrapper">
                <svg
                    ref={node => this.node = node}
                    width={800}
                    height={400}>
                </svg>
            </aside>
        );
    }
}

// ====

export default GraphicBar;