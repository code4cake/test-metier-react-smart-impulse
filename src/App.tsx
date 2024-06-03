import { useState } from 'react';

import { EnergyBarChart } from '@/components/EnergyBarChart/EnergyBarChart';
import { useProjects, useEnergyData } from '@/api/useProjects';
import type { ProjectEnergyData, Project } from '@/types/Project';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const App = () => {
  const [selectedProject, setSelectedProject] = useState<
    Project['uuid'] | null
  >(null);

  const {
    isPending: projectsArePending,
    isError: projectsIsError,
    data: projects,
    error,
  } = useProjects();

  const projectUuid = projects && projects.length > 0 ? projects[0].uuid : null;
  const {
    data: rawEnergyData,
    isLoading: energyDataLoading,
    isError: energyDataError,
  } = useEnergyData(selectedProject ?? projectUuid);

  const convertRawData = (data: any[]): ProjectEnergyData[] => {
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

  const projectEnergyData = rawEnergyData ? convertRawData(rawEnergyData) : [];

  console.log('projects', projects);
  console.log('projectEnergyData', projectEnergyData);

  return (
    <main className="grid gap-2 px-3 py-10 text-2xl lg:px-10">
      {projectsIsError && <p>Error: {error.message}</p>}
      {projectsArePending && <p>Loading...</p>}

      <h1 className="text-3xl uppercase">Your Footprint</h1>

      <section className="grid gap-4 py-2">
        <Select
          value={selectedProject ?? ''}
          onValueChange={(value) => setSelectedProject(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Choose Project" />
          </SelectTrigger>
          <SelectContent>
            {projects?.map((project) => (
              <SelectItem key={project.uuid} value={project.uuid}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {energyDataLoading && <p>Loading energy data...</p>}
        {energyDataError && <p>Error loading energy data</p>}

        <article className="">
          {projectEnergyData.length > 0 && (
            <Card className="p-4">
              <EnergyBarChart energyData={projectEnergyData} />
            </Card>
          )}
        </article>
      </section>
    </main>
  );
};

export default App;
