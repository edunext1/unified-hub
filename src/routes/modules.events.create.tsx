import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error JS module
import CreateEventPage from "@/event-manager/pages/CreateEventPage";

export const Route = createFileRoute("/modules/events/create")({
  component: () => <CreateEventPage />,
});
