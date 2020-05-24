/**
 * Custom component to create line charts using pure d3.js
 * Date: 23 May 20
 * @Features:
 *  * Custom dropdown to select cell type
 *  * Line chart created with voltage on Y axis and time on X axis
 *  * Plotting of co-ordinates on the basis of Date and either of cell value (eg: c1/c2/.../c72)
 *  * Transition effect during re-draw of line
 *  * Range based colors as per the selected value from dropdown
 *
 * @Modules:
 *   d3: for SchemeSet2 | define range set for random colors respective to line
 *   d3Select: for elements selection
 *   d3Scale: for axes scale
 *   d3Shape: for line creation
 *   d3Array: for values and axes domain
 *   d3Axis: for axis positioning
 * @Input: 
 *   batteryData as input param from parent
 * @Output:
 *   linechart using d3
 * @Angular-Practises used:
 *   Modularized code as per the sepration of concerns (DESIGN principle)
 *   Caching of data (instead of getting directly using 'this')
 *   type defined for respective variables / methods
 */
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
  private selectedCellName: string = 'c1';
  private cellNames: any = [];
  private customLineColor: any;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit(): void {
    this.initSvg();
    this.initFilter();
    this.initAxis();
    this.drawAxis();
    this.initDrawingPath();
    this.drawLine();
  }

  private initSvg() {
    // created the base for drawing
    this.svg = d3Select.select('svg')
    .append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initFilter() {
    // values to populate in dropdown based on the given keys in data
    let filteredCellNames = Object.keys(this.batteryData[0]);
    // remove unwanted 'key': 'date' from array
    filteredCellNames.splice(1,1);
    // respective color ranges as per CellNames
    this.customLineColor = d3Scale.scaleOrdinal()
      .domain(this.cellNames)
      .range(d3.schemeSet2);
    // set the CellNames
    this.cellNames = filteredCellNames;
  }

  private initAxis() {
    let batteryData = this.batteryData;
    let cellName = this.selectedCellName;

    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);

    // X axis for date (time) and Y axis for voltage value
    this.x.domain(d3Array.extent(batteryData, (d:any) => new Date(d.date) ));
    this.y.domain(d3Array.extent(batteryData, (d:any) => d[cellName] ));
  }

  private drawAxis() {
    // draw X axis
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    
    // draw Y axis
    this.svg.append('g')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('fill', '#000') 
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Voltage (V)');
  }

  private initDrawingPath () {
    let batteryData = this.batteryData;
    // path is drawn and reused to replot line
    this.drawnPath = this.svg.append('path')
      .datum(batteryData)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke-width', 2);
  }

  private drawLine() {
    let cellName = this.selectedCellName;
    // create new line based on selected cellName (its values eg: c1/c2/..../c72)
    this.line = d3Shape.line()
      .defined( (d:any) => !isNaN(d[cellName]))
      .x( (d: any) => this.x(new Date(d.date)) )
      .y( (d: any) => this.y(d[cellName]) );

    // redraw line along with transition effect and new color
    this.drawnPath 
      .transition()
      .duration(1000)
      .attr('d', this.line)
      .attr('stroke', (d:any) => this.customLineColor(cellName));
  }

  // event handler for dropdown item click event
  changeCellType(e) {
    let cellName = e.target ? (e.target.text).trim() : '';
    // set the selected value
    this.selectedCellName = cellName;
    
    // redraw the line over given path
    this.drawLine();
  }

}
