"use client";

import { useEffect, useState } from "react";

import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Confetti from "react-dom-confetti";

import { Phone } from "@/components/phone";
import { Button } from "@/components/ui/button";
import { COLORS, MODELS } from "@/lib/option-validator";
import { BASE_PRICE, PRODUCT_PRICES } from "@/lib/products";
import { cn, formatPrice } from "@/lib/utils";
import { type Configuration } from "@prisma/client";

type DesignPreviewProps = {
  config: Configuration;
};

export const DesignPreview: React.FC<DesignPreviewProps> = ({ config }) => {
  const [suprise, setSuprise] = useState(false);
  useEffect(() => setSuprise(true), []);

  const { color, model, finish, material } = config;
  const tw = COLORS.find((c) => c.value === color)?.tw;
  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model,
  )!;

  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 flex select-none justify-center overflow-hidden"
        aria-hidden
      >
        <Confetti active={suprise} config={{ elementCount: 200, spread: 90 }} />
      </div>
      <div className="mt-20 flex flex-col items-center text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:grid md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
          <Phone className={cn(`bg-${tw}`)} imgSrc={config.croppedImageUrl!} />
        </div>
        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <CheckIcon className="h-4 w-4 text-tiffany-blue-500" />
            In stock and ready to ship!
          </div>
        </div>

        <div className="text-base sm:col-span-12 md:col-span-9">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 list-inside list-disc text-zinc-700">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 list-inside list-disc text-zinc-700">
                <li>High-quality, durable material</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>
          <div className="mt-8">
            <div className="bg-tiffany-blue-100 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="mt-2 flex items-center justify-between py-1">
                  <p className="text-gray-600">Base price</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>

                {finish === "textured" ? (
                  <div className="mt-2 flex items-center justify-between py-1">
                    <p className="text-gray-600">Textured finish</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}

                {material === "polycarbonate" ? (
                  <div className="mt-2 flex items-center justify-between py-1">
                    <p className="text-gray-600">Polycarbonate material</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-gray-200" />
                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900">Order total</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end pb-12">
              <Button className="px-4 sm:px-6 lg:px-8">
                Check out <ArrowRightIcon className="ml-1.5 inline h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
