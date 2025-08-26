import { connectDB } from "@/lib/Db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        connectDB();
        const { id } = await params;
        if (!id) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        const product = await Product.findById(id).lean();
        if (!product) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to save file" },
            { status: 500 }
        );
    }
}
