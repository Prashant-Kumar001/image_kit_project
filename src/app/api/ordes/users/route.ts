import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/Db";
import Order from "@/models/Order";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();
        const users = await Order.find({
            user: session.user.id
        }).populate({
            path: "user",
            select: "name email",
            options: { strictPopulate: false }
        }).sort({ createdAt: -1 }).lean();
        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to save file" },
            { status: 500 }
        );
    }
}