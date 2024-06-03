export interface Project {
  uuid: string;
  name: string;
  timezone: string;
}

interface EnergyDataPoint {
  timestamp: string;
  value: number;
}

export interface ProjectEnergyData {
  projectUuid?: string;
  label: string;
  data: EnergyDataPoint[];
  type: string;
  color: string;
}
