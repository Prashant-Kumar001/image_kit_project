import { IProduct } from "@/models/Product";
import { Image } from '@imagekit/next';
import React from "react";

const ProductCard = ({ product }: { product: IProduct }) => {

  return (
    <div className="max-w-sm w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
      <div className="r">
        {product.imageUrl ? (
          product.imageUrl.includes("ik.imagekit.io") ? (
            <Image
              urlEndpoint={product.imageUrl}
              alt={product.name}
              src={product.imageUrl}
              width={500}
              height={500}
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL="..."
            />
          ) : (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-4 space-y-2 mt-1.5">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {
          product.variants.map((variant, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {variant.type}
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {variant.license}
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {variant.price}
              </span>
            </div>
          ))
        }

        <div className="flex gap-2 mt-4">
          <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">
            Buy Now
          </button>
          <button className="px-3 py-2 text-sm font-medium border rounded-lg hover:bg-gray-50 transition">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
