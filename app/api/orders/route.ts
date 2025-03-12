import connectDB from "@/lib/dbConnect";
import OrderModel, { OrderItem } from "@/lib/models/OrderModel";
import ProductModel from "@/lib/models/ProductModel";
import UserModel from "@/lib/models/UserModel";
import { round2 } from '@/lib/utils';
import { currentUser } from "@clerk/nextjs/server";

const calcPrices = (orderItems: OrderItem[]) => {
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export const POST = async (req: any) => {
  try {
    
    await connectDB();

    const clerkUser = await currentUser();
     
    if (!clerkUser) {
      return Response.json({ message: "Unauthorized: No user found" }, { status: 401 });
    }

    let user = await UserModel.findOne({ clerkId: clerkUser.id });
    
    if (!user) {
      user = await UserModel.create({
        clerkId: clerkUser.id,
        name: clerkUser.firstName || "Unknown",
        email: clerkUser.emailAddresses[0]?.emailAddress || "Unknown",
        password: "N/A",
        isAdmin: false,
      });
      
    }

    const payload = await req.json();
   
    const dbProductPrices = await ProductModel.find(
      {
        _id: { $in: payload.items.map((x: { _id: string }) => x._id) },
      },
      "price"
    );
    

    const dbOrderItems = payload.items.map((item: { _id: string }) => ({
      ...item,
      product: item._id,
      price: dbProductPrices.find((p: { _id: string }) => p._id.toString() === item._id)?.price,
      _id: undefined,
    }));
     

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);
    

    const newOrder = new OrderModel({
      user: user._id,
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
    });
  

    const createdOrder = await newOrder.save();
    
    console.log("Order has been created")
    return Response.json(
      { message: "Order has been created", order: createdOrder },
      { status: 201 }
    );
    
  } catch (err: any) {
    console.error("Error occurred:", err);
    return Response.json(
      { message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
};
