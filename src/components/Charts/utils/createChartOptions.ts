import type { ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';

export function createChartOptions(): ChartOptions<'bar'> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Legend',
        font: {
          size: 20,
          family: 'Fira Sans Extra Condensed',
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Fira Sans Extra Condensed',
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            family: 'Fira Sans Extra Condensed',
          },
        },
        ticks: {
          font: {
            size: 14,
            family: 'Fira Sans Extra Condensed',
          },
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Energy (kWh/MkWh)',
          font: {
            size: 14,
            family: 'Fira Sans Extra Condensed',
          },
        },
        ticks: {
          font: {
            size: 14,
            family: 'Fira Sans Extra Condensed',
          },
          callback: function (value) {
            if (Number(value) >= 1000000) {
              return (Number(value) / 1000000).toFixed(1) + ' MWh';
            } else if (Number(value) >= 1000) {
              return (Number(value) / 1000).toFixed(1) + ' kWh';
            }
            return value + ' W';
          },
        },
      },
    },
  };
}
