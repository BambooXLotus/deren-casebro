"use client";

import { useState, useTransition } from "react";

import {
  ImageIcon,
  Loader2Icon,
  MousePointerSquareDashedIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Dropzone, { type FileRejection } from "react-dropzone";

import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data?.serverData.configId;

      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  function handleDropRejected(rejectedFiles: FileRejection[]) {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    toast({
      title: `${file?.file.type} type is not supported.`,
      description: "Please choose a PNG, JPG, or JPEG image instead.",
      variant: "destructive",
    });
  }

  async function handleDropAccepted(acceptedFiles: File[]) {
    await startUpload(acceptedFiles, { configId: undefined });

    setIsDragOver(false);
  }

  return (
    <div
      className={cn(
        "relative my-16 flex h-full w-full flex-1 flex-col items-center justify-center rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl",
        {
          "bg-blue-900/10 ring-blue-900/25": isDragOver,
        },
      )}
    >
      <div className="relative flex w-full flex-1 flex-col items-center justify-center">
        <Dropzone
          onDropRejected={handleDropRejected}
          onDropAccepted={handleDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="flex h-full w-full flex-1 flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input type="text" {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashedIcon className="mb-2 h-6 w-6 text-zinc-500" />
              ) : isUploading || isPending ? (
                <Loader2Icon className="mb-2 h-6 w-6 animate-spin text-zinc-500" />
              ) : (
                <ImageIcon className="mb-2 h-6 w-6 text-zinc-500" />
              )}
              <div className="mb-2 flex flex-col justify-center text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading</p>
                    <Progress
                      className="mt-2 h-2 w-40 bg-gray-300"
                      value={uploadProgress}
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>
              {isPending ? null : (
                <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
