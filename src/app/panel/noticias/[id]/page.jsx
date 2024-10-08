"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";

import demoImage from "../../../../assets/imagenes/actualidad.jpg";
import { deletePhoto } from "../../../../actions/uploadActions";


const DetalleNoticias = ({ params }) => {
  const [detalleNoticia, setDetalleNoticia] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  async function buscarNoticia() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/noticia/${params.id}`);
      const noticia = await response.json();
      setDetalleNoticia(noticia);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    buscarNoticia()
  }, []);


  const handleBlogDelete = async (imageId) => {
    try {
        setIsDeleting(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/noticia/${params.id}`,
          {
            method: "DELETE",
            headers: {
            },
          }
        );

        if (response?.status === 200) {
          await deletePhoto(imageId);
          router.refresh();
          router.push("/panel/noticias");
        }
      setIsDeleting(false);
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <section className=" mx-2 ">
        <div className="flex  container items-center justify-end gap-5">
          <button>
            Editar
          </button>
          <Link
            href={`/panel/noticias/edit/${params.id}`}
            className="flex items-center gap-1 text-primaryColor"
          >
            <BsFillPencilFill />
            
          </Link>

          <button
            onClick={() => handleBlogDelete(detalleNoticia?.imagen?.id)}
            className="flex items-center gap-1 text-red-500"
          >
            <BsTrash />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>

      <div className="flex flex-col items-center justify-center container">
          <div className="flex flex-col justify-center items-center py-10">
          <div className="text-white bg-blue-700 font-bold px-40">{detalleNoticia?.categoria}</div>

          </div>
          <div>
            <Image
              src={detalleNoticia?.imagen ? detalleNoticia?.imagen?.url : demoImage}
              alt="blog details image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full rounded-lg py-10"
            />
          </div>


        <div className="text-center space-y-3 text-blue-950">
          <h2 className="text-xl font-bold mx-4">{detalleNoticia?.titulo}</h2>
          <p className="text-justify text-blue-800 text-lg font-light mx-4">{detalleNoticia?.bajada}</p>



          <div className="text-start text-blue-950">
            <p className="text-justify bg-slate-200 mx-4">{detalleNoticia?.texto}</p>
            <p className="text-justify  mx-4">{detalleNoticia?.resumen}</p>

          </div>
        </div>
        <Link href="/panel/noticias"  className="text-blue-700 text-lg"> Volver al panel </Link>

      </div>



    </section>
  );
};

export default DetalleNoticias;
