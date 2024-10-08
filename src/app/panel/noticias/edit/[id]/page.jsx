"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Input from "../../../../../components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextArea from "../../../../../components/TextArea";
//import demoImage from "../../../../../assets/imagenes/actualidad.jpg";
import Image from "next/image";
import { deletePhoto } from "../../../../../actions/uploadActions";

const initialState = {
    titulo: "",
    bajada: "",
    texto: "",
    resumen: "",
    categoria: "ACTUALIDAD",
    photo: "",
  };
  

const EditNoticia = ({ params }) => {
  const CLOUD_NAME = "dph7ozqvf";
  const UPLOAD_PRESET = "trancas_imagenes";

  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
console.log(state)
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    async function buscarNoticia() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/noticia/${params.id}`);

        if (res.status === 200) {
          const NoticiaData = await res.json();

          setState((prevstate) => ({
            ...prevstate,
            titulo: NoticiaData.titulo,
            bajada: NoticiaData.bajada,
            texto: NoticiaData.texto,
            resumen: NoticiaData.resumen,
            categoria: NoticiaData.categoria,
            photo: NoticiaData.imagen,
          }));
        } else {
          setError("Error al buscar la noticia");
        }
      } catch (error) {
        setError("Error al buscar la noticia");
      }
    }

    buscarNoticia();
  }, [params.id]);

  if (status === "loading") {
    return <p>loading...</p>;
  }


  const handleChange = (event) => {
    setError("");
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setState({ ...state, [name]: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newImage, titulo, categoria, bajada, texto, resumen } = state;

    if (!titulo || !texto || !categoria || !bajada || !resumen) {
      setError("Todos los campos son requeridos");
      return;
    }

    if (newImage) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (newImage.size > maxSize) {
        setError("El tamaño del archivo es demasiado grande. Seleccione un archivo de menos de 5 MB.");
        return;
      }
    }

    if (titulo.length < 4) {
      setError("El título debe tener al menos 4 caracteres.");
      return;
    }

    if (texto.length < 20) {
      setError("texto  debe tener al menos 20 caracteres.");
      return;
    }

    if (bajada.length < 10) {
      setError("La bajada debe tener al menos 10 caracteres.");
      return;
    }

    if (resumen.length < 6) {
      setError("El resumen debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      let imagen;

      if (state.newImage) {
        imagen = await uploadImage();

        if (state.photo?.id) {
          await deletePhoto(state.photo.id);
        }
      } else {
        imagen = state.photo;
      }

      const updateBlog = {
        titulo,
        texto,
        bajada,
        resumen,
        categoria,
        imagen,
      };
                                  
      const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/api/noticia/${params.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(updateBlog),
        }
      );

      if (response?.status === 200) {
        setSuccess("Noticia Modificada");
        setTimeout(() => {
          router.refresh();
          router.push(`/panel/noticias/${params.id}`);
        }, 1500);
      } else {
        setError("Error al modificar la noticia");
      }
    } catch (error) {
      console.log(error);
      setError("Error occurred while updating blog.");
    }

    setIsLoading(false);
  };

  const uploadImage = async () => {
    if (!state.newImage) return;

    const formdata = new FormData();

    formdata.append("file", state.newImage);
    formdata.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formdata,
        }
      );

      const data = await res.json();
      const imagen = {
        id: data["public_id"],
        url: data["secure_url"],
      };

      return imagen;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancleUploadImg = () => {
    setState({ ...state, ["newImage"]: "" });
  };

  return (
    <section className="container mx-30 mt-5 rounded-xl bg-blue-300">
      <h2 className="mb-5">
        <span className="special-word">Editar</span> Noticia
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Tiulo"
          type="text"
          name="titulo"
          placeholder="Write you title here..."
          onChange={handleChange}
          value={state.titulo}
        />


        <TextArea
          label="Bajada"
          rows="2"
          name="bajada"
          placeholder="Write you excerpt here..."
          onChange={handleChange}
          value={state.bajada}
        />
        <TextArea
          label="texto"
          rows="4"
          name="texto"
          placeholder="Write you description here..."
          onChange={handleChange}
          value={state.texto}
        />


        <TextArea
          label="Resumen"
          rows="2"
          name="resumen"
          placeholder="Write you quote here..."
          onChange={handleChange}
          value={state.resumen}
        />

        <div>
          <label className="block">Seleciona Opcion</label>
          <select
            name="categoria"
            onChange={handleChange}
            value={state.categoria}
            className="block rounded-lg w-full p-3 bg-slate-400 text-blue-600"
          >
            <option value="ACTUALIDAD">ACTUALIDAD</option>
            <option value="DEPORTES">DEPORTES</option>
            <option value="TURISMO">TURISMO</option>
            <option value="PRODUCCION">PRODUCCION</option>
            <option value="INSTITUCIONAL">INSTITUCIONAL</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Upload Image</label>

          <input
            onChange={handleChange}
            type="file"
            name="newImage"
            accept="image/*"
          />

          {state.newImage ? (
            <div>
              <Image
                src={URL.createObjectURL(state.newImage)}
                priority
                alt="Sample image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-32 mt-5"
              />

              <button onClick={handleCancleUploadImg}>Cancle</button>
            </div>
          ) : (
            <div>
              {state.photo && state.photo["url"] && (
                <div>
                  <Image
                    src={state.photo.url}
                    priority
                    alt="Sample image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-32 mt-5"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {error && <div className="text-red-700">{error}</div>}

        {success && <div className="text-green-700">{success}</div>}

        <button type="submit" className="py-2 w-full bg-blue-800  text-white p-5 rounded-lg">
          {isLoading ? "Loading..." : "editar"}
        </button>
      </form>
      <Link href="/panel/noticias" className="py-2 w-full bg-blue-600  text-white p-5 rounded-lg">Volver a noticias</Link>
    </section>
  );
};

export default EditNoticia;
