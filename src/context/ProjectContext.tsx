import React, { createContext, useContext, useState } from 'react';

import type { Project } from '@/types/Project';

import { createUninitializedFunction } from '@/utils/createUninitializedFunction';

interface ProjectContext {
  selectedProject: Project['uuid'] | null;
  setSelectedProject: (project: Project['uuid']) => void;
  resetSelectedProject: () => void;

  selectedYear: number | null;
  setSelectedYear: (year: number) => void;
}

interface ProjectContextProviderProps {
  children: React.ReactNode;
}

export const initialContext = {
  selectedProject: null,
  setSelectedProject: () => createUninitializedFunction('setSelectedProject'),
  resetSelectedProject: () =>
    createUninitializedFunction('resetSelectedProject'),

  selectedYear: null,
  setSelectedYear: () => createUninitializedFunction('setSelectedYear'),
};

export const ProjectContext = createContext<ProjectContext>(initialContext);

export const useStore = () => {
  const [selectedProject, setSelectedProject] = useState<
    Project['uuid'] | null
  >(initialContext.selectedProject);

  const [selectedYear, setSelectedYear] = useState<number | null>(
    initialContext.selectedYear,
  );

  return {
    selectedProject,
    setSelectedProject,
    resetSelectedProject: () => setSelectedProject(null),

    selectedYear,
    setSelectedYear,
  };
};

export const ProjectContextProvider = ({
  children,
}: ProjectContextProviderProps) => {
  return (
    <ProjectContext.Provider value={useStore()}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);

export const useSelectedProject = () => useProjectContext()?.selectedProject;
export const useSetSelectedProject = () =>
  useProjectContext()?.setSelectedProject;
export const useResetSelectedProject = () =>
  useProjectContext()?.resetSelectedProject;

export const useSelectedYear = () => useProjectContext()?.selectedYear;
export const useSetSelectedYear = () => useProjectContext()?.setSelectedYear;
