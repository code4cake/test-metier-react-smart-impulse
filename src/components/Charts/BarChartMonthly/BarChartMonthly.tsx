import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import type { ProjectEnergyData } from '@/types/Project';
import { YearSelect } from '@/components/Charts/componets/YearSelect';
import { createChartOptions } from '@/components/Charts/utils/createChartOptions';
import { aggregateChartDataByMonth } from './aggregateChartDataByMonth';
import { constructEnergyDataByYear } from './constructChartDataSetByYear';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarChartMonthlyProps {
  energyData: ProjectEnergyData[];
}

export function BarChartMonthly({ energyData }: BarChartMonthlyProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const energyDataByYear = constructEnergyDataByYear({ energyData });

  const years = [
    ...new Set(
      energyDataByYear.flatMap((data) => data.data.map((dp) => dp.year)),
    ),
  ];

  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
  };

  const options = createChartOptions();

  const chartDataByMonth = aggregateChartDataByMonth(
    energyDataByYear,
    selectedYear,
  );

  return (
    <>
      <YearSelect
        value={selectedYear ? selectedYear.toString() : ''}
        onValueChange={(value: string) => handleYearSelect(parseInt(value, 10))}
        years={years}
        placeholder={selectedYear ? selectedYear.toString() : 'Select Year'}
      />

      <div style={{ minHeight: '500px' }}>
        <Bar data={chartDataByMonth} options={options} />
      </div>
    </>
  );
}
