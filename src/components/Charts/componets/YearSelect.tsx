import type { SelectProps } from '@radix-ui/react-select';

import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

interface ProjectSelectProps
  extends Pick<SelectProps, 'value' | 'onValueChange'> {
  years: number[];
  placeholder?: string;
}

export function YearSelect({
  value,
  onValueChange,
  placeholder,
  years,
}: ProjectSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {years?.map((year: number) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
