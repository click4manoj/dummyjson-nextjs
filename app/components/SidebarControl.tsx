'use client';
import {useState} from 'react';
import DashboardHeader from '@/app/components/DashboardHeader';
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}
export default function SidebarControl({user}:{user: User }){
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   
return(
    <>
        

</>
)
    
}