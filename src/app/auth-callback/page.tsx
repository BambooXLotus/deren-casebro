"use client";

import { useEffect, useState } from "react";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { getAuthStatus } from "./actions";

export default function AuthCallbackPage() {
  const router = useRouter();

  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(() => {
    const savedConfigId = localStorage.getItem("configId");
    if (savedConfigId) {
      setConfigId(savedConfigId);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    if (configId) {
      localStorage.removeItem("configId");
      router.push(`/configure/preview?id=${configId}`);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2Icon className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="text-xl font-semibold">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
}
