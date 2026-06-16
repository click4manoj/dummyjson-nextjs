'use client';
import { ChevronLeft, ChevronRight, SquarePen, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}
interface Users {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  address: Address;
}
export default function DashboardUsers() {
  const [users, setUsers] = useState<Users[]>([]);
  const [search,setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const fetchUsers = async () => {
    const res = await fetch('https://dummyjson.com/users');
    const data = await res.json();
    setUsers(data.users);
    // console.log(data.users);
  }

const handleDelete = async (id: number) => {
  try {
    const res = await fetch(`https://dummyjson.com/users/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    console.log(data);
    setUsers(users.filter((user: Users) => user.id !== id));
  } catch (err) {
    console.error('Delete failed:', err);
  }
};
const filteredUsers = users.filter(user => 
  user.firstName.toLowerCase().includes(search.toLowerCase()) ||
  user.lastName.toLowerCase().includes(search.toLowerCase()) ||
  user.email.toLowerCase().includes(search.toLowerCase())
);
const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
const currentUsers = filteredUsers.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const handlePageChange = (page: number) => {
  if(page>=1 && page<=totalPages){
    setCurrentPage(page);
  }
}


  useEffect(() => {
    fetchUsers();
  }, [])
  return (<>
    <div className="flex justify-between">
      <h1 className="text-2xl font-semibold mb-6">Users List</h1>
      <Link href={'/dashboard/add-user'} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6">Add User</Link>
    </div>
    <div>
      <input type="text" placeholder="Search..." className="border border-gray-300 rounded-md py-2 px-4 mb-4" 
        onChange={(e) =>{
          setSearch(e.target.value)
        }}
        value={search}
      />
    </div>
    {currentUsers.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead>
            <tr className="border-2 border-gray-300">
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300 text-center ">#</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300">User Image</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300 rounded-tl rounded-bl">First Name</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300">Email</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300">Address</th>
              <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300">Country</th>
              <th className="px-4 py-3 text-right title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-300 rounded-tr rounded-br">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id} className="border-b-2 border-l-2 border-r-2 border-gray-300">
                <td className="text-center ">{index + 1}</td>
                <td className="px-4 py-3">
                  <Image src={user.image} alt={user.firstName} width={30} height={30} />
                </td>
                <td className="px-4 py-3">{user.firstName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.address.address}</td>
                <td className="px-4 py-3">{user.address.country}</td>
                <td className="px-4 py-3 text-right flex gap-1 justify-end">
                  <button className="text-gray-900 cursor-pointer" onClick={() => handleDelete(user.id)}> <Trash /></button>
                  <Link href={`/dashboard/users/${user.id}`} className="text-gray-900 cursor-pointer"> <SquarePen />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600 text-sm">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center cursor-pointer gap-1 px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border cursor-pointer rounded {currentPage === page ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center cursor-pointer gap-1 px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>) : (
      <div className="py-6 text-gray-600">No users found.</div>
    )}
  </>);
}