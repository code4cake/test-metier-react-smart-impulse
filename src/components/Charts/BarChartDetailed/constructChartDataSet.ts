import type { ProjectEnergyData } from '@/types/Project';

interface CreateDataSet {
  dataset: ProjectEnergyData;
  uniqueTimestamps: number[];
}

export function constructChartDataSet({
  dataset,
  uniqueTimestamps,
}: CreateDataSet) {
  return {
    label: dataset.label,
    data: uniqueTimestamps.map((timestamp) => {
      const dataPoint = dataset.data.find(
        (point) => point.timestamp === timestamp,
      );
      return dataPoint ? dataPoint.value : 0;
    }),
    backgroundColor: dataset.color,
  };
}
