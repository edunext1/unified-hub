import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Side-effect CSS for the Event Manager subtree. Bootstrap is global —
// host shadcn pages may render slightly differently while these are loaded,
// but it keeps the ported pages visually identical to the source repo.
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/event-manager/index.css";
import "@/event-manager/App.css";
import "@/event-manager/styles/custom.css";

const EventDataProvider = lazy(() =>
  import("@/event-manager/context/EventDataContext").then((m) => ({
    default: m.EventDataProvider,
  })),
);
const QRProvider = lazy(() =>
  import("@/event-manager/context/QRContext").then((m) => ({ default: m.QRProvider })),
);
const FormProvider = lazy(() =>
  import("@/event-manager/context/FormContext").then((m) => ({ default: m.FormProvider })),
);
const HistoryProvider = lazy(() =>
  import("@/event-manager/context/HistoryContext").then((m) => ({
    default: m.HistoryProvider,
  })),
);
const AuthProvider = lazy(() =>
  import("@/event-manager/context/AuthContext").then((m) => ({ default: m.AuthProvider })),
);

export const Route = createFileRoute("/modules/events")({
  head: () => ({
    meta: [
      { title: "Event Manager — KnowVato Solutions" },
      { name: "description", content: "Event manager workspace." },
    ],
  }),
  component: EventManagerLayout,
});

function EventManagerLayout() {
  return (
    <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading event manager…</div>}>
      <AuthProvider>
        <EventDataProvider>
          <FormProvider>
            <QRProvider>
              <HistoryProvider>
                <div className="em-shell">
                  <Outlet />
                </div>
              </HistoryProvider>
            </QRProvider>
          </FormProvider>
        </EventDataProvider>
      </AuthProvider>
    </Suspense>
  );
}
