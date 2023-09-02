import React from 'react';
import './App.css';
import Chart from 'react-apexcharts'


interface data {
  timestamps: number[];
  temperatures: number[];
}

function LiveChart({timestamps, temperatures}: data) {
  const options = {
    chart: {
      id: 'apexchart-example',
      width: '100px',
      height:'100px'
    },
    xaxis: {
      categories: timestamps,
      labels: {
        style: {
          fontSize: '20px',
          forecolor: '#fefefe'
        }
      },
      title: {
        text: 'Timestamps',
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '30px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#fefefe'
        },
      }
    },
    yaxis: {
      title: {
        text: 'Temperature °C',
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '30px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#fefefe'
        },
      },
      labels: {
        style: {
          fontSize: '20px',
          forecolor: '#fefefe'
        }
      }
    },
    colors: ['#e60000'],
  }
  
  const series = [
    {
      name: 'Temperature',
      data: temperatures
    }
  ]

   return (
    <Chart options={options} series={series} type="line"/>
)}

export default LiveChart;