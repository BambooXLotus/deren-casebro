import { notFound } from "next/navigation";

import { db } from "@/server/db";

import { DesignPreview } from "./_components/design-preview";

type PreviewPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

const PreviewPage: React.FC<PreviewPageProps> = async ({ searchParams }) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") return notFound();

  const config = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!config) return notFound();

  return <DesignPreview config={config} />;
};

export default PreviewPage;
