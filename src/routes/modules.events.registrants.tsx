import { createFileRoute } from "@tanstack/react-router";

import RegistrantsPage from "@/event-manager/pages/RegistrantsPage";

export const Route = createFileRoute("/modules/events/registrants")({
  component: () => <RegistrantsPage />,
});
