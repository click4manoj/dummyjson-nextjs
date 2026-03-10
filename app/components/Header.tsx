import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            AppNextjs
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href={`/about`} className="mr-5 hover:text-gray-900">About</Link>
            <Link href={`/products`} className="mr-5 hover:text-gray-900">Products</Link>
            <Link href={`/`} className="mr-5 hover:text-gray-900">Login</Link>
          </nav>
          <Link href={`/cart`} className="inline-flex relative items-center  border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            <span className="absolute top-0 right-0">0</span>
            <ShoppingCart />
          </Link>
        </div>
      </header>
    </>
  )
}