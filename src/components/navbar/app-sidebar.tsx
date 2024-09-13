"use client";
import { NavMain } from "@/components/navbar/nav-main";
import { NavUser } from "@/components/navbar/nav-user";
import { TeamSwitcher } from "@/components/navbar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
import { linksMain } from "@/data/navbar/links-main";
import { teams } from "@/data/navbar/teams";
import { useSession } from "next-auth/react";

export function AppSidebar() {
  const { data: session } = useSession();
  const user = {
    name: session?.user?.name || "NA",
    email: session?.user?.email || "NA",
    image: session?.user?.image || "",
    id: session?.user?.id || "",
  };
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>GitHub Issues</SidebarLabel>
          <NavMain items={linksMain} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
