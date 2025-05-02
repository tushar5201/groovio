import { Calendar, Home, Inbox, Menu, MessageSquareMore, Search, Settings, Slack, User, UserRound } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Menu",
    url: "#",
    icon: Slack,
  },
  {
    title: "Profile",
    url: "#",
    icon: User,
  },
  {
    title: "Message",
    url: "#",
    icon: MessageSquareMore,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="z-50 pt-[15%]">
      <SidebarContent className="bg-[#020916] border-0 items-center">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, i) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-[#FF004D] hover:text-white  data-[active=true]:text-white" isActive={i === 0}>
                    <a href={item.url}>
                      <item.icon className="text-white data-[!active]:text-soft-grey hover:text-white sidebar-icon" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>

  )
}
