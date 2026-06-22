import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error JS module
import DashboardPage from "@/event-manager/pages/DashboardPage";

export const Route = createFileRoute("/modules/events/")({
  component: () => <DashboardPage />,
});
