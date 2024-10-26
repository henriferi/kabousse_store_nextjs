import { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
    products: Product[]
    onProductClick: (product: Product) => void
}

export function ProductList({products, onProductClick}: ProductListProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onClick={onProductClick} />
            ))}
        </div>
    )
}