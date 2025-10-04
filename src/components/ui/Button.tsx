import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "form" | "icon" | "menu";
  className?: string;
  href?: string;
  pathname?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  variant = "default",
  className = "",
  href = "#",
  pathname,
}: ButtonProps) => {
  const isActive = pathname === href;

  const variants = {
    default: "",
    form: "bg-stone-800 text-white rounded-full py-2.5 mt-10 uppercase font-semibold md:text-sm sm:text-xs text-2xs flex justify-center items-center gap-2",
    icon: "p-2 rounded-md border border-stone-200 hover:bg-stone-100 ",
    menu: `w-full gap-2 hover:bg-stone-100 px-2.5 py-1.5 rounded-md md:text-sm sm:text-xs text-2xs cursor-pointer ${
      isActive
        ? "bg-stone-100 border border-stone-200 font-semibold"
        : "text-stone-600"
    }`,
  }[variant];

  const baseStyles =
    "flex items-center cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50";

  const styles = `${baseStyles} ${variants} ${className}`;

  return (
    <>
      {href ? (
        <Link href={href} className={styles}>
          {children}
        </Link>
      ) : (
        <button onClick={onClick} disabled={disabled} className={styles}>
          {children}
        </button>
      )}
    </>
  );
};
