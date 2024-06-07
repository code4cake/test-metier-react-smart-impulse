import type { ProjectEnergyDataByYear } from '@/types/Project';

export function aggregateChartDataByMonth(
  energyDataByYear: ProjectEnergyDataByYear[],
  selectedYear: number | null,
) {
  // [NOTE]: If you have time come and fix this, it should not be possible to have a null selectedYear
  // types are too loose and the function is not handling the case where selectedYear is null
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
