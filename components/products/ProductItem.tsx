"use client";

import { Product } from '@/lib/models/ProductModel'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CardBody, CardContainer, CardItem } from '../ui/3d-card'

export default function ProductItem({ product }: { product: Product }) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group bg-white dark:bg-gray-800 rounded-xl transition-all transform hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500 w-full max-w-xs p-4">
        {/* Card Image with Zoom Effect */}
        <CardItem
          className="relative overflow-hidden rounded-xl transition-transform duration-300 group-hover:scale-110"
        >
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-110"
            />
          </Link>
        </CardItem>

        {/* Product Information */}
        <div className="mt-4 space-y-2">
          <CardItem className="text-lg font-semibold text-neutral-700 dark:text-white transition-all duration-300 group-hover:translateY-2">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </CardItem>
          <CardItem className="text-sm text-neutral-500 dark:text-neutral-300">
            {product.brand}
          </CardItem>

          {/* Price and Button Section */}
          <div className="flex justify-between items-center">
            <CardItem className="text-xl font-bold text-neutral-700 dark:text-white">
              ${product.price}
            </CardItem>

            {/* Add to Cart Button */}
            <CardItem
              as="button"
              className="px-4 py-1 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold transition-all duration-300 transform group-hover:scale-105 hover:bg-gray-700"
            >
              Add to Cart
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
