"use client";

import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function ReactQueryProvider({
  children,
}: React.PropsWithChildren) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
