import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonSelectProps {
  text?: string;
}
export function SkeletonSelect({ text }: SkeletonSelectProps) {
  return (
    <>
      <p>{text}</p>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[50px] w-[180px] rounded-xl" />
      </div>
    </>
  );
}
