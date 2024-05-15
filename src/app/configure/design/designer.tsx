import NextImage from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

type DesignerProps = {
  configId: string;
  imgUrl: string;
  imgDims: { width: number; height: number };
};

export const Designer: React.FC<DesignerProps> = ({
  configId,
  imgUrl,
  imgDims,
}) => {
  return (
    <div className="relative mb-20 mt-20 grid grid-cols-1 pb-20 lg:grid-cols-3">
      <div className="relative col-span-2 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50">
          <AspectRatio
            ratio={896 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              fill
              alt="phone image"
              src="/phone-template.png"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
};
