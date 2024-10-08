"use client"
import trancas from '../../assets/imagenes/actualidad.jpg'
import expo from '../../assets/imagenes/expoLactea.jpg'
import caballo from '../../assets/imagenes/caballo2.jpg'
import san from '../../assets/imagenes/san.jpg';
import React from 'react';
import { useEffect, useState} from "react";
import Image from "next/image";




function Calendario() {
  const [calendario, setCalendario] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/calendario`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        setCalendario(data);
      })
      .catch(err => {
        console.log(123123);
      });
  }, []);

  const ultimaCalendario =   calendario
  const aux = [...ultimaCalendario].reverse() 
  const ultimaNoticia2= aux.length && aux.slice(0,3)

  return (
    <div className=' container bg-gradient-to-b from-blue-100 to-blue-200 via-cyan-200'>

<div  >
        {ultimaNoticia2?.length > 0  ? (
          <>

     <div className=" grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1  gap-3 mt-10  lg:h-auto sm:h-auto">
      
      {ultimaNoticia2.map((item, index)=>(
        <div key={index} >
                      <h3 className='bg-blue-900 text-white'>{item.categoria}</h3>

          <div  className=" grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-5 ">

                <Image
                        src={ item?.imagen ?  item.imagen?.url : demoImage }
                        alt="primera noticia image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="lg:w-[calc(40vh-4rem)] sm:w-full sm:h-[calc(30vh-1rem)]  mx-auto my-auto lg:h-[calc(30vh-4rem)] rounded-lg mb-2 "
                      />
                <div>
                <p className="mb-10 text-xs text-blue-800 mt-5">{new Date(item.createdAt).toLocaleDateString()}</p>

                <h1 className="text-justify my-4 mx-4 text-lg font-extrabold text-blue-900" >{item.titulo}</h1>
                <p  className="text-justify my-2 px-4 text-sm font-bold text-blue-900"> {item.texto}</p>

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



<div className="container  lg:grid grid-cols-2 md:grid grid-cols md:h-96  my-10 rounded-3xl bg-sky-200 mx-auto ">
        <div className=" p-5 m-2">
        <iframe
              className='w-full h-full'
              title="Festival del Caballo"
              src="https://res.cloudinary.com/dph7ozqvf/video/upload/v1726020039/FIESTA_DEL_CABALLO_kz3zlm.mp4"
              frameborder="0"
              allowfullscreen
            />

        </div>
        <div className=" my-auto mx-auto text-center">
          <h2 className=" text-3xl font-extrabold text-blue-800 tracking-widest leading-6 animate-rotate-y animate-infinite animate-duration-[4000ms] animate-delay-[5000ms] animate-ease-in-out">OCTUBRE</h2>
          <h1 className=" mt-10 text-xl font-extrabold text-blue-800 tracking-widest leading-10 italic animate-bounce animate-infinite animate-duration-[4000ms] animate-delay-[5000ms] animate-ease-in-out" > Festival del  Caballo</h1>
        </div>


      </div>


       <div  >

                      
      </div>
<div className="container ">

<div className="grid grid-cols-1 lg:grid-cols-2 my-2 p-1">
  <div className="mx-2 my-auto">
  <img   src={caballo.src} alt="boyero" className="m-2 rounded-2xl"/>
  <p className="text-slate-500 text:2xl mt-3 mx-10 text-justify">La Fiesta Nacional del Caballo es un encuentro de expositores de diferentes provincias, entre ellas Catamarca, Salta, Córdoba, Santiago del Estero, Jujuy y Tucumán. Durante este evento tradicional, jinetes de todo el territorio nacional, compiten en tres categorías de doma: Crines, Gurupa y Bastos. 
                    <br/>
                    Por considerar este evento como una forma de preservar nuestra cultura y nuestras tradiciones siendo el más relevante de la geografía nacional.
                    <br/>
    </p>
  </div>
  <div className="my-auto">
      <h1 className="text-2xl md:text-3xl font-medium  mx-2 text-blue-900">Festival del Caballo</h1>
      <p className="text-slate-500 text:2xl mt-3 mx-1 text-justify">
      El Festival del Caballo es unos de los eventos más tradicionales de la provincia, se realiza en el departamento de Trancas, en el mes de OCTUBRE,  y es  una de las más potentes muestras de Argentinidad que se pueden ver en el suelo nacional.- 
                <br/>
                Esta fiesta es una manifestación popular, en la que se rinde un legítimo homenaje al que fue (aún lo es) vehículo y herramienta de trabajo imprescindible en la Argentina fundacional, agrícola y guerrera: el Caballo. 
                <br/>
                Este evento es consecuencia de antiguas tradiciones y actualmente recibe aproximadamente 60.000 personas; en una fiesta familiar que tiene importancia y trascendencia nacional. 
                <br/>
                Nuestra Argentina tiene particularidades de todo tipo que distinguen a los habitantes según las regiones, sin que ello mengüe en modo alguno la concepción del mismo proyecto e identificación de país. 
                Entre las experiencias que construyen una identidad, está la relación de la mujer y el hombre de campo que viven en las diferentes regiones del país, con su caballo.
                <br/>
                Este evento forma parte de las festividades más importantes del norte y de la argentina misma, convocando gran cantidad de espectadores, que disfrutan de la variada cartelera con cantores locales, nacionales e internacionales de renombre. 
                    Además reúne representantes de la producción local con productos típicos.
                    Con la participación y el despliegue de las academias de danzas folklóricas haciendo sus presentaciones y dando un marco de tradición y gran colorido a esta fiesta, con más de 2500 bailarines desplegados en el predio. 

      </p>
  </div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-2 my-10  p-4 ">
  <div className="mx-auto my-auto p-2">
  <img   src={expo.src} alt="boyero" className="m-2 rounded-2xl"/>
  </div>
  <div className="my-auto">
      <h1 className="text-2xl md:text-3xl font-medium  mx-2 text-blue-900">Expo Lactea</h1>
      <p className="text-slate-500 text:2xl mt-3  text-justify">
      Es un evento muy importante no solo para la provincia, sino también para todo el norte argentino ya que se pone en valor lo que es la articulación del sector público y privado para poder facilitar que tanto productores como distribuidores desarrollen su actividad a pleno
                <br />    
                Cuenta  con la presencia de artistas, exposiciones de maquinarias, remates de hacienda y todo lo relacionado a la producción de la cuenca Tapia- Trancas.

                Se generan  puestos de trabajo en Trancas y  en cada uno de los lugares donde están establecidas las plantas e industrias que procesan la  materia prima, la leche, buscando el valor agregado y generando recursos para la provincia de Tucumán

                El evento en general se encuentra organizado por la Mesa de Lechería de Tucumán y la Municipalidad de Trancas y se llevará a cabo en las instalaciones del predio ferial municipal C.P.N Roque Raúl Romano.
                En este marco, se concretarán una serie de concursos/certámenes y un espacio destinado a la exposición de productos.
   </p>
  </div>
</div>


<div className="grid grid-cols-1 lg:grid-cols-2 my-10  p-4 ">
  <div className="mx-1 my-auto p-2">
  <img   src={san.src} alt="boyero" className="m-2 rounded-2xl"/>
  </div>
  <div className="my-auto">
      <h1 className="text-2xl md:text-3xl font-medium  mx-2 text-blue-900">Fiesta San Francisco</h1>
      <p className="text-slate-500 text:2xl mt-3 mx-1 text-justify">
      La fiesta tiene lugar el siguiente domingo después de Pascuas e inicia con la celebración de la Santa misa con autoridades a las 10 de la mañana en la antigua Parroquia de Trancas. Ese día también se realizan bautismos.
                <br/>
                Posteriormente a las 15:00 una multitudinaria procesión sale de la Vieja Iglesia y se dirige a la Ermita de San Francisco Solano, ubicada a 3 kilómetros.
                <br/>
                En el lugar los peregrinos pueden tocar la campana tres veces para que se cumplan los deseos y beber el agua del “Pozo” que es Bendita y posee propiedades curativas. A las 17:00 el párroco celebra la Misa del Peregrino y al finalizar ésta se dispone la gente a regresar a sus hogares.
      </p>
  
  </div>
</div>



</div>

      </div>

  )
}

export default Calendario