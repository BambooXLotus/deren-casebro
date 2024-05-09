"use client";

import { useState, useTransition } from "react";

import {
  ImageIcon,
  Loader2Icon,
  MousePointerSquareDashedIcon,
} from "lucide-react";
import Dropzone from "react-dropzone";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(45);
  const [isPending, starTransition] = useTransition();
  const isUploading = true;

  function handleDropRejected() {}

  function handleDropAccepted() {}

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
                  <div></div>
                ) : isDragOver ? (
                  <span></span>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
}
