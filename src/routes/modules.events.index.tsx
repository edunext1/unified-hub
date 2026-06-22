import { createFileRoute } from "@tanstack/react-router";

import DashboardPage from "@/event-manager/pages/DashboardPage";

export const Route = createFileRoute("/modules/events/")({
  component: () => <DashboardPage />,
});
