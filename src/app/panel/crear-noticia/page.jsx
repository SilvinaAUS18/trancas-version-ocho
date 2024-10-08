"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Input from "../../../components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TextArea from "../../../components/TextArea";
import demoImage from '../../../assets/imagenes/actualidad.jpg'
import Image from 'next/image'

const initialState = {
  titulo: "",
  bajada: "",
  texto: "",
  resumen: "",
  categoria: "ACTUALIDAD",
  photo: "",
};

const CrearNoticia = () => {

  const CLOUD_NAME="dph7ozqvf";
  const UPLOAD_PRESET="trancas_imagenes";

  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const {data: session, status} = useSession();

  if(status === "loading") {
    return <p>loading...</p>
  }

  if(status === "unauthenticated") {
    return <p>Access denied</p>
  }

  const handleChange = (event) => {
    setError("")
    const {name, value, type, files} = event.target;

    if(type === 'file') {
      setState({...state, [name]: files[0]});
    } else {
      setState({...state, [name]: value})
    }
  };
console.log(session)
  const handleSubmit = async(e) => {
    e.preventDefault();

    const {photo, titulo, categoria, texto, bajada, resumen} = state;

    if(!titulo || !bajada|| !texto || !resumen || !categoria) {
      setError("Todos los campos son requeridos");
      return;
    }

    if(photo) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if(photo.size > maxSize) {
        setError('El tamaño del archivo es demasiado grande. Seleccione un archivo de menos de 5 MB');
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
    
    try{
      setIsLoading(true);
      setError("")
      setSuccess("")
      const imagen = await uploadImage();

      const newBlog = {
        titulo,
        bajada,
        texto,
        resumen,
        categoria,
        imagen,
      }
      console.log(newBlog);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/noticia`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newBlog)
      })

      if(response?.status === 201) {
        setSuccess("Noticia creada con exito.");
        setTimeout(() => {
          router.refresh();
          router.push("/panel/noticias")
        }, 1500); 
      } else {
        setError("Error al crear la Noticia.")
      }
    } catch(error) {
      console.log(error);
      setError("Error al crear la Noticia")
    }

    setIsLoading(false)
  }

  const uploadImage = async () => {
    if(!state.photo) return;

    const formdata = new FormData();

    formdata.append('file', state.photo);
    formdata.append("upload_preset", UPLOAD_PRESET);

    try{
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formdata
      });

      const data = await res.json();
      const imagen = {
        id: data["public_id"],
        url: data['secure_url']
      }

      return imagen;
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <section className="container mx-30 mt-5 rounded-xl bg-blue-300">
      <h2 className="mb-5">
        <span className="special-word">Crear </span> Noticia
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="TITULO"
          type="text"
          name="titulo"
          placeholder="Titulo..."
          onChange={handleChange}
          value={state.titulo}
        />


        <TextArea
          label="BAJADA"
          rows="2"
          name="bajada"
          placeholder="Bajada..."
          onChange={handleChange}
          value={state.bajada}
        />
          <TextArea
          label="TEXTO"
          rows="4"
          name="texto"
          placeholder="texto..."
          onChange={handleChange}
          value={state.texto}
        />


        <TextArea
          label="RESUMEN"
          rows="2"
          name="resumen"
          placeholder="Resumen..."
          onChange={handleChange}
          value={state.resumen}
        />

        <div>
          <label className="block">Seleccionar Opcion</label>
          <select
            name="category"
            onChange={handleChange}
            value={state.categoria}
            className="block rounded-lg w-full p-3 bg-slate-400 text-blue-600"
          >
            <option value="ACTUALIDAD" >ACTUALIDAD</option>
            <option value="DEPORTES" >DEPORTES</option>
            <option value="TURISMO" >TURISMO</option>
            <option value="PRODUCCION" >PRODUCCION</option>
            <option value="INSTITUCIONAL">INSTITUCIONAL</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm  text-blue-800 font-extrabold">
            Subir Imagen
          </label>

          <input onChange={handleChange} type="file" name="photo" accept="image/*" />

          {state.photo && (
            <div>
              <Image 
                src={URL.createObjectURL(state.photo)}
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

        {error && <div className="text-red-700">{error}</div>}

        {success && <div className="text-green-700">{success}</div>}

        <button type="submit" className="py-2 w-full bg-blue-800  text-white p-5 rounded-lg">
          {isLoading ? "Loading..." : "Crear Noticia"}
        </button>
      </form>
    </section>
  );
};

export default CrearNoticia;
