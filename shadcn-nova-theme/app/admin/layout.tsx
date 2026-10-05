
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDown, Home, Plus, User2 } from "lucide-react";

export default function AdminLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <Sidebar variant="inset">
                <SidebarHeader>
                    Fero AI
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupAction>
                            <Plus /> <span className="sr-only">Add Project</span>
                        </SidebarGroupAction>
                        <SidebarGroupContent>
                        </SidebarGroupContent>
                        <SidebarMenu>
                        </SidebarMenu>
                    </SidebarGroup>
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel render={<CollapsibleTrigger />}>
                                Help
                                <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <User2 /> Username
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <main>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
