import { NextRequest, NextResponse } from "next/server";
import data from "@/lib/data";
import connectDB from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";
import ProductModel from "@/lib/models/ProductModel";
export async function GET(request:NextRequest){
const {users,product}=data
await connectDB()

await UserModel.deleteMany()
await UserModel.insertMany(users)

await ProductModel.deleteMany()
await ProductModel.insertMany(product)

return NextResponse.json({
    message: 'seeded successfully',
    users,
    product,
  })
}