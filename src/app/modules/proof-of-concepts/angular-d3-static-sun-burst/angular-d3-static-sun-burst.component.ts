import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-d3-static-sun-burst',
  templateUrl: './angular-d3-static-sun-burst.component.html',
  styleUrls: ['./angular-d3-static-sun-burst.component.scss']
})
export class AngularD3StaticSunBurstComponent implements OnInit {

  private d3: any = null;

  // Dimensions of sunburst.
  readonly width = 750;
  readonly height = 600;
  readonly radius = Math.min(this.width, this.height) / 2;

  // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
  readonly b = {
    w: 75, h: 30, s: 3, t: 10
  };

  // Mapping of step names to colors.
  readonly colors = {
    'home': '#5687d1',
    'product': '#7b615c',
    'search': '#de783b',
    'account': '#6ab975',
    'other': '#a173d1',
    'end': '#bbbbbb'
  };

  // Total size of all segments; we set this later, after loading the data.
  private totalSize = 0;

  private vis = null;

  private partition = null;

  private arc = null;

  constructor() { }

  ngOnInit() {
    this.d3 = window['d3'];

    this.vis = this.d3.select('#chart').append('svg:svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('svg:g')
      .attr('id', 'container')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');

    this.partition = this.d3.layout.partition()
      .size([2 * Math.PI, this.radius * this.radius])
      .value((d) => d.size);

    this.arc = this.d3.svg.arc()
      .startAngle((d) => d.x)
      .endAngle((d) => d.x + d.dx)
      .innerRadius((d) => Math.sqrt(d.y))
      .outerRadius((d) => Math.sqrt(d.y + d.dy));

    this.constructSunBurstChart();
  }

  private constructSunBurstChart() {
    // Use d3.text and d3.csv.parseRows so that we do not need to have a header
    // row, and can receive the csv as an array of arrays.

    const text = `search-search-search-product-product-product,7311\n\
      search-search-search-product-product-search,2807\n\
      search-search-search-product-search-account,145\n\
      search-search-search-product-search-end,501\n\
      search-search-search-product-search-home,57\n\
      search-search-search-product-search-other,16\n\
      search-search-search-product-search-product,4559\n\
      search-search-search-product-search-search,2030\n\
      search-search-search-search-account-account,300\n\
      search-search-search-search-account-end,49\n\
      search-search-search-search-account-home,16\n\
      search-search-search-search-account-other,28\n\
      search-search-search-search-account-product,194\n\
      search-search-search-search-account-search,51\n\
      search-search-search-search-end,1991\n\
      search-search-search-search-home-account,14\n\
      search-search-search-search-home-end,44\n\
      search-search-search-search-home-home,33\n\
      search-search-search-search-home-other,5\n\
      search-search-search-search-home-product,80\n\
      search-search-search-search-home-search,112\n\
      search-search-search-search-other-account,1\n\
      search-search-search-search-other-end,9\n\
      search-search-search-search-other-home,2\n\
      search-search-search-search-other-other,26\n\
      search-search-search-search-other-product,34\n\
      search-search-search-search-other-search,9\n\
      search-search-search-search-product-account,295\n\
      search-search-search-search-product-end,2112\n\
      search-search-search-search-product-home,289\n\
      search-search-search-search-product-other,33\n\
      search-search-search-search-product-product,3856\n\
      search-search-search-search-product-search,2203\n\
      search-search-search-search-search-account,241\n\
      search-search-search-search-search-end,756\n\
      search-search-search-search-search-home,111\n\
      search-search-search-search-search-other,43\n\
      search-search-search-search-search-product,3125\n\
      search-search-search-search-search-search,3600\n`;

    const csv = this.d3.csv.parseRows(text);
    const json = this.buildHierarchy(csv);
    this.createVisualization(json);

  }


  // Main function to draw and set up the visualization, once we have the data.
  private createVisualization(json) {

    // Basic setup of page elements.
    this.initializeBreadcrumbTrail();
    this.drawLegend();
    this.d3.select('#togglelegend').on('click', this.toggleLegend);

    // Bounding circle underneath the sunburst, to make it easier to detect
    // when the mouse leaves the parent g.
    this.vis.append('svg:circle')
      .attr('r', this.radius)
      .style('opacity', 0);

    // For efficiency, filter nodes to keep only those large enough to see.
    const nodes = this.partition.nodes(json)
      .filter((d) =>
        (d.dx > 0.005) // 0.005 radians = 0.29 degrees
      );

    const path = this.vis.data([json]).selectAll('path')
      .data(nodes)
      .enter().append('svg:path')
      .attr('display', (d) => d.depth ? null : 'none')
      .attr('d', this.arc)
      .attr('fill-rule', 'evenodd')
      .style('fill', (d) => this.colors[d.name])
      .style('opacity', 1)
      .on('mouseover', this.mouseover);

    // Add the mouseleave handler to the bounding circle.
    this.d3.select('#container').on('mouseleave', this.mouseleave);

    // Get total size of the tree = value of root node from partition.
    this.totalSize = path.node().__data__.value;
  }

  // Fade all but the current sequence, and show it in the breadcrumb trail.
  private mouseover(d) {

    const percentage = Number((100 * d.value / this.totalSize).toPrecision(3));
    let percentageString = percentage + '%';
    if (percentage < 0.1) {
      percentageString = '< 0.1%';
    }

    this.d3.select('#percentage')
      .text(percentageString);

    this.d3.select('#explanation')
      .style('visibility', '');

    const sequenceArray = this.getAncestors(d);
    this.updateBreadcrumbs(sequenceArray, percentageString);

    // Fade all the segments.
    this.d3.selectAll('path')
      .style('opacity', 0.3);

    // Then highlight only those that are an ancestor of the current segment.
    this.vis.selectAll('path')
      .filter((node) =>
        sequenceArray.indexOf(node) >= 0
      )
      .style('opacity', 1);
  }

  // Restore everything to full opacity when moving off the visualization.
  private mouseleave(d) {

    // Hide the breadcrumb trail
    this.d3.select('#trail')
      .style('visibility', 'hidden');

    // Deactivate all segments during transition.
    this.d3.selectAll('path').on('mouseover', null);

    // Transition each segment to full opacity and then reactivate it.
    this.d3.selectAll('path')
      .transition()
      .duration(1000)
      .style('opacity', 1)
      .each('end', () =>
        this.d3.select(this).on('mouseover', this.mouseover)
      );

    this.d3.select('#explanation')
      .transition()
      .duration(1000)
      .style('visibility', 'hidden');
  }

  // Given a node in a partition layout, return an array of all of its ancestor
  // nodes, highest first, but excluding the root.
  private getAncestors(node) {
    const path = [];
    let current = node;
    while (current.parent) {
      path.unshift(current);
      current = current.parent;
    }
    return path;
  }

  private initializeBreadcrumbTrail() {
    // Add the svg area.
    const trail = this.d3.select('#sequence').append('svg:svg')
      .attr('width', this.width)
      .attr('height', 50)
      .attr('id', 'trail');
    // Add the label at the end, for the percentage.
    trail.append('svg:text')
      .attr('id', 'endlabel')
      .style('fill', '#000');
  }

  // Generate a string that describes the points of a breadcrumb polygon.
  private breadcrumbPoints(d, i) {
    const points = [];
    points.push('0,0');
    points.push(this.b.w + ',0');
    points.push(this.b.w + this.b.t + ',' + (this.b.h / 2));
    points.push(this.b.w + ',' + this.b.h);
    points.push('0,' + this.b.h);
    if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
      points.push(this.b.t + ',' + (this.b.h / 2));
    }
    return points.join(' ');
  }

  // Update the breadcrumb trail to show the current sequence and percentage.
  private updateBreadcrumbs(nodeArray, percentageString) {

    // Data join; key function combines name and depth (= position in sequence).
    const g = this.d3.select('#trail')
      .selectAll('g')
      .data(nodeArray, (d) => d.name + d.depth);

    // Add breadcrumb and label for entering nodes.
    const entering = g.enter().append('svg:g');

    entering.append('svg:polygon')
      .attr('points', this.breadcrumbPoints)
      .style('fill', (d) => this.colors[d.name]);

    entering.append('svg:text')
      .attr('x', (this.b.w + this.b.t) / 2)
      .attr('y', this.b.h / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text((d) => d.name);

    // Set position for entering and updating nodes.
    g.attr('transform', (d, i) =>
      'translate(' + i * (this.b.w + this.b.s) + ', 0)');

    // Remove exiting nodes.
    g.exit().remove();

    // Now move and update the percentage at the end.
    this.d3.select('#trail').select('#endlabel')
      .attr('x', (nodeArray.length + 0.5) * (this.b.w + this.b.s))
      .attr('y', this.b.h / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(percentageString);

    // Make the breadcrumb trail visible, if it's hidden.
    this.d3.select('#trail')
      .style('visibility', '');

  }

  private drawLegend() {

    // Dimensions of legend item: width, height, spacing, radius of rounded rect.
    const li = {
      w: 75, h: 30, s: 3, r: 3
    };

    const legend = this.d3.select('#legend').append('svg:svg')
      .attr('width', li.w)
      .attr('height', this.d3.keys(this.colors).length * (li.h + li.s));

    const g = legend.selectAll('g')
      .data(this.d3.entries(this.colors))
      .enter().append('svg:g')
      .attr('transform', (d, i) =>
        'translate(0,' + i * (li.h + li.s) + ')'
      );

    g.append('svg:rect')
      .attr('rx', li.r)
      .attr('ry', li.r)
      .attr('width', li.w)
      .attr('height', li.h)
      .style('fill', (d) => d['value']);

    g.append('svg:text')
      .attr('x', li.w / 2)
      .attr('y', li.h / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text((d) => d['key']);
  }

  private toggleLegend() {
    const legend = this.d3.select('#legend');
    if (legend.style('visibility') === 'hidden') {
      legend.style('visibility', '');
    } else {
      legend.style('visibility', 'hidden');
    }
  }

  // Take a 2-column CSV and transform it into a hierarchical structure suitable
  // for a partition layout. The first column is a sequence of step names, from
  // root to leaf, separated by hyphens. The second column is a count of how
  // often that sequence occurred.
  private buildHierarchy(csv) {
    const root = { 'name': 'root', 'children': [] };
    for (let i = 0; i < csv.length; i++) {
      const sequence = csv[i][0];
      const size = +csv[i][1];
      if (isNaN(size)) { // e.g. if this is a header row
        continue;
      }
      const parts = sequence.split('-');
      let currentNode = root;
      for (let j = 0; j < parts.length; j++) {
        const children = currentNode['children'];
        const nodeName = parts[j];
        let childNode;
        if (j + 1 < parts.length) {
          // Not yet at the end of the sequence; move down the tree.
          let foundChild = false;
          for (let k = 0; k < children.length; k++) {
            if (children[k]['name'] === nodeName) {
              childNode = children[k];
              foundChild = true;
              break;
            }
          }
          // If we don't already have a child node for this branch, create it.
          if (!foundChild) {
            childNode = { 'name': nodeName, 'children': [] };
            children.push(childNode);
          }
          currentNode = childNode;
        } else {
          // Reached the end of the sequence; create a leaf node.
          childNode = { 'name': nodeName, 'size': size };
          children.push(childNode);
        }
      }
    }
    return root;
  }



}
