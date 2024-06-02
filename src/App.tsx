import { useState, useEffect } from 'react';
import './App.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import logo from './logo.svg';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((result) => {
        setProjects(result);

        // by default, load data from the first project
        if (result) {
          fetch(`/api/energy?uuid=${result[0].uuid}`)
            .then((res) => res.json())
            .then((result) => {
              setData(result);
            });
        }
      });
  }, []);

  console.log('projects', projects);
  console.log('data', data);

  const projectItems = projects.map((project: any) => (
    <Card className="dark" key={project.uuid}>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>
          <p>{project.uuid}</p>
          <p>{project.timezone}</p>
        </CardDescription>
        <Button className="primary"> Click</Button>
      </CardHeader>
      <CardContent>{/* ... */}</CardContent>
    </Card>
  ));

  return (
    <main className="dark grid justify-center gap-2 pt-2 text-center text-2xl">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="text-3xl">Project list:</h1>
      <ul>{projectItems}</ul>
      <p>Data size: {data.length}</p>
    </main>
  );
};

export default App;
