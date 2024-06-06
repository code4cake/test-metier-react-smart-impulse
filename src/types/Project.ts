export interface Project {
  uuid: string;
  name: string;
  timezone: string;
}

export interface EnergyDataPoint {
  timestamp: number;
  value: number;
}

export interface ProjectEnergyData {
  projectUuid?: string;
  label: string;
  data: EnergyDataPoint[];
  type: string;
  color: string;
}

export interface ProjectEnergyDataByYear
  extends Omit<ProjectEnergyData, 'data'> {
  data: {
    year: number;
    month: number;
    values: number[];
  }[];
}
