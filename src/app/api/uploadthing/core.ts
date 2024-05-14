import sharp from "sharp";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

import { db } from "@/server/db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();

      const imgMetadata = await sharp(buffer).metadata();
      const { width, height } = imgMetadata;

      if (!configId) {
        const config = await db.configuration.create({
          data: {
            imgUrl: file.url,
            height: height ?? 500,
            width: width ?? 500,
          },
        });

        return { configId: config.id };
      } else {
        const updatedConfig = await db.configuration.update({
          where: {
            id: configId,
          },
          data: {
            croppedImageUrl: file.url,
          },
        });

        return { configId: updatedConfig.id };
      }

      return { configId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
