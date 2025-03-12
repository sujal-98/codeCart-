import { cache } from "react";
import connectDB from '@/lib/dbConnect';
import ProductModel, { Product } from '@/lib/models/ProductModel';

 

export const revalidate=3600

const getLatest=cache(async()=>{
    await connectDB()
    const products=await ProductModel.find({}).sort({_id:-1}).lean()
    return products as Product[]
})

const getFeatured=cache(async()=>{
    await connectDB()
    const products=await ProductModel.find({isFeatured:true}).limit(3).lean()
    return products  as Product[]
})

const getSlug=cache(async(slug:string)=>{
    await connectDB()
    const products=await ProductModel.findOne({slug}).lean()
    return products as Product
})

const productService={
    getLatest,
    getFeatured,
    getSlug,
    
}

export default productService