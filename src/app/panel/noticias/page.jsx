"use client"

import { useEffect, useState} from "react";
import UltimasNoticias from "../../../componetsFrondend/UltimasNoticias"





 function HomeNoticias(){
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
  
    return (
      <div  >
        {ultimaNoticia?.length > 0  ? (
          <>
          <div>
            <h2 className="text-center my-5 text-blue-800 text-2xl font-bold">
              <span className="text-blue-800  font-light">Ultimas</span>{" "}
              Noticias
            </h2>
            <UltimasNoticias ultimaNoticia={aux} />
          </div>
          

          </>
        ) : (
          <h3>Final...</h3>
        )}
      </div>
    );
  }
export default HomeNoticias;

/*<div className=" grid grid-cols-2 gap-3 mt-10">

{noticia.map((noticia)=>(
  <div key={noticia._id} >
    <div  className=" grid grid-cols-2 gap-5 ">
          <Image
                  src={ noticia?.imagen ?  noticia.imagen?.url : demoImage }
                  alt="primera noticia image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className=" w-full h-full rounded-lg  "
                />
          <div>
          <p className="mb-10">{new Date(noticia.createdAt).toLocaleDateString()}</p>

          <h1 className="text-justify my-4" >{noticia.titulo}</h1>
          <h2  className="text-justify my-2"> {noticia.bajada}</h2>
          <p  className="text-justify">{noticia.resumen}</p>

            </div>      

      </div>



  </div>
))}

</div>

*/
