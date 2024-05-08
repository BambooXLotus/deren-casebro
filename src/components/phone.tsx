import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type PhoneProps = {
  imgSrc: string;
  dark?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export const Phone: React.FC<PhoneProps> = ({
  imgSrc,
  className,
  dark = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none relative z-50 overflow-hidden",
        className,
      )}
      {...props}
    >
      <img
        className="pointer-events-none z-50 select-none"
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        alt="phone image"
      />
      <div className="absolute inset-0 -z-10">
        <img
          className="min-h-full min-w-full object-cover"
          src={imgSrc}
          alt="overlaying phone image"
        />
      </div>
    </div>
  );
};
