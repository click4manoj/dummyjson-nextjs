'use client';
import { useState } from 'react';
import Link from 'next/link';
import SidebarMenu from '@/app/components/SidebarMenu';
import DashboardHeader from './DashboardHeader';
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}
export default function DashboardLayoutWrapper(
  { children,
    user }: {
      children: React.ReactNode,
      user?: User
    }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (<>
    <aside className={`fixed flex flex-col top-0 left-0 bg-white h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
            ${isSidebarOpen ? 'translate-x-0 w-28.5 ' : '-translate-x-full w-72.5'}
            xl:translate-x-0`}>
      <div className="flex h-full overflow-y-auto flex-col py-10 pl-6.25 pr-1.75">
        <div className=''>
          <Link href="/" data-discover="true">
            AppNextjs
          </Link>
          <SidebarMenu isSidebarOpen={isSidebarOpen} />
        </div>
      </div>
    </aside>
    <div className={`flex-1 transition-all duration-300 ease-in-out  ${isSidebarOpen ? `ml-28.5` : `ml-72.5`}`}>
      <DashboardHeader
        user={user}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />
      <div className="p-6">
      {children}
      </div>
    </div>
  </>);
}