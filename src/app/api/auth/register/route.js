// http://localhost:3000/api/auth/register

import User from "../../../../model/User";
import bcrypt from "bcrypt";
import { connectDB} from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const isExisting = await User.findOne({ email });

    if (isExisting) {
      return NextResponse.json({ ErrorMessage: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "POST error de registro" });
  }
}