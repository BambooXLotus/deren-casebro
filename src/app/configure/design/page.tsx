import { type NextPage } from "next";
import { notFound } from "next/navigation";

import { db } from "@/server/db";

import { Designer } from "./_components/designer";

type DesignPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const DesignPage: NextPage<DesignPageProps> = async ({ searchParams }) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const config = await db.configuration.findUnique({
    where: { id },
  });

  if (!config) {
    return notFound();
  }

  const { imgUrl, width, height } = config;

  return (
    <Designer
      configId={config.id}
      imgDims={{ width, height }}
      imgUrl={imgUrl}
    />
  );
};

export default DesignPage;
