import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-d3-angluar',
  templateUrl: './d3-angluar.component.html',
  styleUrls: ['./d3-angluar.component.scss']
})
export class D3AngluarComponent implements OnInit {

  private d3: any = null;
  private width = 960;
  private height = 700;
  private radius = Math.min(this.width, this.height) / 2;

  private x = null;
  private y = null;
  private color = null;
  private svg = null;
  private partition = null;
  private arc = null;

  constructor() {
    /**
     * Note
     * Converted all standard function calls into ()=> calls to preserve this context
     */

  }

  ngOnInit() {
    this.d3 = window['d3'];

    this.x = this.d3.scale.linear()
      .range([0, 2 * Math.PI]);

    this.y = this.d3.scale.linear()
      .range([0, this.radius]);

    this.color = this.d3.scale.category20c();

    this.svg = this.d3.select('#zoomable-sun-burst-target').append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + (this.height / 2 + 10) + ')');

    this.partition = this.d3.layout.partition()
      .value((d) => d.size);

    this.arc = this.d3.svg.arc()
      .startAngle((d) => Math.max(0, Math.min(2 * Math.PI, this.x(d.x))))
      .endAngle((d) => Math.max(0, Math.min(2 * Math.PI, this.x(d.x + d.dx))))
      .innerRadius((d) => Math.max(0, this.y(d.y)))
      .outerRadius((d) => Math.max(0, this.y(d.y + d.dy)));

    this.constructZoomableSunBurstChart();
  }

  private constructZoomableSunBurstChart() {
    this.d3.json('/assets/data/flare.json', (error, root) => {
      const g = this.svg.selectAll('g')
        .data(this.partition.nodes(root))
        .enter().append('g');

      const click = (d) => {
        // fade out all text elements
        text.transition().attr('opacity', 0);

        const self = this;

        path.transition()
          .duration(750)
          .attrTween('d', this.arcTween(d))
          .each('end', function (e, i) {
            // check if the animated element's data e lies within the visible angle span given in d
            if (e.x >= d.x && e.x < (d.x + d.dx)) {
              // get a selection of the associated text element
              const arcText = self.d3.select(this.parentNode).select('text');
              // fade in the text element and recalculate positions
              arcText.transition().duration(750)
                .attr('opacity', 1)
                .attr('transform', () => 'rotate(' + self.computeTextRotation(e) + ')')
                .attr('x', (_d) => self.y(_d.y));
            }
          });
      };

      const path = g.append('path')
        .attr('d', this.arc)
        .style('fill', (d) => this.color((d.children ? d : d.parent).name))
        .on('click', click);

      const text = g.append('text')
        .attr('transform', (d) => 'rotate(' + this.computeTextRotation(d) + ')')
        .attr('x', (d) => this.y(d.y))
        .attr('dx', '6') // margin
        .attr('dy', '.35em') // vertical-align
        .text((d) => d.name);


    });

    this.d3.select(self.frameElement).style('height', this.height + 'px');
  }

  // Interpolate the scales!
  private arcTween(d) {
    const xd = this.d3.interpolate(this.x.domain(), [d.x, d.x + d.dx]),
      yd = this.d3.interpolate(this.y.domain(), [d.y, 1]),
      yr = this.d3.interpolate(this.y.range(), [d.y ? 20 : 0, this.radius]);
    return (_d, i) => {
      return i
        ? (t) => this.arc(_d)
        : (t) => { this.x.domain(xd(t)); this.y.domain(yd(t)).range(yr(t)); return this.arc(_d); };
    };
  }

  private computeTextRotation(d) {
    return (this.x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
  }


}
