import type { SelectProps } from '@radix-ui/react-select';

import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import type { Project } from '@/types/Project';

interface ProjectSelectProps
  extends Pick<SelectProps, 'value' | 'onValueChange'> {
  projects: Project[];
  placeholder?: string;
}

export function ProjectSelect({
  value,
  onValueChange,
  placeholder,
  projects,
}: ProjectSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {projects?.map((project: Project) => (
          <SelectItem key={project.uuid} value={project.uuid}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
