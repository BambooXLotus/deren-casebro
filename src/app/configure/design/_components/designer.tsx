"use client";

import { useState } from "react";

import { ArrowRightIcon, CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import NextImage from "next/image";
import { options } from "prettier-plugin-tailwindcss";
import { Rnd } from "react-rnd";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/lib/option-validator";
import { BASE_PRICE } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import {
  Description,
  Label as RadioLabel,
  Radio,
  RadioGroup,
} from "@headlessui/react";

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
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

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
              `bg-blue-${options.color.tw}`,
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
            <div className="mt-3 h-px w-full bg-zinc-200" />
            <div className="relative flex h-full flex-col justify-between pt-4">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  value={options.color}
                  onChange={(value) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: value,
                    }));
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <Radio
                        className={({ checked }) =>
                          cn(
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent p-0.5 focus:outline-none focus:ring-0 active:outline-none active:ring-0",
                            { [`border-${color.tw}`]: checked },
                          )
                        }
                        key={color.label}
                        value={color}
                      >
                        <span
                          className={cn(
                            "h-8 w-8 rounded-full border-black border-opacity-10",
                            `bg-${color.tw}`,
                          )}
                        />
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
                <div className="relative flex w-full flex-col gap-3">
                  <Label>Model</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="w-full justify-between"
                        variant="outline"
                        role="combobox"
                      >
                        {options.model.label}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem
                          key={model.label}
                          className={cn(
                            "flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                model.label === options.model.label,
                            },
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }));
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              model.label === options.model.label
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) => {
                        setOptions((prev) => ({
                          ...prev,
                          [name]: val,
                        }));
                      }}
                    >
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((option) => (
                          <Radio
                            className={({ checked }) =>
                              cn(
                                "relative block cursor-pointer rounded-lg border-2 border-zinc-200 bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none focus:ring-0 sm:flex sm:justify-between",
                                {
                                  "border-primary": checked,
                                },
                              )
                            }
                            key={option.value}
                            value={option}
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <RadioLabel
                                  className="font-medium text-gray-900"
                                  as="span"
                                >
                                  {option.label}
                                </RadioLabel>
                                {option.description ? (
                                  <Description
                                    className="text-gray-500"
                                    as="span"
                                  >
                                    <span className="block sm:inline">
                                      {option.description}
                                    </span>
                                  </Description>
                                ) : null}
                              </span>
                            </span>

                            <Description
                              className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                              as="span"
                            >
                              <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                              </span>
                            </Description>
                          </Radio>
                        ))}
                      </div>
                    </RadioGroup>
                  ),
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="h-16 w-full bg-white px-8">
          <div className="h-px w-full bg-zinc-200" />
          <div className="flex h-full w-full items-center justify-end">
            <div className="flex w-full items-center gap-6">
              <p className="whitespace-nowrap font-medium">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100,
                )}
              </p>
              <Button className="w-full" size="sm">
                Continue
                <ArrowRightIcon className="ml-1.5 inline h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
