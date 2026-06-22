import { createFileRoute } from "@tanstack/react-router";

import ImportQRPage from "@/event-manager/pages/ImportQRPage";

export const Route = createFileRoute("/modules/events/bulk-qr")({
  component: () => <ImportQRPage />,
});
