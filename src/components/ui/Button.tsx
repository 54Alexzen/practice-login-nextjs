import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "form" | "icon" | "menu";
  className?: string;
  component?: "button" | "link";
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  variant = "default",
  className = "",
  component = "button",
  href = "#",
}: ButtonProps) => {
  const variants = {
    default: "",
    form: "w-full bg-stone-800 text-white rounded-full py-2.5 mt-10 uppercase font-semibold md:text-sm sm:text-xs text-2xs flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
    icon: "",
    menu: "",
  }[variant];

  const styles = `${variants} ${className}`;

  return (
    <>
      {component === "button" ? (
        <button onClick={onClick} disabled={disabled} className={styles}>
          {children}
        </button>
      ) : (
        <Link href={href} className={styles}>
          {children}
        </Link>
      )}
    </>
  );
};
