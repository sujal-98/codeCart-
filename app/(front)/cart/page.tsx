import React from 'react'
import CartDetails from './CardDetails'
export const metadata={
    title: 'Shopping Cart',
    description: 'View your cart and checkout',
    keywords: ['cart', 'checkout', 'shopping']
  
}
const CartPage = () => {
  return (
     
    <CartDetails />
  )
}

export default CartPage
