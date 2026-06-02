
import { redirect } from 'next/navigation';
import { getCurrentUser } from '../../lib/auth';

import SidebarControl from '@/app/components/SidebarControl';
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}
export default async function DashboardPage() {
  const user = await getCurrentUser() as User;
  if (!user) {
    redirect('/');
  }
  return (
    <>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>This is your dashboard content.</p>
    </>
  );
}
