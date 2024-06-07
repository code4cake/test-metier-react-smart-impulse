import type {
  ProjectEnergyData,
  ProjectEnergyDataByYear,
} from '@/types/Project';

interface ConstructEnergyDataByYear {
  energyData: ProjectEnergyData[];
}

interface EnergyDataPoint {
  year: number;
  month: number;
  values: number[];
}

export function constructEnergyDataByYear({
  energyData,
}: ConstructEnergyDataByYear) {
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
  });

  return energyDataByYear;
}
