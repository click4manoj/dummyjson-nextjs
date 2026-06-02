'use client';
import React, { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, UserRound, Users } from "lucide-react";


export default function SidebarMenu({ isSidebarOpen }: { isSidebarOpen: boolean }) {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const toggleDropdown = (menuName: string) => {
		setOpenDropdown(openDropdown === menuName ? null : menuName);
	}
	return (
		<div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
			{/* MAIN MENU */}
			<div className="mb-6">
				<nav role="navigation" aria-label="MAIN MENU">
					<ul className="space-y-2">
						<li>
							<div>
								<button
									aria-expanded="false"
									onClick={() => toggleDropdown('dashboard')}
									className="cursor-pointer rounded-lg px-3.5 font-medium text-dark-4 transition-all duration-200 dark:text-dark-6 hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white flex w-full items-center gap-3 py-3"
								>
									<LayoutDashboard />
									{!isSidebarOpen && (
										<>
											<span>Dashboard</span>
											<svg
												width="16"
												height="8"
												viewBox="0 0 16 8"
												fill="currentColor"
												className="ml-auto transition-transform duration-200 rotate-0"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													clipRule="evenodd"
													d="M7.553.728a.687.687 0 01.895 0l6.416 5.5a.688.688 0 01-.895 1.044L8 2.155 2.03 7.272a.688.688 0 11-.894-1.044l6.417-5.5z"
												></path>
											</svg>
										</>
									)}
								</button>
								{
									openDropdown === 'dashboard' && (
										<ul className="ml-9 mr-0 space-y-1.5 pb-3.75 pr-0 pt-2"
											role="menu"
										>
											<li role="none">
												<Link
													href="/dashboard"
													className="rounded-lg px-3.5 font-medium text-dark-4 transition-all duration-200 dark:text-dark-6 hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white relative block py-2"
												>
												
													<span>Dashboard</span>
												</Link>
											</li>
											<li role="none">
												<Link
													href="/dashboard/products"
													className="rounded-lg px-3.5 font-medium text-dark-4 transition-all duration-200 dark:text-dark-6 hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white relative block py-2"
												>
													<span>Products</span>
												</Link>
											</li>

										</ul>
									)}

							</div>
						</li>

						{/* <li>
							<Link
								href="/calendar"
								className="rounded-lg px-3.5 font-medium text-dark-4 transition-all duration-200 dark:text-dark-6 hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white relative flex items-center gap-3 py-3"
							>
								<span>Calendar</span>
							</Link>
						</li> */}

						<li>
							<Link
								href="/dashboard/profile"
								className="rounded-lg px-3.5 font-medium text-dark-4 transition-all duration-200 dark:text-dark-6 hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white relative flex items-center gap-3 py-3"
							>
								<UserRound />
								{!isSidebarOpen && (
									<span>Profile</span>
								)}
							</Link>
						</li>
						<li>
							<Link
								href="/dashboard/users"
								className="rounded-lg px-3.5 font-medium text-dark-4 transition-all duration-200 dark:text-dark-6 hover:bg-gray-100 hover:text-dark hover:dark:bg-[#FFFFFF1A] hover:dark:text-white relative flex items-center gap-3 py-3"
							>
								<Users />
								{!isSidebarOpen && (
									<span>Users</span>
								)}
							</Link>
						</li>


					</ul>
				</nav>
			</div>
		</div>
	);
};

