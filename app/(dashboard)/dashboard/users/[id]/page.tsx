'use client';
import { useEffect, useState } from "react";
interface User {
	id: number;
	firstName: string;
	age: number;
	address: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
	email: string;
}
export default function SingleUser({ params }: { params: Promise<{ id: string }> }) {
		const [userData, setUserData] = useState<User | null>(null);
		const [isLoading, setIsLoading] = useState(true);
		const [showSuccess, setShowSuccess] = useState(false);
		const fetchUser  = async () => {
		const { id } = await params;
		const res = await fetch(`https://dummyjson.com/users/${id}`);
		const data = await res.json();
		setUserData(data);
		setIsLoading(false);
	};
	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();
		const { id } = await params;
		const res = await fetch(`https://dummyjson.com/users/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		});
		const data = await res.json();
		console.log(data);
		setShowSuccess(true);
	}
	// console.log(data);
	useEffect(() => {
		fetchUser();
		
	}, []);
	useEffect(() => {
		if (showSuccess) {
			const timer = setTimeout(() => {
				setShowSuccess(false);
			}, 5000); 
			return () => clearTimeout(timer);
		}
	},[showSuccess])
if (isLoading) {
    return <div>Loading...</div>;
  }
	if (!userData) {
    return <div>User not found</div>;
  }
	return (<>
	{showSuccess && (
				<>
					<div className="fixed top-24  right-4 bg-white flex items-center text-green-700 w-full max-w-xs p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-gray-200 border-default" role="alert">
						<svg
							height={24}
							width={24}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							strokeLinecap="round"
							strokeLinejoin="round"

						>
							<path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
						</svg>
						<div className="ms-2.5 text-sm ">Updated Successfully!</div>
						<button onClick={() => setShowSuccess(false)} type="button" className="cursor-pointer ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none" data-dismiss-target="#toast-default" aria-label="Close">
							<span className="sr-only">Close</span>
							<svg
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18 17.94 6M18 18 6.06 6"
								/>
							</svg>						</button>
					</div>
				</>

			)}
		<div className="max-w-md w-full space-y-8 mx-auto">
			<h1 className="text-2xl font-semibold mb-6">Update users {userData.firstName}</h1>
			<div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
				<form className="space-y-6" onSubmit={handleUpdate}>
					<div>
						<label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
						<input 
						onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
						name="firstName" id="firstName" type="text" defaultValue={userData.firstName} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
						<input type="hidden" name="email" defaultValue={userData.email} />
						<div id="email-display"
						>{userData.email}</div>
					</div>
						<div>
						<label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
						<input 
						onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) })}						
						name="age" id="age" type="text" defaultValue={userData.age} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
						<input 
						onChange={(e) => setUserData({ ...userData, address: { ...userData.address, address: e.target.value } })}
						name="address" id="address" type="text" defaultValue={userData.address.address} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>
					<div>
						<button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update</button>
					</div>
				</form>
			</div>
		</div>
	</>);
}

