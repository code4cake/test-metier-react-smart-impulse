import { useQuery } from '@tanstack/react-query';

const getProjects = async () => {
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
  });
};

export const useEnergyData = (uuid: string | null) => {
  return useQuery({
    queryKey: ['energy', uuid],
    queryFn: () => getEnergyData(uuid),
    enabled: !!uuid,
  });
};
