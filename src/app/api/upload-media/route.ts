import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/Db";
import Product, { IProduct, ImageVariant } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const mediaType = searchParams.get("type");
        const limit = parseInt(searchParams.get("limit") || "50");
        const skip = parseInt(searchParams.get("skip") || "0");

        const query = mediaType ? { mediaType } : {};

        const files = await Product.find(query)
            .sort({ uploadedAt: -1 })
            .limit(limit)
            .skip(skip)
            .lean();

        const totalCount = await Product.countDocuments(query);

        return NextResponse.json({
            success: true,
            files,
            totalCount,
            hasMore: skip + limit < totalCount,
        });
    } catch (error) {
        console.error("Error fetching media files:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch files" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {   
        const session = await getServerSession(authOptions);


        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }
       
        await connectDB();
        const body:IProduct = await request.json();

        if(
            !body.name ||
            !body.description ||
            !body.imageUrl ||
            body.variants.length === 0
        ) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const savedFile = await Product.create(body);

        return NextResponse.json(
            {
                success: true,
                file: savedFile,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to save file" },
            { status: 500 }
        );
    }
}



