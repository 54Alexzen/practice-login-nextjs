interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-stone-800 text-white rounded-full py-2.5 mt-10 uppercase font-semibold md:text-sm sm:text-xs text-2xs flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
};
