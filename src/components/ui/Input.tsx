"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="flex flex-col gap-1 relative mt-5 w-full">
        <label
          htmlFor={props.id}
          className="sm:text-base text-sm font-semibold"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`border border-stone-300 bg-stone-100 px-4 py-2.5 w-full sm:text-sm text-xs rounded-full`}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-stone-700 transition-all duration-200 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-red-500 sm:text-xs tex2x absolute -bottom-4">
            *{error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
