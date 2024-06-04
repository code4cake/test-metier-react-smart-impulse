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
      className="flex max-w-screen-sm content-center items-center border border-slate-300 pl-2"
    >
      <p className="border-r border-slate-300 pr-2 text-5xl leading-snug text-primary">
        {number}
      </p>
      <p className="pl-2 text-base">{text}</p>
      <div className="flex items-center justify-center self-stretch border-l border-slate-300 px-1">
        <IoIosArrowRoundForward className="" size="32" />
      </div>
    </li>
  );
}
