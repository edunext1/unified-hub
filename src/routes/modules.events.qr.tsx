import { createFileRoute } from "@tanstack/react-router";

import QRGeneratorPage from "@/event-manager/pages/QRGeneratorPage";

export const Route = createFileRoute("/modules/events/qr")({
  component: () => <QRGeneratorPage />,
});
