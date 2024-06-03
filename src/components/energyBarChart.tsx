// import { Bar } from 'react-chartjs-2';
// import { ChartData, ChartOptions } from 'chart.js';

// import type { ProjectEnergyData, EnergyDataPoint } from '@/types/Project';

// interface EnergyBarChartProps {
//   energyData: ProjectEnergyData[];
// }

// export const EnergyBarChart = ({ energyData }: EnergyBarChartProps) => {
//   const uniqueTimestamps = Array.from(
//     new Set(
//       energyData.flatMap((dataset) => dataset.data.map((point) => point[0])),
//     ),
//   ).sort();

//   // Map timestamps to date labels
//   const labels = uniqueTimestamps.map((timestamp) =>
//     new Date(timestamp).toLocaleDateString(),
//   );

//   const datasets = energyData.map((dataset: any) => ({
//     label: dataset.label,
//     data: uniqueTimestamps.map((timestamp) => {
//       const dataPoint = dataset.data.find(
//         (point: any) => point[0] === timestamp,
//       );
//       return dataPoint ? dataPoint[1] : 0; // Return the value or 0 if no data point for the timestamp
//     }),
//     backgroundColor: dataset.color,
//   }));

//   const data: ChartData<'bar'> = {
//     labels,
//     datasets,
//   };

//   const options: ChartOptions<'bar'> = {
//     plugins: {
//       title: {
//         display: true,
//         text: 'Energy Data',
//       },
//       legend: {
//         display: true,
//         position: 'top',
//       },
//     },
//     responsive: true,
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true,
//       },
//     },
//   };

//   return <Bar data={data} options={options} />;
// };

// export default EnergyBarChart;

export const NOPE = 'NOPE';
