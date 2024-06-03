import { useState } from 'react';

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { EnergyBarChart } from '@/components/energyBarChart';
// import logo from './logo.svg';
import { useProjects, useEnergyData } from '@/api/useProjects';
import type { ProjectEnergyData, Project } from '@/types/Project';

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

  // const projectItems = projects?.map((project: Project) => (
  //   <Card className="dark" key={project.uuid}>
  //     <CardHeader>
  //       <CardTitle>{project.name}</CardTitle>
  //       <CardDescription>
  //         <p>{project.uuid}</p>
  //         <p>{project.timezone}</p>
  //       </CardDescription>
  //     </CardHeader>
  //     <CardContent>{/* ... */}</CardContent>
  //     <CardFooter className="w-max">
  //       <Button className="primary"> Click</Button>
  //     </CardFooter>
  //   </Card>
  // ));

  return (
    <main className="dark grid pt-3 text-center text-2xl">
      {projectsIsError && <p>Error: {error.message}</p>}
      {projectsArePending && <p>Loading...</p>}
      {/* <img
        src={logo}
        className="motion-safe:animate-spin-slow h-28 w-28 justify-self-center"
        alt="logo"
      /> */}
      {/* <h1 className="text-3xl">Project list:</h1> */}
      {/* <ul className="grid gap-2">{projectItems}</ul> */}
      <h1>Energy Dashboard</h1>
      <div>
        <select
          onChange={(e) => setSelectedProject(e.target.value)}
          value={selectedProject ?? ''}
        >
          <option value="" disabled>
            Select a project
          </option>
          {projects?.map((project: any) => (
            <option key={project.uuid} value={project.uuid}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {energyDataLoading && <p>Loading energy data...</p>}
        {energyDataError && <p>Error loading energy data</p>}
        {projectEnergyData.length > 0 && (
          <EnergyBarChart energyData={projectEnergyData} />
        )}
      </div>
      {/* <p>Data size: {projectEnergyData?.length}</p> */}
    </main>
  );
};

export default App;
