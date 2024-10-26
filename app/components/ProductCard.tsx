import { Product } from "../types/product";


interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}


export function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <div onClick={() => onClick(product)} className="border border-gray-300 bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow mb-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">Price: {product.price}</p>
        </div>
    )
}