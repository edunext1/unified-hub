import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error JS module
import ScanPage from "@/event-manager/pages/ScanPage";

export const Route = createFileRoute("/modules/events/scan")({
  component: () => <ScanPage />,
});
