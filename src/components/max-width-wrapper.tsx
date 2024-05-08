import { cn } from "@/lib/utils";

type MaxWidthWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};
