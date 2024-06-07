import { IoIosArrowRoundForward } from 'react-icons/io';

interface EnergyEducationProps {
  number: string;
  text: string;
  onClick: () => void;
}

export function EnergyEducation({
  number,
  text,
  onClick,
}: EnergyEducationProps) {
  return (
    <li
      onClick={onClick}
      className="lg:max-md flex max-w-screen-sm content-center items-center border border-slate-300 pl-2 md:max-w-fit"
    >
      <p className="border-r border-slate-300 pr-2 text-5xl leading-snug text-primary">
        {number}
      </p>
      <p className="pl-2 text-base md:px-2">{text}</p>
      <div className="flex items-center justify-center self-stretch border-l border-slate-300 px-1">
        <IoIosArrowRoundForward className="" size="32" />
      </div>
    </li>
  );
}
