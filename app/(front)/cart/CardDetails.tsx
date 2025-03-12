'use client';

import useCartService from '@/lib/hooks/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/moving-border';
import { LampContainer } from "@/components/ui/lamp";
import { motion } from 'framer-motion';

export default function CartDetails() {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className="container mx-auto p-4">
      {items.length === 0 ? (
        <LampContainer>
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="mt-8 bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 py-4 bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent md:text-8xl shadow-lg"
            >
              Your Cart is Empty!
            </motion.h1>
            <p className="mt-4 text-xl font-medium text-white md:text-2xl">
              Explore amazing products and add them to your cart.
            </p>
            <Link href="/" className="mt-6 inline-block text-lg font-semibold text-blue-600 underline md:text-xl">
              Go shopping
            </Link>
          </div>
        </LampContainer>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <h1 className="py-4 text-4xl text-center font-extrabold md:col-span-4">Shopping Cart</h1>
          
          {/* Cart Items */}
          <div className="overflow-x-auto md:col-span-3">
            <table className="table w-full border">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
  {items.map((item, index) => (
    <tr key={`${item.slug}-${index}`}>
      <td>
        <Link
          href={`/product/${item.slug}`}
          className="flex items-center"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={50}
            height={50}
            className="rounded"
          />
          <span className="px-2">{item.name}</span>
        </Link>
      </td>
      <td className="flex items-center justify-center space-x-2">
        <button
          className="custom-decrease-button"
          type="button"
          onClick={() => decrease(item)}
        >
          -
        </button>
        <span className="px-2">{item.qty}</span>
        <button
          className="custom-increase-button"
          type="button"
          onClick={() => increase(item)}
        >
          +
        </button>
      </td>
      <td>${item.price}</td>
    </tr>
  ))}
</tbody>

            </table>
          </div>

          {/* Cart Summary */}
          <div className="md:col-span-1 flex justify-end md:mt-0 mt-4">
            <div className="card bg-base-300 w-full md:w-auto">
              <div className="card-body">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">
                      Subtotal ({items.reduce((a, c) => a + c.qty, 0)}) : $
                      {itemsPrice}
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push('/shipping')}
                      className="btn btn-primary w-full sm:w-auto ml-auto"
                    >
                      Proceed to Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add More Button */}
      {items.length !==0 && (
        <div className="mt-5 text-center">
          <Button
            onClick={() => router.push('/')}
            borderRadius="1.75rem"
            className="bg-slate-400 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Add More
          </Button>
        </div>
      )}
    </div>
  );
}
