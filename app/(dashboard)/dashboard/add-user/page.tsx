'use client';
import { useState, FormEvent, useEffect } from 'react';
import { addUser, NewUser, UserResponse } from '@/app/api/addUser/user';
export default function AddUser() {
	const [loading, setLoading] = useState(false);
	const [showSuccess	, setShowSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [addedUser, setAddedUser] = useState<UserResponse | null>(null);
	const [formData, setFormData] = useState<NewUser>({
		firstName: '',
		lastName: '',
		age: 25
	});
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: name === 'age' ? Number(value) : value, }));

	}
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setAddedUser(null);
		try {
			const user: UserResponse = await addUser(formData);
			setAddedUser(user);
			setShowSuccess(true);
		
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : 'Unknown error';
			setError(message);
		} finally {
			setLoading(false);
		}
	}
	 useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000); // 100 seconds = 100 * 1000 ms
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

	return (
		<>

			<h1 className="text-2xl font-semibold">Add User</h1>
				{showSuccess && addedUser && (
				<>
					<div  className="fixed top-24  right-4 bg-white flex items-center text-green-700 w-full max-w-xs p-4 text-body bg-neutral-primary-soft rounded-base shadow-xs border border-gray-200 border-default" role="alert">
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
						<div className="ms-2.5 text-sm ">Successfully Added User!</div>
						<button onClick={() => setShowSuccess(false)} type="button" className="cursor-pointer ms-auto flex items-center justify-center text-body hover:text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none" data-dismiss-target="#toast-default" aria-label="Close">
							<span className="sr-only">Close</span>
							<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6" /></svg>
						</button>
					</div>
					{/* <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
						{JSON.stringify(addedUser, null, 2)}
					</pre> */}
				</>

			)}


			<div className='max-w-3xl mx-auto relative'>
				<form onSubmit={handleSubmit} className='flex  flex-wrap'>
					<div className='p-4 md:w-1/2'>
						<label>
							First Name
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								required
								className=" w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm  shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10  dark:text-white/90  dark:focus:border-brand-800 xl:w-[430px]"
								style={{ width: '100%', padding: '0.5rem' }}
							/>
						</label>
					</div>
					<div className='p-4 md:w-1/2'>
						<label>
							Last Name
							<input
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								className=" w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm  shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10  dark:text-white/90  dark:focus:border-brand-800 xl:w-[430px]"
								required
								style={{ width: '100%', padding: '0.5rem' }}
							/>
						</label>
					</div>
					<div className='p-4 w-full'>
						<label>
							Age
							<input
								type="number"
								className=" w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm  shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10  dark:text-white/90  dark:focus:border-brand-800 xl:w-[430px]"
								name="age"
								value={formData.age}
								onChange={handleChange}
								required
								min={1}
								max={120}
								style={{ width: '100%', padding: '0.5rem' }}
							/>
						</label>
					</div>
					<div className='p-4 '>
						<button
							type="submit"
							disabled={loading}
							className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-6"
							style={{ padding: '0.6rem', cursor: loading ? 'not-allowed' : 'pointer' }}
						>
							{loading ? 'Adding...' : 'Add User'}
						</button>
					</div>
				</form>
			</div>
			{error && <p style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</p>}

		
		</>
	)
}