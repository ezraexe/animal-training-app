// test commit 
type HeaderProps = {
  title: string;
  onCreateNew?: () => void;
}

export default function Header({ title, onCreateNew }: HeaderProps) {
  const renderCreateButton = () => {
    if (!onCreateNew) return null;
    
    return (
      <button 
        onClick={onCreateNew}
        className="flex items-center gap-2 text-gray-600 hover:text-[#D21312] transition-colors duration-200 mr-16 cursor-pointer hover:underline"
      >
        <img
          src="/create-new.svg"
          alt="Create New Icon"
          className="w-5 h-5"
        />
        <span className="text-sm font-['Heebo'] font-medium text-[15px] leading-none tracking-[-2.5%] align-middle">Create New</span>
      </button>
    );
  };

  return (
    <header className="flex w-full justify-between items-center mb-0 border-b-2 border-gray-200 pb-3">
      <h1 className="text-gray-600 ml-8 text-xl font-semibold">{title}</h1>
      {renderCreateButton()}
    </header>
  );
}