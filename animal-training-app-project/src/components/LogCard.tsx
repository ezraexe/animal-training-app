"use client";

import Image from "next/image";

interface TrainingLog {
  _id: string;
  user: {
    _id?: string;
    fullName: string;
  };
  animal: {
    _id?: string;
    name: string;
    breed: string;
    owner?: {
      _id: string;
      fullName: string;
    };
    hoursTrained?: number;
    profilePicture?: string;
  };
  title: string;
  date: string | Date;
  description: string;
  hours: number;
}

export default function LogCard({ log }: { log: TrainingLog }) {
  const date = new Date(log.date);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  return (
    <div className="w-[1165px] h-[162px] top-[836px] left-[-2715px] bg-white overflow-hidden flex">
      {/* Date section */}
      <div className="w-[139px] h-[162px] bg-[rgba(7,10,82,0.85)] text-white flex flex-col items-center justify-center rounded-tl-[20px] rounded-bl-[20px]">
        <div className="font-['Oswald'] font-medium text-[48px] leading-[100%]">
          {day}
        </div>
        <div className="font-['Oswald'] font-normal text-[25px] leading-[100%] mt-[10px]">
          {month} - {year}
        </div>
      </div>

      {/* Content section */}
      <div className="flex flex-1 border-t border-r border-b border-black rounded-tr-lg rounded-br-lg">
        <div className="flex-1 pl-[20px]">
          <div className="flex items-center h-[44px] mt-[7px]">
            <div className="font-['Heebo'] font-bold text-[30px] leading-[100%] mr-[5px]">
              {log.title}
            </div>
            <div className="font-['Heebo'] font-medium text-[20px] leading-[100%] text-[#999999]">
              {` • ${log.hours} hours`}
            </div>
          </div>
          <div className="font-['Heebo'] font-medium text-[20px] leading-[100%] text-[#999999] h-[29px] mt-[4px]">
            {`${log.user.fullName} - ${log.animal.breed} - ${log.animal.name}`}
          </div>
          <div className="font-['Heebo'] font-normal text-[20px] leading-[100%] h-[26px] mt-[20px]">
            {log.description}
          </div>
        </div>
        <div className="w-[100px] flex justify-center items-center">
          <button
            className="w-[80px] h-[80px] cursor-pointer"
            onClick={() => {
              console.log("it's working");
            }}
          >
            <Image
              src="/edit-button.svg"
              alt="Edit Button"
              width={80}
              height={80}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
