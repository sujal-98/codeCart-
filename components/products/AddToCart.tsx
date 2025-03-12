
'use client'

import { OrderItem } from '@/lib/models/OrderModel'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "../ui/moving-border";
import useCartService from '@/lib/hooks/useCartStore';
export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter()
  const { items, increase,decrease} = useCartService()

  const [existItem, setExistItem] = useState<OrderItem | undefined>()

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug))
  }, [item, items])

  const addToCartHandler = () => {
    increase(item)
  }
  return existItem ? (
    <> 
    <div>
      <button className="btn" type="button" onClick={() => decrease(existItem)}>
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" type="button" onClick={() => increase(existItem)}>
        +
      </button>
          
    </div>
    
    <div className='gap-3 mb-20'>
      <Button borderRadius="1.75rem"
      onClick={() => router.push('/cart')}
            className="bg-slate-400 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800">
        
        Proceed to Cart
      </Button>
    </div>
    </>
     
  ) : (
     <Button 
     borderRadius="1.75rem"
        className="bg-slate-400 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 "
      //type="button"
      onClick={addToCartHandler}
     >
         Add To Cart
     </Button>
  )
}
