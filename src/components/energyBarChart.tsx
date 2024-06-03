import { Bar } from 'react-chartjs-2';
import {
  type ChartData,
  type ChartOptions,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import type { ProjectEnergyData } from '@/types/Project';

interface EnergyBarChartProps {
  energyData: ProjectEnergyData[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const EnergyBarChart = ({ energyData }: EnergyBarChartProps) => {
  const uniqueTimestamps = Array.from(
    new Set(
      energyData.flatMap((dataset) =>
        dataset.data.map((point) => point.timestamp),
      ),
    ),
  ).sort();

  // Map timestamps to date labels
  const labels = uniqueTimestamps.map((timestamp) => {
    console.log('timestamp', timestamp);
    return new Date(timestamp).toLocaleDateString();
  });

  const datasets = energyData.map((dataset) => ({
    label: dataset.label,
    data: uniqueTimestamps.map((timestamp) => {
      const dataPoint = dataset.data.find(
        (point) => point.timestamp === timestamp,
      );
      return dataPoint ? dataPoint.value : 0;
    }),
    backgroundColor: dataset.color,
  }));

  const data: ChartData<'bar'> = {
    labels,
    datasets,
  };

  const options: ChartOptions<'bar'> = {
    plugins: {
      title: {
        display: true,
        text: 'Energy Data',
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default EnergyBarChart;
