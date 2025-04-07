interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="w-full bg-white rounded-[13px] border-2 border-border flex items-center justify-between h-[100px] px-8">
      <span className="text-2xl text-[#343C6A] font-[600]">{title}</span>
      <section className="flex items-center space-x-4">
        <div className="Ledger flex justify-center items-center space-x-2 border border-border rounded-xl pl-4 overflow-hidden">
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 h-[10px] w-[10px] rounded-full animate-pulse"></div>
            <span className="text-gray-700 text-[14px] font-medium">
              Last Ledger
            </span>
          </div>

          <div className="bg-[#E9EFFF] px-3 py-2 h-full">
            <span className="text-[13px] text-primary">23456549</span>
          </div>
        </div>

        <div className="w-10 h-10 rounded-full bg-primary/26 flex justify-center items-center">
          <p className="text-primary text-base">D</p>
        </div>
      </section>
    </header>
  );
};

export default Header;
