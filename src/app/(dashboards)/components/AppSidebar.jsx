"use client"
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
} from "@/components/ui/sidebar"
import { Home, Radio, Briefcase, BookOpen, Settings, User, LogOut } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
    const session = useSession();


    const pathname = usePathname()
    const userItems = [
        { title: "Applied Job", icon: Home, href: "/dashboard/applied-job" },
        { title: "Add a Post", icon: Radio, href: "/feed" },
        { title: "Manage Post", icon: Briefcase, href: "/jobs" },
        { title: "Enrolled Course", icon: BookOpen, href: "/course" },
    ]
    const recruiterItems = [
        { title: "Post a Job", icon: Home, href: "/dashboard/applied-job" },
        { title: "Manage Job", icon: Radio, href: "/feed" },
        { title: "Add a Post", icon: Radio, href: "/feed" },
        { title: "Manage Post", icon: Briefcase, href: "/jobs" },
    ]
    const instructorItems = [
        { title: "Create Course", icon: Home, href: "/dashboard/applied-job" },
        { title: "Manage Course", icon: Radio, href: "/feed" },
        { title: "Add a Post", icon: Radio, href: "/feed" },
        { title: "Manage Post", icon: Briefcase, href: "/jobs" },
    ]

    let roleItems ;
    if (session?.data?.user?.role === 'user') {
        roleItems = userItems
    } else if (session?.data?.user?.role === 'recruiter') {
        roleItems = recruiterItems;
    } else if (session?.data?.user?.role === 'instructor') {
        roleItems = instructorItems;
    }

    // Main navigation items
    const mainNavItems = [
        { title: "Home", icon: Home, href: "/" },
        { title: "Feed", icon: Radio, href: "/feed" },
        { title: "Jobs", icon: Briefcase, href: "/jobs" },
        { title: "Course", icon: BookOpen, href: "/course" },
    ]

    // Settings navigation items
    const settingsItems = [
        { title: "Profile", icon: User, href: "/profile" },
        { title: "Settings", icon: Settings, href: "/settings" },
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="pt-20 py-2">
                    <h2 className="text-lg font-semibold">My App</h2>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {roleItems?.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link href={item.href}>
                                                <Icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                {/* Main Navigation Group */}
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link href={item.href}>
                                                <Icon className="h-4 w-4" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Settings Group */}
                <SidebarGroup>
                    <SidebarGroupLabel>Account</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {settingsItems.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link href={item.href}>
                                                <Icon className="h-4 w-4" />
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

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <button className="w-full">
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </button>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}