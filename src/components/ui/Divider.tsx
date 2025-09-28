interface DividerProps {
  text: string;
  className?: string;
}

export const Divider = ({ text, className }: DividerProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-stone-500">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};
