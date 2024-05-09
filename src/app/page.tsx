import { Check, Star } from "lucide-react";

import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Phone } from "@/components/phone";
import { Reviews } from "@/components/reviews";
import { UserReview } from "@/components/user-review";

export default function Home() {
  return (
    <div className="grainy-light bg-slate-50">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-24 xl:gap-x-8 xl:pt-32">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="absolute -top-20 left-0 hidden w-28 lg:block">
                {/* i forgot this div right here in the video, it's purely visual gradient and looks nice */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-50 via-slate-50/50" />
                <img src="/corgi-1.png" className="w-full" />
              </div>
              <h1 className="relative w-fit text-balance pt-16 text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="bg-cyan-500 px-2 text-white">Custom</span>{" "}
                Phone Case
              </h1>
              <p className="max-w-prose text-balance pt-8 text-center text-lg md:text-wrap lg:pr-10 lg:text-left">
                Capture your favorite memories with your own,{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                CaseCorgi allows you to protect your memories, not just your
                phone case.
              </p>

              <ul className="flex flex-col items-center space-y-2 pt-8 text-left font-medium sm:items-start">
                <div className="space-y-2">
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    High-quality, durable material
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />5 year
                    print guarantee
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>

              <div className="flex flex-col items-center gap-5 pt-12 sm:flex-row sm:items-start">
                <div className="flex -space-x-4">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-1.png"
                    alt="user image"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-2.png"
                    alt="user image"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-3.png"
                    alt="user image"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-4.jpg"
                    alt="user image"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
                    src="/users/user-5.jpg"
                    alt="user image"
                  />
                </div>
                <div className="flex flex-col items-center justify-between sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 fill-cyan-500 text-cyan-600" />
                    <Star className="h-4 w-4 fill-cyan-500 text-cyan-600" />
                    <Star className="h-4 w-4 fill-cyan-500 text-cyan-600" />
                    <Star className="h-4 w-4 fill-cyan-500 text-cyan-600" />
                    <Star className="h-4 w-4 fill-cyan-500 text-cyan-600" />
                  </div>
                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span col-span-full mt-32 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0 lg:col-span-1 lg:mx-0 lg:mt-20">
            <div className="relative md:max-w-xl">
              <img
                src="/your-image.png"
                className="absolute -top-20 left-56 hidden w-40 select-none sm:block lg:hidden lg:w-52 xl:block"
              />
              <img
                src="/line.png"
                className="absolute -bottom-6 -left-6 w-20 select-none"
              />
              <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* value proposition section */}
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="gl:flex-row flex flex-col items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.underline className="pointer-events-none absolute inset-x-0 -bottom-6 hidden text-cyan-500 sm:block" />
              </span>{" "}
              say
            </h2>
            <img src="/corgi-2.png" className="order-0 w-24 lg:order-2" />
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <UserReview rating={5} name="Jonathan" imgSrc="/users/user-1.png">
              <p>
                &quot;The case feels durable and I even got a compliment on the
                design. Had the case for two and a half months now and{" "}
                <span className="bg-slate-800 p-0.5 text-white">
                  the image is super clear
                </span>
                , on the case I had before, the image started fading into
                yellow-ish color after a couple weeks. Love it.&quot;
              </p>
            </UserReview>
            <UserReview rating={4} name="Emilio" imgSrc="/users/user-4.jpg">
              <p>
                &quot;I usually keep my phone together with my keys in my pocket
                and that led to some pretty heavy scratch marks on all of my
                last phone cases. This one, besides a barely noticeable scratch
                on the corner,{" "}
                <span className="bg-slate-800 p-0.5 text-white">
                  looks brand new after about half a year
                </span>
                . I dig it.&quot;
              </p>
            </UserReview>
          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="px-6 pb-12 lg:px-8">
            <div className="mx-w-2xl mx-auto sm:text-center">
              <h2 className="order-1 mt-2 text-balance text-center text-5xl font-bold !leading-tight tracking-tight text-gray-900 md:text-6xl">
                Upload your photo and get{" "}
                <span className="relative bg-cyan-600 px-2 text-white">
                  your own case{" "}
                </span>{" "}
                now
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex grid-cols-2 flex-col items-center gap-40 md:grid">
              <img
                className="absolute left-1/2 top-[25rem] z-10 -translate-x-1/2 -translate-y-1/2 rotate-90 md:top-1/2 md:rotate-0"
                src="/arrow.png"
                alt="arrow"
              />
              <div></div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
