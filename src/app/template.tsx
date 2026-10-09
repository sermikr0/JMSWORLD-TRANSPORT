import type { ReactNode } from "react";

/** Re-mounts on every navigation, giving each page a short fade-and-rise entrance. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
