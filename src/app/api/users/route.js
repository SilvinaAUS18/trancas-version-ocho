//http://localhost:3000//api/users
import {  NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import User from "../../../model/User";

export async function GET(request) {
  try {
    await connectDB();
    const users = await User.find();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "messages.error.default, error" },
      { status: 500 }
    );
  }
}