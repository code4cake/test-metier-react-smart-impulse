import { useState } from 'react';

import { EnergyEducation } from '@/components/EnergyEducation/EnergyEducation';
import { BarChartDetailed } from '@/components/Charts/BarChartDetailed/BarChartDetailed';
import { BarChartMonthly } from '@/components/Charts/BarChartMonthly/BarChartMonthly';
import { EnergyCard } from '@/components/EnergyCard/EnergyCard';
import { ProjectSelect } from '@/components/Projects/ProjectSelect';
import { SkeletonCard } from '@/components/Skeletons/SkeletonCard';
import { useProjects, useEnergyData } from '@/api/useProjects';
import type { Project } from '@/types/Project';
import { Card } from '@/components/ui/card';
import { createTimestampValueSet } from '@/utils/createTimestampValueSet';

import { SkeletonSelect } from './components/Skeletons/SkeletonSelect';

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

  const projectEnergyData = rawEnergyData
    ? createTimestampValueSet(rawEnergyData)
    : [];

  return (
    <main className="grid gap-2 px-3 py-10 text-2xl lg:px-10">
      {projectsIsError && <p>Error: {error.message}</p>}

      <h1 className="text-4xl">Your Footprint</h1>

      <section className="grid gap-4 py-2">
        {projectsArePending ? (
          <SkeletonSelect />
        ) : (
          <ProjectSelect
            value={selectedProject ?? ''}
            onValueChange={(value) => setSelectedProject(value)}
            projects={projects}
            placeholder={selectedProject ?? 'Choose a project'}
          />
        )}

        {energyDataLoading && <SkeletonCard text="Loading energy graph" />}

        {energyDataError && <p>Error loading energy data</p>}

        <article>
          {projectEnergyData.length > 0 && (
            <Card className="p-4">
              <BarChartDetailed energyData={projectEnergyData} />
            </Card>
          )}
        </article>

        <article>
          {projectEnergyData.length > 0 && (
            <Card className="p-4">
              <BarChartMonthly energyData={projectEnergyData} />
            </Card>
          )}
        </article>
      </section>

      <section className="grid gap-4 md:flex lg:flex lg:justify-between">
        <article className="grid gap-2">
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

        <article className="grid gap-2 border-t border-slate-200 pt-4">
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
