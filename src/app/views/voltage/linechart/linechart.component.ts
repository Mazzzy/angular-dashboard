import { Component, OnInit, Input } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scheme from 'd3';
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
  @Input() batteryData: array[];
  
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
  private cellNames: any = ["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10"];
  private customLineColor: any;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit(): void {
    this.initSvg();
    this.initSelect();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }

  private initSvg() {
    this.svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initSelect() {
    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(this.cellNames)
      .enter()
    	.append('option')
      .text((d: any) => d )         // text showed in the menu
      .attr("value", (d:any) => d); // corresponding value returned by the button
    
    this.customLineColor = d3Scale.scaleOrdinal()
      .domain(this.cellNames)
      .range(d3Scheme.schemeSet2);
  }

  private initAxis() {
    let batteryData = this.batteryData;
    //this.x = d3Scale.scaleUtc().range([0, this.width]);
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(batteryData, (d:any) => new Date(d.date) ));
    this.y.domain(d3Array.extent(batteryData, (d:any) => d.c1 ));
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

  private drawLine() {
    let cellName = this.cellNames[0];
    let data = this.batteryData;

    this.line = d3Shape.line()
      .defined( (d:any) => !isNaN(d[cellName]))
      .x( (d: any) => this.x(new Date(d.date)) )
      .y( (d: any) => this.y(d[cellName]) );

    this.drawnPath = this.svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .attr('d', this.line)
      .attr("fill", "none")
      .attr("stroke", (d:any) => this.customLineColor(cellName))
      .attr("stroke-width", 4);
  }

  private redrawLine(cellName) {
    this.line 
      .defined( (d: any) => !isNaN(d[cellName]))
      .x( (d: any) => this.x(new Date(d.date)) )
      .y( (d: any) => this.y(d[cellName]) );

    this.drawnPath 
        //.datum(data)
        .transition()
        .duration(1000)
        .attr('d', this.line)
        .attr("stroke", (d:any) => this.customLineColor(cellName))
  }

  changeCellType(e) {
    let cellName = e.target ? e.target.value : '';
    this.redrawLine(cellName);
  }

}
