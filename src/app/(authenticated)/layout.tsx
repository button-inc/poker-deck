import { AppSidebar } from "@/components/navbar/app-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cookies } = await import("next/headers");
  return (
    <SidebarLayout
      defaultOpen={cookies().get("sidebar:state")?.value === "true"}
    >
      <AppSidebar />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md border-2 border-dashed p-2">
          <SidebarTrigger />
          {children}
        </div>
      </main>
    </SidebarLayout>
  );
}
