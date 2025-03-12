import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import productService from '@/lib/services/ProductService';
import { convertDocToObj } from '@/lib/utils';
import AddToCart from '@/components/products/AddToCart';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await productService.getSlug(params.slug);
  if (!product) {
    return { title: 'Product not found' };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

async function ProductDetails({ params }: { params: { slug: string } }) {
  const product = await productService.getSlug(params.slug);
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            🚫 Product Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Oops! The product you're looking for doesn't exist or is no longer available.
          </p>
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="my-4 md:my-8">
        <Link href="/" className="text-blue-600 dark:text-blue-400 text-lg font-medium hover:underline">
          &larr; Back to Products
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-1 flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            className="rounded-5xl border-spacing-8 shadow-lg py-3"
          />
        </div>

        <div className="md:col-span-1 space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{product.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {product.rating} of {product.numReviews} reviews
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">{product.brand}</p>

          <div className="divider dark:border-gray-600"></div>

          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Description</h2>
          <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
        </div>

        <div className="md:col-span-1 space-y-4">
          <div className="card bg-base-100 dark:bg-gray-700 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-gray-800 dark:text-white">Price</span>
                <span className="text-xl text-gray-800 dark:text-white">${product.price}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-gray-800 dark:text-white">Status</span>
                <span className={`text-lg font-semibold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                </span>
              </div>
            </div>
            {product.countInStock !== 0 && (
              <div className="card-actions justify-center">
                <AddToCart
                  item={{
                    ...convertDocToObj(product),
                    qty: 0,
                    color: '',
                    size: '',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
