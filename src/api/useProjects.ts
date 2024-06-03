import { useQuery } from '@tanstack/react-query';

import { Project } from '@/types/Project';

const getProjects = async (): Promise<Project[]> => {
  const res = await fetch('/api/projects');
  return res.json();
};

const getEnergyData = async (uuid: string | null) => {
  const res = await fetch(`/api/energy?uuid=${uuid}`);
  return res.json();
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
    // placeholderData??
  });
};

export const useEnergyData = (uuid: string | null) => {
  return useQuery({
    queryKey: ['energy', uuid],
    queryFn: () => getEnergyData(uuid),
    enabled: !!uuid,
    // placeholderData??
    // initialData??
  });
};
