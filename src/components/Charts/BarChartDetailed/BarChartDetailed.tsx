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
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';

import type { ProjectEnergyData } from '@/types/Project';
import { createChartOptions } from '@/components/Charts/utils/createChartOptions';

interface BarChartDetailed {
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

export const BarChartDetailed = ({ energyData }: BarChartDetailed) => {
  const uniqueTimestamps = Array.from(
    new Set(
      energyData.flatMap((dataset) =>
        dataset.data.map((point) => point.timestamp),
      ),
    ),
  ).sort();

  const labels = uniqueTimestamps.map((timestamp) => {
    return format(new Date(timestamp), 'EEE, MMM d, yyy, HH:mm');
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

  const options = createChartOptions();

  return (
    <div style={{ minHeight: '500px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};
