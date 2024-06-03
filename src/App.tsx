// import { useState, useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import logo from './logo.svg';
import { useProjects, useEnergyData } from '@/api/useProjects';
import type { Project } from '@/types/Project';

const App = () => {
  const { isPending, isError, data: projects, error } = useProjects();
  const { data: projectEnergyData } = useEnergyData(projects[0]?.uuid);

  const queryClient = new QueryClient();

  console.log('projects', projects);
  console.log('projectEnergyData', projectEnergyData);

  const projectItems = projects.map((project: Project) => (
    <Card className="dark" key={project.uuid}>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>
          <p>{project.uuid}</p>
          <p>{project.timezone}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>{/* ... */}</CardContent>
      <CardFooter className="w-max">
        <Button className="primary"> Click</Button>
      </CardFooter>
    </Card>
  ));

  return (
    <QueryClientProvider client={queryClient}>
      {isError && <p>Error: {error.message}</p>}
      {isPending && <p>Loading...</p>}

      <main className="dark grid justify-center gap-2 pt-3 text-center text-2xl">
        <img
          src={logo}
          className="motion-safe:animate-spin-slow h-28 w-28 justify-self-center"
          alt="logo"
        />
        <h1 className="text-3xl">Project list:</h1>
        <ul className="grid gap-2">{projectItems}</ul>
        <p>Data size: {projectEnergyData.length}</p>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
