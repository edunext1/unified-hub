import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarPlus,
  Users,
  ScanLine,
  QrCode,
  Layers,
  ArrowLeft,
} from "lucide-react";

export const Route = createFileRoute("/modules/events")({
  head: () => ({
    meta: [
      { title: "Event Manager — KnowVato Solutions" },
      { name: "description", content: "Event Manager dashboard with quick actions." },
    ],
  }),
  component: EventManagerDashboard,
});

const tiles = [
  {
    title: "Create Event",
    description: "Set up a new event with details, schedule and venue.",
    icon: CalendarPlus,
    to: "/modules/$module",
    params: { module: "events-create" },
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Registrants",
    description: "View and manage attendees who have registered.",
    icon: Users,
    to: "/modules/$module",
    params: { module: "events-registrants" },
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Scan Pass",
    description: "Scan QR passes at the venue for entry verification.",
    icon: ScanLine,
    to: "/modules/$module",
    params: { module: "events-scan" },
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "Generate QR Code",
    description: "Generate individual QR codes for passes or links.",
    icon: QrCode,
    to: "/modules/$module",
    params: { module: "events-qr" },
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Bulk QR Code",
    description: "Generate QR codes in bulk from a CSV or list.",
    icon: Layers,
    to: "/modules/$module",
    params: { module: "events-bulk-qr" },
    color: "bg-orange-500/10 text-orange-600",
  },
] as const;

function EventManagerDashboard() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div>
        <Link to="/" className="text-xs text-muted-foreground hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Back to dashboard
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight mt-1">Event Manager</h1>
        <p className="text-sm text-muted-foreground">
          Quick actions to create events, manage attendees and handle passes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.title} to={t.to} params={t.params} className="block group">
            <Card className="h-full transition-all group-hover:shadow-md group-hover:border-primary/40">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className={`h-11 w-11 rounded-lg flex items-center justify-center ${t.color}`}>
                  <t.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
