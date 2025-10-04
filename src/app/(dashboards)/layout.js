import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"


export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="border-2 w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}