import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";
import { currentUser } from "@clerk/nextjs/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const GET = async (request: NextRequest, context: RouteContext) => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  // Resolve the params Promise
  const resolvedParams = await context.params;
  const id = resolvedParams.id;

  if (!id || id.length !== 24) {
    return NextResponse.json({ message: "Invalid Order ID" }, { status: 400 });
  }

  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};