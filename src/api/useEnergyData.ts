// import { useQuery } from '@tanstack/react-query';

// const getProjects = async () => {
//   const res = await fetch('/api/projects');
//   return res.json();
// };

// const getEnergyData = async (uuid: string) => {
//   const res = await fetch(`/api/energy?uuid=${uuid}`);
//   return res.json();
// };

// export const useGetProjects = () => {
//   return useQuery({
//     queryKey: ['projects'],
//     queryFn: getProjects,
//     // placeholderData??
//   });
// };

// export const useGetEnergyData = (uuid: string) => {
//   return useQuery({
//     queryKey: ['energy', uuid],
//     queryFn: () => getEnergyData(uuid),
//     enabled: !!uuid,
//     // placeholderData??
//     // initialData??
//   });
// };

export const NOPE = 'NOPE';
