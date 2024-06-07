import { useState } from 'react';

import { EnergyEducation } from '@/components/EnergyEducation/EnergyEducation';
import { BarChartDetailed } from '@/components/Charts/BarChartDetailed/BarChartDetailed';
import { BarChartMonthly } from '@/components/Charts/BarChartMonthly/BarChartMonthly';
import { EnergyCard } from '@/components/EnergyCard/EnergyCard';
import { useProjects, useEnergyData } from '@/api/useProjects';
import type { Project } from '@/types/Project';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { createTimestampValueSet } from '@/utils/createTimestampValueSet';
import { useIsMobile } from '@/hooks/useIsMobile';

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

  console.log('rawEnergyData', rawEnergyData);

  const projectEnergyData = rawEnergyData
    ? createTimestampValueSet(rawEnergyData)
    : [];

  // console.log('projects', projects);
  console.log('projectEnergyData', projectEnergyData);

  const isMobile = useIsMobile();
  console.log('isMobile', isMobile);

  return (
    <main className="grid gap-2 px-3 py-10 text-2xl lg:px-10">
      {projectsIsError && <p>Error: {error.message}</p>}

      {projectsArePending && <p>Loading...</p>}

      <h1 className="text-4xl">Your footprint</h1>

      <section className="grid gap-4 py-2">
        <Select
          value={selectedProject ?? ''}
          onValueChange={(value) => setSelectedProject(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={selectedProject ?? 'Choose a project'} />
          </SelectTrigger>
          <SelectContent>
            {projects?.map((project: Project) => (
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
              <BarChartDetailed energyData={projectEnergyData} />
            </Card>
          )}
        </article>

        <article className="">
          {projectEnergyData.length > 0 && (
            <Card className="p-4">
              <BarChartMonthly energyData={projectEnergyData} />
            </Card>
          )}
        </article>
      </section>

      <section className="grid gap-4 md:flex">
        <article className="grid gap-4 pb-6">
          <EnergyCard
            title="Energy consumption total"
            iconName="electricity"
            energyTotal="35 kWh"
            energyPercentageValue="+19% up"
            energyPercentageLabel="from last week"
          />
          <EnergyCard
            title="Gas comsumption total"
            iconName="gas"
            energyTotal="19 kWh"
            energyPercentageValue="-5% down"
            energyPercentageLabel="from last week"
          />
        </article>

        <article className="grid gap-3 border-t border-slate-200 pt-4">
          <h1 className="text-4xl leading-tight">Lower your emissions</h1>
          <ul className="grid gap-3">
            <EnergyEducation
              number="01"
              text="Invest in renewable energy source of electricity"
              onClick={() => console.log('Invest in renewable energy source')}
            />
            <EnergyEducation
              number="02"
              text="Increase the usage of renewable energy sources on this projects"
              onClick={() =>
                console.log('Increase the usage of renewable energy sources')
              }
            />
            <EnergyEducation
              number="03"
              text="Cut consumption of the on this hours of the day"
              onClick={() =>
                console.log('Cut consumption of the on this hours')
              }
            />
          </ul>
        </article>
      </section>
    </main>
  );
};

export default App;
