
import data from "@/lib/data";
import ProductItem from "@/components/products/ProductItem";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
 
import productService from "@/lib/services/ProductService";
import { convertDocToObj } from "@/lib/utils";
export default async function Home() {
  const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()
  const words = `Discover Innovation: Shop the Latest Products Now at CodeCart!`;
  return (
    <main> 
      
      <h2 className="text-2xl py-2 text-gray-900 dark:text-gray-100">
  <TextGenerateEffect words={words} />
</h2>


     <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mb-4">
      
{
  latestProducts.map((product)=>(
    <ProductItem
    key={product.slug}
    product={convertDocToObj(product)}
    />
  ))
}
     </div>
     </main>
  );
}
