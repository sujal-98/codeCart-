# Lessons
 1.Introduction
 2.Install Tools
3.Create Next App
4 Publish to Github
5.List Products
create product type
add data.ts
add images
render products
6.Create Product Details
create product page
create 3 columns
show image in first column
show product info in second column
show add to cart action on third column
add styles

7. made round 2 function in util.ts
created types of order model
installed zustand for state management
created hook folder for zustand 
useCartStore,ts (adding items to cart and updating cart values)
created a component addto cart
header folder m menu.tsx for ki card k icons m value aaye kit itni present 

8. made decrease function
app/front/cart page
cardetails.tsx for to mae it client side and i want to make cart page sevrer side

const [mounted, setMounted] = useState(false)
useEffect(() => {
    setMounted(true)
}, [])
 this code snippet will make sure that
 the component will only render in client side
 Why This Ensures Client-Side Rendering:
During Server-Side Rendering: useEffect doesn't run, and mounted remains in its initial state (false). The component skips rendering sensitive or client-specific parts.
During Client Rendering: After the component is hydrated on the client, useEffect runs, setting mounted to true. At this point, the client-specific parts of the component are rendered.

9 connected mongodb and define product schema
10 lib m services folder bnaya for dynamic data aaye db se
productservice.ts
enefits of Using cache:
Improved Performance: Avoids unnecessary recomputations or refetching of the same data.
Server Component Caching: Ensures efficient server-side rendering by caching fetched data within the lifecycle of the request.

dynamic data lia h database se for images get latest products use kia h
for product details product alug route m change kra h

 used clerk for authentication

# creating check out wizard page 
 made type of shipping adrres in order model then usecart hook m payment method shipping adress feild add kri cart m
 MADE 2 FUNCTION save payment method and save shipping address in usecart hook
 basically dono methods m state m value save kri h
created a component using tailwind class step to show one step is completed move to another like a payment chain * remeber this code
app m front m shipping folder as route for shipping page usme form.tsx fir us form ko page.tsx m render krdia
made payment route usme form.tsx fir us form ko page.tsx m render krdia

# created order model wala page
create schema model for order
made an api orders to create and find order in database
made the frontend for place-orer
form then usko render in page


# adding payment gateway
stripe ka account setup kra enviroment variable setup kra
now made a stripe.ts in lib for functionality