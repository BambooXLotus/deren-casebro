"use client";

import NextImage from "next/image";
import { Rnd } from "react-rnd";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { Handle } from "./handle";

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
          <div className="absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0  bottom-px left-[3px] right-[3px] rounded-[32px]",
              `bg-blue-950`,
            )}
          />
        </div>
        <Rnd
          className="absolute z-20 border-[3px] border-primary"
          default={{
            x: 150,
            y: 205,
            height: imgDims.height / 4,
            width: imgDims.width / 4,
          }}
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <Handle />,
            bottomLeft: <Handle />,
            topRight: <Handle />,
            topLeft: <Handle />,
          }}
        >
          <div className="relative h-full w-full">
            <NextImage
              className="pointer-events-none"
              src={imgUrl}
              fill
              alt="your image"
            />
          </div>
        </Rnd>
      </div>
      <div className="flex h-[37.5rem] flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            className="from white pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t"
            aria-hidden
          />
          <div className="px-8 pb-12 pt-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Customize your case
            </h2>
            <div className="my-6 h-px w-full bg-zinc-200" />
            <div className="relative flex h-full flex-col justify-between pt-4">
              colors
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
