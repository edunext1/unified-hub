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
  ChevronRight,
  Plug,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuth } from "@/lib/auth-store";
import { useBookmarks } from "@/lib/bookmarks";

const modules = [
  { title: "Event Manager", slug: "events", icon: CalendarRange },
  { title: "WhatsApp CRM", slug: "whatsapp", icon: MessageSquare },
  { title: "Website Builder", slug: "website", icon: Globe2 },
  { title: "Communication", slug: "communication", icon: Megaphone },
  { title: "Front Office", slug: "front-office", icon: Building2 },
  { title: "Reports & Analytics", slug: "reports", icon: BarChart3 },
  { title: "User Management", slug: "users", icon: Users },
];

const configurationSubmenu = [
  { title: "WhatsApp Integration", slug: "integrations-whatsapp" },
  { title: "Email Integration", slug: "integrations-email" },
  { title: "SMS Integration", slug: "integrations-sms" },
  { title: "Facebook Integration", slug: "integrations-facebook" },
  { title: "Other API Integration", slug: "integrations-other" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { user, login, logout } = useAuth();
  const { bookmarks } = useBookmarks();

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
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Dashboard">
                  <Link to="/" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4 shrink-0" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((m) => {
                const url = `/modules/${m.slug}`;
                return (
                  <SidebarMenuItem key={m.slug}>
                    <SidebarMenuButton asChild isActive={pathname === url} tooltip={m.title}>
                      <Link
                        to="/modules/$module"
                        params={{ module: m.slug }}
                        className="flex items-center gap-2"
                      >
                        <m.icon className="h-4 w-4 shrink-0" />
                        <span>{m.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              <Collapsible
                defaultOpen={pathname.startsWith("/modules/integrations-") || pathname === "/modules/configuration"}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Configuration"
                      isActive={pathname === "/modules/configuration"}
                    >
                      <Settings className="h-4 w-4 shrink-0" />
                      <span>Configuration</span>
                      <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/modules/configuration"}>
                          <Link to="/modules/$module" params={{ module: "configuration" }}>
                            <span>General</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="font-medium">
                          <Plug className="h-3.5 w-3.5" />
                          <span>Integrations</span>
                        </SidebarMenuSubButton>
                        <SidebarMenuSub>
                          {configurationSubmenu.map((s) => {
                            const url = `/modules/${s.slug}`;
                            return (
                              <SidebarMenuSubItem key={s.slug}>
                                <SidebarMenuSubButton asChild isActive={pathname === url}>
                                  <Link to="/modules/$module" params={{ module: s.slug }}>
                                    <span>{s.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {bookmarks.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Bookmarks</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {bookmarks.map((b) => {
                  const slug = b.url.replace("/modules/", "");
                  return (
                    <SidebarMenuItem key={b.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === b.url}
                        tooltip={b.title}
                      >
                        <Link
                          to="/modules/$module"
                          params={{ module: slug }}
                          className="flex items-center gap-2"
                        >
                          <Bookmark className="h-4 w-4 shrink-0" />
                          <span>{b.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
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
