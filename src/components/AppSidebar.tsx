"use client"

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
import { usePathname } from "next/navigation"  // ✅ Import hook

// Menu items.
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Search", url: "/search", icon: Search },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Message", url: "/message", icon: MessageSquareMore },
  { title: "Settings", url: "/settings", icon: Settings },
]

export default function AppSidebar() {
  const pathname = usePathname()  // ✅ Get current route

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
              {items.map((item) => {
                const isActive = pathname === item.url // ✅ check active

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`hover:bg-[#FF004D] hover:text-white data-[active=true]:text-white`}
                    >
                      <Link href={item.url}>
                        <item.icon
                          className={`text-white ${isActive ? "text-white" : "text-soft-grey"} sidebar-icon`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
