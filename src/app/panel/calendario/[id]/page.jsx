"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";

import demoImage from "../../../../assets/imagenes/actualidad.jpg";
import { deletePhoto } from "../../../../actions/uploadActions";


const DetalleCalendario = ({ params }) => {
  const [detalleCalendario, setDetalleCalendario] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  async function buscarCalendario() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/calendario/${params.id}`);
      const calendario = await response.json();
      setDetalleCalendario(calendario);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    buscarCalendario()
  }, []);


  const handleBlogDelete = async (imageId) => {
    try {
        setIsDeleting(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/calendario/${params.id}`,
          {
            method: "DELETE",
            headers: {
            },
          }
        );

        if (response?.status === 200) {
          await deletePhoto(imageId);
          router.refresh();
          router.push("/panel/calendario");
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
            href={`/panel/calendario/edit/${params.id}`}
            className="flex items-center gap-1 text-primaryColor"
          >
            <BsFillPencilFill />
            
          </Link>

          <button
            onClick={() => handleBlogDelete(detalleCalendario?.imagen?.id)}
            className="flex items-center gap-1 text-red-500"
          >
            <BsTrash />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>

      <div className="flex flex-col items-center justify-center container">
          <div className="flex flex-col justify-center items-center py-10">
          <div className="text-white bg-blue-700 font-bold px-40">{detalleCalendario?.categoria}</div>

          </div>
          <div>
            <Image
              src={detalleCalendario?.imagen ? detalleCalendario?.imagen?.url : demoImage}
              alt="blog details image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full rounded-lg py-10"
            />
          </div>


        <div className="text-center space-y-3 text-blue-950">
          <h2 className="text-xl font-bold mx-4">{detalleCalendario?.titulo}</h2>



          <div className="text-start text-blue-950">
            <p className="text-justify bg-slate-200 mx-4">{detalleCalendario?.texto}</p>

          </div>
        </div>
        <Link href="/panel"  className="text-blue-700 text-lg"> Volver al panel </Link>

      </div>



    </section>
  );
};

export default DetalleCalendario;
