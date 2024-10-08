"use client"

import { useEffect, useState} from "react";
import UltimasNoticiasCalendario from "../../../componetsFrondend/UltimasNoticiasCalendario"





 function HomeCalendario(){
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
  const aux1 = [...ultimaCalendario].reverse() 
  
    return (
      <div  >
        {ultimaCalendario?.length > 0  ? (
          <>
          <div>
            <h2 className="text-center my-5 text-blue-800 text-2xl font-bold">
              Calendario
            </h2>
            <UltimasNoticiasCalendario  ultimaCalendario={aux1} />
          </div>
          

          </>
        ) : (
          <h3>Final...</h3>
        )}
      </div>
    );
  }
export default HomeCalendario;

