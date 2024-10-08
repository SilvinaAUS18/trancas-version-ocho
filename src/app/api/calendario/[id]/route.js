// http://localhost:3000/api/blog/someid

import { connectDB } from "../../../../lib/db";
import { NextResponse } from "next/server";
import Calendario from '../../../../model/Calendario';

export async function PUT(req, res) {
  await connectDB();

  const id = res.params.id;

  try {
    const body = await req.json();
    const blog = await Calendario.findById(id)


    const updateBlog = await Calendario.findByIdAndUpdate(
      blog,
      { $set: { ...body } },
      { new: true }
    );

    return NextResponse.json(updateBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "PUT error" }, {status: 500});
  }
}

export async function GET(req, res) {
  await connectDB();

  const id = res.params.id;

  try {
    const blog = await Calendario.findById(id)

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "GET error" },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, res) {
    await connectDB();
  
    const id = res.params.id;
    console.log(id)
  
  
  
    try {
      const blog = await Calendario.findById(id)
  
  
      await Calendario.findByIdAndDelete(blog)
  
      return NextResponse.json({msg: "Eliminado"}, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Delete error" }, {status: 500});
    }
  }
