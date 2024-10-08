import Calendario from '../../../model/Calendario';
import { connectDB } from "../../../lib/db";

import {  NextResponse } from "next/server";


export async function POST(request) {
    await connectDB();
  
        try {
        const body = await request.json();
        const newNoticia = await Calendario.create(body);
          return NextResponse.json(newNoticia, { status: 201 });
      } catch (error) {
        return NextResponse.json({ message: "POST error (CREAR NOTICIA)" });
      }
    }


    export async function GET(request) {
        await connectDB();
          try {
          const calendario = await Calendario.find({})
            
              return NextResponse.json(calendario);
        } catch (error) {
          return NextResponse.json({ message: "GET error" },{status: 500, } );
        }
      }
          