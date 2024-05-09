import { CheckIcon, StarIcon } from "lucide-react";

type UserReviewProps = {
  rating: 1 | 2 | 3 | 4 | 5;
  children?: React.ReactNode;
  name: string;
  imgSrc: string;
};

export const UserReview: React.FC<UserReviewProps> = ({
  rating,
  name,
  imgSrc,
  children,
}) => {
  const stars = Array.from({ length: 5 }, (v, i) => {
    if (i < rating) {
      return (
        <StarIcon key={i} className="h-5 w-5 fill-cyan-500 text-cyan-600" />
      );
    } else {
      return <StarIcon key={i} className="h-5 w-5 text-cyan-600" />;
    }
  });

  return (
    <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
      <div className="mb-2 flex gap-0.5">{stars}</div>
      <div className="text-lg leading-8">{children}</div>
      <div className="mt-2 flex gap-4">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={imgSrc}
          alt="user"
        />
        <div className="flex flex-col">
          <p className="font-semibold">{name}</p>
          <div className="flex items-center gap-1.5 text-zinc-600">
            <CheckIcon className="h-4 w-4 stroke-[3px] text-green-600" />
            <p className="text-sm">Verified Purchase</p>
          </div>
        </div>
      </div>
    </div>
  );
};
