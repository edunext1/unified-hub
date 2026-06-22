import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error JS module
import QRGeneratorPage from "@/event-manager/pages/QRGeneratorPage";

export const Route = createFileRoute("/modules/events/qr")({
  component: () => <QRGeneratorPage />,
});
