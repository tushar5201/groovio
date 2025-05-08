import { Home, MessageSquareMore, Search, Settings, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

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
    icon: Search,
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
    <Sidebar collapsible="icon" className="z-50 pt-8 bg-[#020916] flex justify-between">
      <SidebarHeader className="bg-[#020916] border-0 items-center">
        <Link href="/" className="hover:scale-120 transition-all duration-200">
          <Image
            src="/G_bold_rmbg.png"
            alt="Logo"
            width={200}
            height={200}
            className="p-1"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-[#020916] justify-center">
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
