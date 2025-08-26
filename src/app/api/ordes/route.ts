import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/Db";
import Order, { IOrder } from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });


export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
          return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
          );
        }

        const data = await req.json();
        const { productId, variant } = data;

        if (!productId || !variant) {
          return NextResponse.json(
            { success: false, error: "Missing required fields" },
            { status: 400 }
          );
        }

        await connectDB();

        const payment = await razorpay.orders.create({
          amount: Math.round(variant.price * 100),
          currency: "INR",
          receipt: `${productId}-${variant.type}-${Date.now()}`,
          notes: {
            productId: productId.toString(),
            variant: variant.type,
          },
        });

        const order:IOrder = await Order.create({
          userId: session.user.id,
          productId: productId,
          variant: variant,
          razorpayOrderId: payment.id,
          amount: Math.round(variant.price * 100),
          status: "pending",
        })

        return NextResponse.json({
         orderId: payment.id,
         amount: payment.amount,
         currency: payment.currency,
         dbOderId: order._id,
         order: order,
         payment: payment,
        });
      } catch (error) {
        console.log(error);
        return NextResponse.json({
          success: false,
          error: "Failed to create order",
        });
      }
}