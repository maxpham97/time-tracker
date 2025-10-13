import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: "default" | "outline";
}

export const ClassicButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                ref={ref}
                className={clsx(
                    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2",
                    variant === "default" && "bg-gray-800 text-white rounded-xl hover:bg-gray-700",
                    variant === "outline" && "border border-gray-300 hover:bg-gray-100",
                    className
                )}
                {...props}
            />
        );
    }
);
ClassicButton.displayName = "Button";
