'use client'
import CheckoutSteps from '@/components/checkoutSteps'
import useCartService from '@/lib/hooks/useCartStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import axios from 'axios'
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
const Form = () => {
    const router = useRouter()
    const {
        paymentMethod,
        shippingAddress,
        items,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        clear,
    } = useCartService()

    const [isPlacing, setIsPlacing] = useState(false)

    const handlePlaceOrder = async () => {
        setIsPlacing(true);

        
        setTimeout(() => {
            router.push("/order"); 
        }, 2000);
    };
    
    
    
    

    useEffect(() => {
        if (!paymentMethod) {
            return router.push('/payment')
        }
        if (items.length === 0) {
            return router.push('/')
        }
    }, [paymentMethod, router])

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <></>

    return (
        <div className="px-4 md:px-8">
            <CheckoutSteps current={4} />

            <div className="grid md:grid-cols-4 md:gap-5 my-4">
                <div className="overflow-hidden md:col-span-3">
                    <div className="card bg-transparent shadow-md">
                        <div className="card-body">
                            <h2 className="card-title text-lg font-bold">Shipping Address</h2>
                            <p>{shippingAddress.fullName}</p>
                            <p>
                                {shippingAddress.address}, {shippingAddress.city},{' '}
                                {shippingAddress.postalCode}, {shippingAddress.country}{' '}
                            </p>
                            <div>
                                <HoverBorderGradient
                                    containerClassName="rounded-full"
                                    as="button"
                                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 border-2 border-transparent hover:border-blue-500"
                                >
                                    <Link
                                        className="text-sm text-blue-500 hover:underline"
                                        href="/shipping"
                                    >
                                       <span>Edit</span>
                                    </Link>
                                </HoverBorderGradient>

                            </div>
                        </div>
                    </div>

                    <div className="card bg-transparent shadow-md mt-4">
                        <div className="card-body">
                            <h2 className="card-title text-lg font-bold">Payment Method</h2>
                            <p>{paymentMethod}</p>
                            <div>
                            <HoverBorderGradient
                                    containerClassName="rounded-full"
                                    as="button"
                                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 border-2 border-transparent hover:border-blue-500"
                                >
                                    <Link
                                        className="text-sm text-blue-500 hover:underline"
                                        href="/shipping"
                                    >
                                       <span>Edit</span>
                                    </Link>
                                </HoverBorderGradient>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-transparent shadow-md mt-4">
                        <div className="card-body">
                            <h2 className="card-title text-lg font-bold">Items</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.slug}>
                                            <td>
                                                <Link
                                                    href={`/product/${item.slug}`}
                                                    className="flex items-center hover:opacity-80 transition-opacity"
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={50}
                                                        height={50}
                                                    ></Image>
                                                    <span className="px-2 text-sm">
                                                        {item.name} ({item.color} {item.size})
                                                    </span>
                                                </Link>
                                            </td>
                                            <td>
                                                <span>{item.qty}</span>
                                            </td>
                                            <td>${item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                            <HoverBorderGradient
                                    containerClassName="rounded-full"
                                    as="button"
                                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 border-2 border-transparent hover:border-blue-500"
                                >
                                    <Link
                                        className="text-sm text-blue-500 hover:underline"
                                        href="/shipping"
                                    >
                                       <span>Edit</span>
                                    </Link>
                                </HoverBorderGradient>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card bg-transparent shadow-md">
                        <div className="card-body">
                            <h2 className="card-title text-lg font-bold">Order Summary</h2>
                            <ul className="space-y-3">
                                <li>
                                    <div className="flex justify-between">
                                        <div>Items</div>
                                        <div>${itemsPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex justify-between">
                                        <div>Tax</div>
                                        <div>${taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex justify-between">
                                        <div>Shipping</div>
                                        <div>${shippingPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex justify-between">
                                        <div>Total</div>
                                        <div>${totalPrice}</div>
                                    </div>
                                </li>

                                <li>
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={isPlacing}
                                        className="btn btn-primary w-full transition-transform transform hover:scale-105"
                                    >
                                        {isPlacing && (
                                            <span className="loading loading-spinner"></span>
                                        )}
                                        Place Order
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
