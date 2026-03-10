import { Heart, Star } from "lucide-react";
import Image from "next/image";
interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  brand: string;
  rating: number;
  stock: number;
  discountPercentage: number;
  reviews: Array<{
    rating: number;
    comment: string;
    reviewerName: string;
    date: string;
  }>;
}


export default  async function SingleProduct<Product>({params}: {params: Promise<{id: string}>}) {
    const { id } = await params; 
   const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product  = await await res.json();
  console.log(product);
   const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i} 
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{product.title}</h1>
              <p className="leading-relaxed mb-4">{product.description}</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Color</span>
                <span className="ml-auto text-gray-900">Blue</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Size</span>
                <span className="ml-auto text-gray-900">Medium</span>
              </div>
              <div className="flex border-t border-gray-200 py-2 mb-3">
                <span className="text-gray-500">Stocks</span>
                <span className="ml-auto text-gray-900">{product.availabilityStatus}</span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add To Cart</button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <Heart />
                </button>
              </div>
            </div>
            <Image height={400} width={400} alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.images[0]} loading="eager" />
          </div>
        </div>
      </section>
      <section className="review">
        <div className="container px-5 py-24 mx-auto">
          <div className="divide-y divide-gray-100">
              {product.reviews.slice(0, 3).map((review: Review, idx: number) => (
                <div key={idx} className="p-8 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    {renderStars(review.rating)}
                    <span className="font-semibold text-gray-900">{review.reviewerName}</span>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
            </div>
      </section>
    </>
  )
}