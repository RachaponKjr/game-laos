"use client";
import {
  Home,
  Settings,
  User,
  LayoutDashboard,
  LogOut,
  Gamepad,
  Book,
  Monitor,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Monitor, label: "Monitor", href: "/" },
  { icon: Gamepad, label: "Games", href: "/games" },
  { icon: Book, label: "Blogs", href: "/blogs" },
  { icon: User, label: "Users", href: "/users" },
  { icon: LayoutDashboard, label: "Page Management", href: "/page-management" },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      {/* Header - โลโก้ร้านหรือชื่อ Studio */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 font-bold text-xl px-2">
          <div className="bg-primary h-6 w-6 rounded-md" />
          <span className="group-data-[collapsible=icon]:hidden">Noctura</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild tooltip={item.label}>
                  <a href={item.href} className="flex items-center gap-3">
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - ส่วนของ User / Logout */}
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
