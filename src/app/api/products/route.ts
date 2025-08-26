import { connectDB } from "@/lib/Db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectDB();

    const products = await Product.find({}).lean();
    if (!products || products.length === 0) return NextResponse.json({ success: false, error: "Products not found" }, { status: 404 });
    return NextResponse.json(products);

  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json(
      { success: false, error: "Failed to save file" },
      { status: 500 }
    );
  }
}
