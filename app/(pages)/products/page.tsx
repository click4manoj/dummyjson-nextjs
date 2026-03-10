"use client";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Products {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;  

}
export default function Products() {
  const [products, setProducts] = useState<Products[]>([]);
  const url = 'https://dummyjson.com/products?limit=16';

 
  useEffect(()=>{
     const fetchProduct = async ()=>{
    try{
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data.products);
    console.log(data)
    }
    catch(error){
      console.log('Fetch Error', error);
    }
  }
    fetchProduct();
  },[])
  return (
   <>
     <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
        {products.map((item) => (
          <div  key={item.id} className="p-4 md:w-1/4">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <img  className="lg:h-48 md:h-36 w-full object-contain object-center"
              src={item.thumbnail} 
              alt={item.title}
            />
            <div className="p-6">
            <span className="tracking-widest text-xs title-font font-medium text-blue-600 mb-1 uppercase">{item.category}</span>
            <h2 className="title-font text-lg font-medium text-gray-900 mb-3">{item.title}</h2>
            <div className="flex items-center flex-wrap justify-between border-t-2 border-gray-200 pt-6 text-sm">
              <Link className="flex align-center gap-2 hover:text-blue-600 ease-linear" href={`/products/${item.id}`}>
              View Product
                <MoveRightIcon />
              </Link>
            <p className="text-blue-600 font-bold">${item.price}</p>
              </div>
          </div>
          </div>
          </div>
        ))}
      </div>
    </div>
    </section>
   </>
  );
}
