// Compatibility shim so files originally written for react-router-dom v6
// keep working under TanStack Router with minimal changes.
import { useMemo } from "react";
import {
  Link as TsLink,
  useNavigate as useTsNavigate,
  useRouterState,
} from "@tanstack/react-router";

// Legacy Event Manager routes were rooted at "/". In this app they live
// under "/modules/events". Remap any path the ported pages try to navigate to.
const EM_PREFIX = "/modules/events";
const EM_KNOWN = [
  "/events",
  "/dashboard",
  "/setup",
  "/attendees",
  "/attendance",
  "/scan",
  "/qr",
  "/bulk-qr",
  "/registrants",
  "/pass-designer",
  "/pass-templates",
  "/form-designer",
  "/form-templates",
  "/activity",
  "/logs",
  "/import-qr",
];

export function remapEmPath(to: string): string {
  if (!to || typeof to !== "string") return to;
  if (to.startsWith(EM_PREFIX) || to.startsWith("/modules/")) return to;
  if (to.startsWith("/events")) {
    // The ported CreateEventPage IS the events list/create screen and lives
    // at "/modules/events/create". Everything under "/events" maps there
    // (preserving any query string like ?mode=new).
    const rest = to.slice("/events".length);
    const qIdx = rest.indexOf("?");
    const query = qIdx >= 0 ? rest.slice(qIdx) : "";
    return "/modules/events/create" + query;
  }
  for (const p of EM_KNOWN) {
    if (to === p || to.startsWith(p + "/") || to.startsWith(p + "?")) {
      return EM_PREFIX + to;
    }
  }
  return to;
}

export function useNavigate() {
  const navigate = useTsNavigate();
  return (to: string | number, opts?: { replace?: boolean }) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    navigate({ to: remapEmPath(to), replace: opts?.replace });
  };
}

export function useLocation() {
  return useRouterState({ select: (r) => r.location });
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return useRouterState({
    select: (r: any) => {
      const matches = r.matches;
      const last = matches[matches.length - 1];
      return (last?.params ?? {}) as T;
    },
  }) as T;
}

export function useSearchParams(): [URLSearchParams, (next: URLSearchParams | Record<string, string>) => void] {
  const searchStr = useRouterState({ select: (r) => r.location.searchStr ?? "" });
  const navigate = useTsNavigate();
  const params = useMemo(() => new URLSearchParams(searchStr || ""), [searchStr]);
  const setParams = (next: URLSearchParams | Record<string, string>) => {
    const sp = next instanceof URLSearchParams ? next : new URLSearchParams(next);
    const obj: Record<string, string> = {};
    sp.forEach((v, k) => (obj[k] = v));
    navigate({ search: obj as never });
  };
  return [params, setParams];
}

export const Link = ({ to, children, ...rest }: any) => (
  <TsLink to={typeof to === "string" ? remapEmPath(to) : to} {...rest}>
    {children}
  </TsLink>
);

export const Navigate = ({ to, replace }: { to: string; replace?: boolean }) => {
  const navigate = useTsNavigate();
  if (typeof window !== "undefined") {
    queueMicrotask(() => navigate({ to: remapEmPath(to), replace }));
  }
  return null;
};
