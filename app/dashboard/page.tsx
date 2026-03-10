import { redirect } from 'next/navigation';
import { getCurrentUser } from '../lib/auth';
import Link from 'next/link';
import Image from 'next/image';
import DahsboardHeader from '@/app/components/DashboardHeader'
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
    redirect('/login');
  }
  console.log(user);
  return (
    <>
      <div className='min-h-screen xl:flex'>
        <aside className='fixed  flex flex-col  top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        w-[290px]
        -translate-x-full
        xl:translate-x-0'>
        <div className="py-8  flex justify-start">
          <Link href="/" data-discover="true">
          AppNextjs
          </Link>
          </div>
        </aside>
        <div className='flex-1 transition-all duration-300 ease-in-out  xl:ml-[290px] '>
         <DahsboardHeader user={user}/>
        </div>
      </div>
    </>
  );
}
