import * as Label from "@radix-ui/react-label";
import clsx from "clsx";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const ClassicInput = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col space-y-1.5">
        {label && <Label.Root className="text-sm font-medium text-gray-700">{label}</Label.Root>}
        <input
            ref={ref}
            className={clsx(
                "border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                error ? "border-red-500" : "border-gray-300",
                className
            )}
            {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
));
ClassicInput.displayName = "ClassicInput";
