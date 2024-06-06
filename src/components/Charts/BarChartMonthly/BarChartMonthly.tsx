import { useState } from 'react';

import { Bar } from 'react-chartjs-2';
import {
  // type ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

import type {
  ProjectEnergyData,
  ProjectEnergyDataByYear,
} from '@/types/Project';
// import { createChartOptions } from '../utils/createChartOptions';

interface BarChartMonthlyProps {
  energyData: ProjectEnergyData[];
}

export interface EnergyDataPoint {
  year: number;
  month: number;
  values: number[];
}

export function BarChartMonthly({ energyData }: BarChartMonthlyProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // useEffect(() => {
  //   // Set the initial selected year to the first year available in the dataset
  //   if (energyData.length > 0) {
  //     const firstYear = Math.min(
  //       ...energyData.flatMap((dataset) => dataset.data.map((dp) => dp.year)),
  //     );
  //     setSelectedYear(firstYear);
  //   }
  // }, [energyData]);

  // const energyDataByYearAndMonth: EnergyDataByYearAndMonth = {};

  const energyDataByYear: ProjectEnergyDataByYear[] = [];

  energyData.forEach((dataset) => {
    const transformedDataPoints: EnergyDataPoint[] = [];

    dataset.data.forEach((dataPoint) => {
      const date = new Date(dataPoint.timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const existingDataPoint = transformedDataPoints.find(
        (dp) => dp.year === year && dp.month === month,
      );

      if (existingDataPoint) {
        existingDataPoint.values.push(dataPoint.value);
      } else {
        transformedDataPoints.push({
          year,
          month,
          values: [dataPoint.value],
        });
      }
    });

    energyDataByYear.push({
      label: dataset.label,
      type: dataset.type,
      color: dataset.color,
      data: transformedDataPoints,
    });

    return energyDataByYear;
  });

  console.log(energyDataByYear, 'energyDataByYear');

  // console.log(energyDataByYearAndMonth);

  // console.log(energyDataByYearAndMonth, 'energyDataByYearAndMonth');

  const years = [
    ...new Set(
      energyDataByYear.flatMap((data) => data.data.map((dp) => dp.year)),
    ),
  ];

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
  };

  // const options = createChartOptions();
  return (
    <div>
      <select
        value={selectedYear ?? ''}
        onChange={(e) => handleYearSelect(parseInt(e.target.value, 10))}
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <div style={{ minHeight: '500px' }}>
        <Bar
          data={getChartData(energyDataByYear, selectedYear)}
          options={{
            scales: {
              x: { stacked: true },
              y: {
                stacked: true,
                ticks: {
                  callback: (value) => `${value} MkWh`,
                },
              },
            },
            plugins: {
              legend: { position: 'top' },
              title: {
                display: true,
                text: 'Monthly Energy Consumption',
              },
            },
          }}
          // options={options}
        />
      </div>
    </div>
  );
}

function getChartData(
  energyDataByYear: ProjectEnergyDataByYear[],
  selectedYear: number | null,
) {
  // if (!selectedYear) return {};

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const selectedYearData = energyDataByYear.map((dataset) => {
    console.log(dataset, 'dataset');

    const dataForYear = dataset.data.find((dp) => dp.year === selectedYear);
    const values = dataForYear ? dataForYear.values : Array(12).fill(0);

    return {
      label: dataset.label,
      data: values,
      backgroundColor: dataset.color,
    };
  });

  return {
    labels: monthNames,
    datasets: selectedYearData,
  };
}
