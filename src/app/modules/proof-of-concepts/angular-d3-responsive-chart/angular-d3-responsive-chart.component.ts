import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-angular-d3-responsive-chart',
  templateUrl: './angular-d3-responsive-chart.component.html',
  styleUrls: ['./angular-d3-responsive-chart.component.scss']
})
export class AngularD3ResponsiveChartComponent implements OnInit, OnDestroy {

  private d3: any = null;

  private containerId = 'zoomable-sun-burst-target';

  // private width: string = '100%'; // 960;
  private height: string = '100%'; // 700;

  private radius = null;
  private aspect = 1;

  private x = null;
  private y = null;
  private color = null;
  private svg = null;
  private partition = null;
  private arc = null;

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   of(event).d
  //   this.draw(true);
  // }

  windowResizeSub: Subscription;

  constructor() {
    /**
     * Note
     * Converted all standard function calls into ()=> calls to preserve this context
     *
     * Reference Curtosy
     * https://brendansudol.com/writing/responsive-d3
     */

  }

  ngOnInit() {
    this.d3 = window['d3'];

    this.draw();

    this.windowResizeSub = fromEvent(window, 'resize')
      .pipe(throttleTime(500))
      .subscribe(e => {
        // console.log('resize event', e);
        // this.firstName += '*';  // change something to show it worked
        this.draw(true);
      });
  }

  ngOnDestroy() {
    // this.formCtrlSub.unsubscribe();
    this.windowResizeSub.unsubscribe();
  }

  private draw(redrawFlag?: boolean) {
    const chartContainerDim = this.getChartContainerDimenions();
    this.radius = Math.min(Math.max(chartContainerDim.width, 225), 600) / 2;

    this.x = this.d3.scale.linear()
      .range([0, 2 * Math.PI]);

    this.y = this.d3.scale.linear()
      .range([0, this.radius]);

    this.color = this.d3.scale.category20c();

    if (redrawFlag) {
      this.svg.remove();

      this.svg = this.d3.select(`#${this.containerId} svg`)
        .attr('width', chartContainerDim.width)
        .attr('height', chartContainerDim.height)
        .attr('viewBox', `0 0 ${chartContainerDim.width} ${chartContainerDim.width}`)
        .attr('preserveAspectRatio', 'xMinYMin')
        .append('g')
        .attr('transform', 'translate(' + chartContainerDim.width / 2 + ',' + (chartContainerDim.height / 2 + 10) + ')');

    } else {
      this.svg = this.d3.select(`#${this.containerId}`).append('svg')
        .attr('width', chartContainerDim.width)
        .attr('height', chartContainerDim.height)
        .attr('viewBox', `0 0 ${chartContainerDim.width} ${chartContainerDim.width}`)
        .attr('preserveAspectRatio', 'xMinYMin')
        .append('g')
        .attr('transform', 'translate(' + chartContainerDim.width / 2 + ',' + (chartContainerDim.height / 2 + 10) + ')');
    }



    this.partition = this.d3.layout.partition()
      .value((d) => d.size);

    this.arc = this.d3.svg.arc()
      .startAngle((d) => Math.max(0, Math.min(2 * Math.PI, this.x(d.x))))
      .endAngle((d) => Math.max(0, Math.min(2 * Math.PI, this.x(d.x + d.dx))))
      .innerRadius((d) => Math.max(0, this.y(d.y)))
      .outerRadius((d) => Math.max(0, this.y(d.y + d.dy)));

    this.constructZoomableSunBurstChart();

    // this.svg = this.d3.select(`#${this.containerId}`);
    // this.aspect = this.getChartContainerDimenions().width / this.getChartContainerDimenions().height;

    // // add viewBox and preserveAspectRatio properties,
    // // and call resize so that svg resizes on inital page load
    // this.svg.attr('viewBox', `0 0 ${this.getChartContainerDimenions().width} ${this.getChartContainerDimenions().height}`)
    //   .attr('perserveAspectRatio', 'xMinYMid');
    // // .call(() => this.resize);

    // // to register multiple listeners for same event type,
    // // you need to add namespace, i.e., 'click.foo'
    // // necessary if you call invoke this function for multiple svgs
    // // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    // // this.d3.select(window).on(`resize`, () => this.resize);
    // this.svg.attr('width', this.getChartContainerDimenions().width);
    // this.svg.attr('height', Math.round(this.getChartContainerDimenions().width / this.aspect));
  }

  // get width of container and resize svg to fit it
  // private resize() {
  //   const targetWidth = this.getChartContainerDimenions().width;
  //   this.svg.attr('width', targetWidth);
  //   this.svg.attr('height', Math.round(targetWidth / this.aspect));
  // }

  private getChartContainerDimenions() {
    const container: HTMLElement = document.getElementById('zoomable-sun-burst-target');
    const computedStyle: CSSStyleDeclaration = window.getComputedStyle(container, null);

    const _width = Math.min(Math.max(Number(computedStyle.width.replace('px', '')), 225), 600);
    return {
      height: _width,
      width: _width
    };
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
