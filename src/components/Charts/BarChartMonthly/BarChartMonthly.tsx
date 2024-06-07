import { useState } from 'react';

import { Bar } from 'react-chartjs-2';
import {
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
import { createChartOptions } from '../utils/createChartOptions';

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

  const years = [
    ...new Set(
      energyDataByYear.flatMap((data) => data.data.map((dp) => dp.year)),
    ),
  ];

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
  };

  const options = createChartOptions();

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
          options={options}
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

  console.log(energyDataByYear, 'energyDataByYear');

  const datasets: any[] = [];

  energyDataByYear.forEach((category) => {
    const { label, color, data } = category;

    const categoryValues: number[] = [];

    data.forEach((dataPoint) => {
      if (dataPoint.year === selectedYear) {
        const monthIndex = dataPoint.month - 1;

        categoryValues[monthIndex] = dataPoint.values.reduce(
          (acc, val) => acc + val,
          0,
        );
      }
    });

    datasets.push({
      label,
      backgroundColor: color,
      data: categoryValues,
    });
  });

  return {
    labels: monthNames,
    datasets,
  };
}
