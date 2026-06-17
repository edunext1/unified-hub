import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarRange,
  MessageSquare,
  Globe2,
  Users,
  Megaphone,
  Building2,
  BarChart3,
  Settings,
  LogIn,
  LogOut,
  LayoutDashboard,
  Bookmark,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-store";
import { useBookmarks } from "@/lib/bookmarks";

const modules = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Event Manager", url: "/modules/events", icon: CalendarRange },
  { title: "WhatsApp CRM", url: "/modules/whatsapp", icon: MessageSquare },
  { title: "Website Builder", url: "/modules/website", icon: Globe2 },
  { title: "User Management", url: "/modules/users", icon: Users },
  { title: "Communication", url: "/modules/communication", icon: Megaphone },
  { title: "Front Office", url: "/modules/front-office", icon: Building2 },
  { title: "Reports & Analytics", url: "/modules/reports", icon: BarChart3 },
  { title: "Settings", url: "/modules/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { user, login, logout } = useAuth();
  const { bookmarks } = useBookmarks();

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
            O
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">OrbitOps</span>
              <span className="text-xs text-muted-foreground">Workspace</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((m) => (
                <SidebarMenuItem key={m.url}>
                  <SidebarMenuButton asChild isActive={isActive(m.url)} tooltip={m.title}>
                    <Link to={m.url} className="flex items-center gap-2">
                      <m.icon className="h-4 w-4 shrink-0" />
                      <span>{m.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {bookmarks.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Bookmarks</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {bookmarks.map((b) => (
                  <SidebarMenuItem key={b.url}>
                    <SidebarMenuButton asChild isActive={pathname === b.url} tooltip={b.title}>
                      <Link to={b.url} className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4 shrink-0" />
                        <span>{b.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          {user ? (
            <>
              <SidebarMenuItem>
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {!collapsed && (
                    <div className="flex flex-col leading-tight overflow-hidden">
                      <span className="text-sm font-medium truncate">{user.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                    </div>
                  )}
                </div>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} tooltip="Log out">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => login({ name: "Admin", email: "admin@orbitops.app" })}
                tooltip="Log in"
              >
                <LogIn className="h-4 w-4" />
                <span>Log in</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
