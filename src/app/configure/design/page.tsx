import { type NextPage } from "next";
import { notFound } from "next/navigation";

import { db } from "@/server/db";

type DesignPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const DesignPage: NextPage<DesignPageProps> = async ({ searchParams }) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imgUrl, width, height } = configuration;

  return <div></div>;
};

export default DesignPage;
