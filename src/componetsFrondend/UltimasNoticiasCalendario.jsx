
import React from "react";
import Image from "next/image";
import Link from "next/link";
import demoImage from "../assets/imagenes/actualidad.jpg";


const UltimasCalendario = ({ ultimaCalendario }) => {
  return (
    <section className="  grid grid-cols gap-10 text-blue-950 lg:h-auto sm:h-auto">
        {ultimaCalendario?.length > 0 &&
        ultimaCalendario?.map((item, index) => (
            <div  key={index}  className="  container ">

              <Link href={`/panel/calendario/${item?._id}`} >
               <div>
               <p className="text-white text-center bg-blue-700 font-extrabold w-full mx-auto">{item?.categoria}</p>

                </div> 
              <div className=" grid lg:grid-cols-2 sm:grid-cols-1 items-center gap-8 text-blue-800 ">
                <div className="w-full h-auto mx-auto ">

                  <Image
                    src={ item?.imagen ?  item.imagen?.url : demoImage }
                    alt="blog image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="lg:w-[calc(40vh-4rem)] sm:w-full sm:h-[calc(30vh-1rem)] mx-auto lg:h-[calc(30vh-4rem)] rounded-lg mb-2"
                  />
                 </div>
                 
                 
                    <div className=" container  mx-auto grid grid-cols-1 p-5 ">
                          <h2 className="text-blue-950  flex-row text-lg text-justify">{item?.titulo}</h2>
                          <p className="text-blue-950  text-lg mx-2 text-justify">{item?.texto}</p>

                  </div>
               </div>
              </Link>
              </div>
          ))}
      <Link href="/panel/calendario" className="text-xl  font-bold bg-gray-900 text-white px-1 rounded-2xl "> Calendario todo</Link>
     
      </section>
  );
};

export default UltimasCalendario;
