import React from 'react';
import * as d3 from 'd3';

// ====

class GraphicBar extends React.Component {
    constructor(props) {
        super(props);

        this.createCharPie = this.createCharPie.bind(this);
        this.buildChartPie = this.buildChartPie.bind(this);
    }

    buildChartPie(g, pie, data, path, label, color) {
        const arc = g
                    .selectAll('.arc')
                    .data(pie(data))
                    .enter()
                    .append('g')
                    .attr('class', 'arc');
        
        arc
            .append('path')
            .attr('d', path)
            .attr('fill', (d) => color(d.data.valor_pago));

        arc
            .append('text')
            .attr('transform', (d) => "translate(" + label.centroid(d) + ")")
            .attr('dy', '0.35em')
            .text((d) => d.data.valor_pago);
    }

    createCharPie() {
        const svg = d3.select(this.node);
        const width = svg.attr('width');
        const height = svg.attr('height');
        const radius = Math.min(width, height) / 2;
        
        const color = d3.scaleOrdinal([
            "#98ABC5", 
            "#8A89A6", 
            "#7B6888", 
            "#6B486B", 
            "#A05D56", 
            "#D0743C", 
            "#FF8C00"
        ]);
        
        const { data } = this.props;
        
        const g = svg.append('g').attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        const pie = d3.pie().sort(null).value((el) => el.valor_pago);
        const path = d3.arc().outerRadius(radius - 10).innerRadius(0);
        const label = d3.arc().outerRadius(radius - 40).innerRadius(radius - 40);

        this.buildChartPie(g, pie, data, path, label, color);
    }

    componentDidMount() {
        this.createCharPie();
    }

    componentDidUpdate() {
        this.createCharPie();
    }

    render() {
        return (
            <svg
                ref={node => this.node = node}
                width={500}
                height={500}>
            </svg>
        );
    }
}

// ====

export default GraphicBar;