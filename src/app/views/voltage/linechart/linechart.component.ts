import { Component, OnInit, Input } from '@angular/core';

import * as d3 from 'd3';
import * as d3Select from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-linechart2',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {
  @Input() batteryData: any[];
  
  // line chart draw related items
  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private drawnPath: any;

  // filter related items
  private selectedCellName: string = "c1";
  private cellNames: any = ["c1"];
  private customLineColor: any;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit(): void {
    this.initSvg();
    this.initSelect();
    // by default initialization
    this.initAxis();
    this.drawAxis();
    this.initDrawingPath();
    this.drawLine();
  }

  private initSvg() {
    this.svg = d3Select.select('svg')
    .append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initSelect() {
    let filteredCellNames = Object.keys(this.batteryData[0]);
    this.customLineColor = d3Scale.scaleOrdinal()
      .domain(this.cellNames)
      .range(d3.schemeSet2);
    
    this.cellNames = filteredCellNames;
  }

  private initAxis() {
    let batteryData = this.batteryData;
    let cellName = this.selectedCellName;

    //this.x = d3Scale.scaleUtc().range([0, this.width]);
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(batteryData, (d:any) => new Date(d.date) ));
    this.y.domain(d3Array.extent(batteryData, (d:any) => d[cellName] ));
  }

  private drawAxis() {
    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Voltage (V)');
  }

  private initDrawingPath () {
    let batteryData = this.batteryData;
    this.drawnPath = this.svg.append('path')
      .datum(batteryData)
      .attr('class', 'line')
      .attr("fill", "none")
      .attr("stroke-width", 2)
    ;
  }

  private drawLine() {
    let cellName = this.selectedCellName;
    
    this.line = d3Shape.line()
      .defined( (d:any) => !isNaN(d[cellName]))
      .x( (d: any) => this.x(new Date(d.date)) )
      .y( (d: any) => this.y(d[cellName]) );

    this.drawnPath 
      .transition()
      .duration(1000)
      .attr('d', this.line)
      .attr("stroke", (d:any) => this.customLineColor(cellName));
  }

  changeCellType(e) {
    let cellName = e.target ? (e.target.text).trim() : '';
    this.selectedCellName = cellName;
    this.drawLine();
  }

}
