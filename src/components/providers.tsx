"use client";

import { type ReactNode } from 'react';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

type ProvidersProps = {
  children: ReactNode;
};

const client = new QueryClient();

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default Providers;
