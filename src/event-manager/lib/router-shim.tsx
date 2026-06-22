// Compatibility shim so files originally written for react-router-dom v6
// keep working under TanStack Router with minimal changes.
import { useMemo } from "react";
import {
  Link as TsLink,
  useNavigate as useTsNavigate,
  useRouterState,
} from "@tanstack/react-router";

export function useNavigate() {
  const navigate = useTsNavigate();
  return (to: string | number, opts?: { replace?: boolean }) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    navigate({ to, replace: opts?.replace });
  };
}

export function useLocation() {
  return useRouterState({ select: (r) => r.location });
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return useRouterState({
    select: (r) => {
      const matches = r.matches;
      const last = matches[matches.length - 1];
      return (last?.params ?? {}) as T;
    },
  });
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
  <TsLink to={to} {...rest}>
    {children}
  </TsLink>
);

export const Navigate = ({ to, replace }: { to: string; replace?: boolean }) => {
  const navigate = useTsNavigate();
  if (typeof window !== "undefined") {
    queueMicrotask(() => navigate({ to, replace }));
  }
  return null;
};
