## Introduction

This application demonstrates the Angular 9+ based admin template having 1 module of line-chart in which pure d3 is used. 

It has been implemented with below aspects,
* Cloned the latest [core.ui](https://github.com/coreui/coreui-free-angular-admin-template) free Angular admin template with Bootstrap 4.
* Integrated the [d3.js version 4](https://github.com/d3/d3) library in the application, without any wrapper.
* Created an angular module that contains a linechart within the core.ui template
  * Provided the local json file(batteryData.json) via an Angular service that is available only within the module.
  * The methods within the service are created with proper typings in such a way that it can be subscribed to via observable only.
* Created the linechart component, and added it to above module and provided data to it
  * Integrate d3.js v4 to create the chart
  * Implemented "dumb" component that contains the linechart and renders based on data
  * Displayed the voltage (y-axis) vs. the time (x-axis) for one battery cell. 
  * There are 72 different battery cells value in each element of array witihin batteryData.json file, ploted co-ordinates basis of respective cell value c1/c2/..../c72
  * Added a dropdown menu for the linechart where you can select the cell that should be displayed and redrawn line on the basis of repective co-ordinates

## During execution 

![Implemented chart in dashboard screenshot](https://raw.githubusercontent.com/Mazzzy/angular-dashboard/master/screenshots/angular-template-d3-chart-dashboard.png)

## Application
#### New module made
* Main module
* LineChart
* DataService

### Available Scripts

In the project directory, you can run:

### `npm install`

Installs all the dependencies

### `ng serve`

Runs the app in the development mode.<br />
Open [http://localhost:4200](http://localhost:4200) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

