import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error JS module
import RegistrantsPage from "@/event-manager/pages/RegistrantsPage";

export const Route = createFileRoute("/modules/events/registrants")({
  component: () => <RegistrantsPage />,
});
