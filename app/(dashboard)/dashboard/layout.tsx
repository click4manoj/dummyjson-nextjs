import DashboardLayoutWrapper from "@/app/components/DashboardLayoutWrapper";
import { getCurrentUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
export default async function DhashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user =  await getCurrentUser();
   if (!user) {
      redirect('/');
    }
  return (
    <div className="bg-white">
      <main className="main">
        <div className='min-h-screen xl:flex bg-white'>
          <DashboardLayoutWrapper  user={user}>{children}</DashboardLayoutWrapper>
        </div>
        </main>
    </div>
  );
}
