import { createFileRoute } from "@tanstack/react-router";

import ScanPage from "@/event-manager/pages/ScanPage";

export const Route = createFileRoute("/modules/events/scan")({
  component: () => <ScanPage />,
});
