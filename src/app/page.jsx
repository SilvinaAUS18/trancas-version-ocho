"use client"
import React from 'react'
import Carousel from "../componetsFrondend/Carrucel"
import Trancas from "../componetsFrondend/Trancas"
import Banner from "../componetsFrondend/Banner";
import Image from "next/image";
import demoImage from "../assets/imagenes/actualidad.jpg";
import { useEffect, useState} from "react";




 function Home(){
    const [noticia, setNoticia] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/noticia`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        setNoticia(data);
      })
      .catch(err => {
        console.log(123123);
      });
  }, []);

  const ultimaNoticia =   noticia
  const aux = [...ultimaNoticia].reverse() 
  const ultimaNoticia1= aux.length && aux.slice(0,4)

  return (
<div className='container mx-auto'>
    <Carousel/>
     <Banner />
     <Trancas/>
     <div  >
        {ultimaNoticia1?.length > 0  ? (
          <>

     <div className=" grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1  gap-3 mt-10 lg:h-auto ">
      {ultimaNoticia1.map((item, index)=>(
        <div key={index} >
                      <h3 className='bg-blue-900 text-white'>{item.categoria}</h3>

          <div  className=" grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-5 ">

                <Image
                        src={ item?.imagen ?  item.imagen?.url : demoImage }
                        alt="primera noticia image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className=" w-full h-full rounded-lg  "
                      />
                <div>
                <p className="mb-10 text-xs text-blue-800 mt-5">{new Date(item.createdAt).toLocaleDateString()}</p>

                <h1 className="text-justify my-4 text-lg font-extrabold text-blue-900" >{item.titulo}</h1>
                <h2  className="text-justify my-2 text-sm font-bold text-blue-900"> {item.bajada}</h2>
                <p  className="text-justify text-sm text-blue-900">{item.resumen}</p>

                  </div>      
      
            </div>



        </div>
      ))}

    </div>
    </>
  ) : (
          <h3>Cargando...</h3>
        )}
      </div>


     
    </div> 
  
   )
  

}

export default Home
