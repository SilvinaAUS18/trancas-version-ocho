import React from "react";
import Image from "next/image";
import Link from "next/link";
import demoImage from "../assets/imagenes/actualidad.jpg";



function CardNoticiastodo({noticia}){
  return(
    <div>
    <Link href={`/noticias-cargadas/home/${noticia?._id}`}>
    <div>
              <h2 className="text-blue-900 bg-blue-900 mx-2 my-4 text-xl font-extrabold">{noticia?.categoria}</h2>
            </div>
        <div className=" grid lg:grid-cols-2  sm:grid-cols-1 gap-8 ">
            
            <div >
                <Image
                        src={ noticia?.imagen ?  noticia.imagen?.url : demoImage }
                        alt="primera noticia image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className=" w-full h-full rounded-lg  "
                      />
            </div>
            <div>
                <h1 className="text-blue-950 mx-2 my-4 text-xl text-justify font-extrabold">{noticia?.titulo}</h1>
                <h2 className="text-xl font-bold text-blue-950 text-justify my-2">{noticia?.bajada}</h2> 
                <p className=" text-xl text-blue-950 text-justify">{noticia?.resumen}</p>
            </div>
        </div>

    </Link>
    </div>      
  )
}
export default  CardNoticiastodo;


