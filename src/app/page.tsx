"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { IProduct } from "@/models/Product";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api.client";
import ProductCard from "@/components/productCard";

export default function Home() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      (async () => {
        try {
          const response = await apiClient.getProduct();
          setProducts(response);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [session]);

  
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Checking session...</p>
      </div>
    );
  }

  
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-bold mb-2">Welcome to Our App</h1>
          <p className="text-gray-600 mb-4">
            Please sign in to explore our products.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/signin"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="border border-gray-500 font-medium py-2 px-4 rounded"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen font-poppins">
      <div className="max-w-7xl mx-auto px-2 py-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="  text-gray-800 md:flex hidden">
            Welcome, {session.user?.email} 👋
          </h1>
          <div className="space-x-2 flex ">
            <Link
              href="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 text-white  py-2 px-4 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        </div>

      
        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
