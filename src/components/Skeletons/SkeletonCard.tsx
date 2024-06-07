import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  text?: string;
}
export function SkeletonCard({ text }: SkeletonCardProps) {
  return (
    <>
      <p>{text}</p>
      <div className="flex flex-col space-y-3">
        <Skeleton className="min-h-[500px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[450px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
      </div>
    </>
  );
}
