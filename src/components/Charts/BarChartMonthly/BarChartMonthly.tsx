import { Bar } from 'react-chartjs-2';
import {
  type ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ProjectEnergyData } from '@/types/Project';
import { createChartOptions } from '@/components/Charts/utils/createChartOptions';

interface BarChartMonthlyProps {
  energyData: ProjectEnergyData[];
}

type AggregatedDataByMonth = Record<number, Record<number, number>>;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

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

export const BarChartMonthly = ({ energyData }: BarChartMonthlyProps) => {
  console.log('energyData monthly ', energyData);

  const aggregatedDataByMonth: AggregatedDataByMonth = {};
  for (const dataset of energyData) {
    for (const dataPoint of dataset.data) {
      const date = new Date(dataPoint.timestamp);

      // console.log('date timestamo', date);

      const month = date.getMonth(); // Get the month index (0-11)
      const year = date.getFullYear();

      if (!aggregatedDataByMonth[year]) {
        aggregatedDataByMonth[year] = {};
      }
      if (!aggregatedDataByMonth[year][month]) {
        aggregatedDataByMonth[year][month] = 0;
      }

      aggregatedDataByMonth[year][month] += dataPoint.value;
    }
    // console.log('aggregatedDataByMonth', aggregatedDataByMonth);
  }

  const labels = monthNames;

  const datasets = energyData.map((dataset) => {
    console.log('dataset', dataset);

    const data = [];

    const currentYear = new Date().getFullYear();
    console.log('currentYear', currentYear);

    for (let month = 0; month < 12; month++) {
      const yearData = aggregatedDataByMonth[currentYear];
      console.log('yearData', yearData);

      const value = yearData ? yearData[month] || 0 : 0; // If no data for the month, set value to 0
      data.push(value);
    }

    // console.log('data', data);
    return {
      label: dataset.label,
      data,
      backgroundColor: dataset.color,
    };
  });

  const data: ChartData<'bar'> = {
    labels,
    datasets,
  };

  const options = createChartOptions();

  return (
    <div style={{ minHeight: '500px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
