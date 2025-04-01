import Image from 'next/image';
import Link from 'next/link'; // send to dashboard page if logged in after setting up the page 

export default function Navbar() {
  return (
    <nav className="w-full bg-white h-[5.5rem] px-4 flex drop-shadow-lg fixed top-0 left-0 right-0 z-10 border-b-2 border-[#615E5E66]">
      <div className="w-full h-full flex items-center">
        <div className="h-14 bg-primary rounded-2xl flex items-center justify-center px-4">
          <Image 
            src="/Title.svg"
            alt="Progress Logo"
            width={150}
            height={40}
            className="cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
}