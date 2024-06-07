import { SlEnergy } from 'react-icons/sl';
import { MdOutlineGasMeter } from 'react-icons/md';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { renderCorrectLabelColor } from './renderCorrectLabelColor';

interface EnergyCardProps {
  iconName: 'gas' | 'electricity';
  title: string;
  energyTotal: string;
  energyPercentageValue: string;
  energyPercentageLabel: string;
}
export function EnergyCard({
  title,
  iconName,
  energyTotal,
  energyPercentageValue,
  energyPercentageLabel,
}: EnergyCardProps) {
  return (
    <Card className="max-w-screen-sm md:max-w-fit">
      <CardHeader>
        <CardTitle className="flex content-between items-center">
          {iconName == 'electricity' ? (
            <SlEnergy color="#ffff00" fill="#ffff00" />
          ) : (
            <MdOutlineGasMeter className="text-blue-500" />
          )}
          <h1 className="text-xl">{title}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex place-content-around items-center">
        <p className="text-3xl">{energyTotal}</p>
        <CardDescription className="grid">
          <p className={renderCorrectLabelColor(energyPercentageValue)}>
            {energyPercentageValue}
          </p>
          <p className="">{energyPercentageLabel}</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
