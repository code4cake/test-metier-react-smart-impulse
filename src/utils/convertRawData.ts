import type { ProjectEnergyData } from '@/types/Project';

interface RawEnergyData {
  label: ProjectEnergyData['label'];
  type: ProjectEnergyData['type'];
  color: ProjectEnergyData['color'];
  data: [number, number][]; //  converted to [timestamp, value] for the ProjectEnergyData type
}

export const convertRawData = (data: RawEnergyData[]): ProjectEnergyData[] => {
  return data.map((item) => ({
    label: item.label,
    type: item.type,
    color: item.color,
    data: item.data.map(([timestamp, value]: [number, number]) => ({
      timestamp,
      value,
    })),
  }));
};
