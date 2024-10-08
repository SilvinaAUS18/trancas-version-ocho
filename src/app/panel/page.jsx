import Image from "next/image";
import trancas from '../../assets/imagenes/actualidad.jpg'

export default function Home() {
  return (
    <div className="container flex flex-col md:flex-row gap-5 h-[calc(60vh-4rem)]">
      <div className="basis-full flex flex-col justify-center md:basis-2/3">
        <p className="special-word text-xs font-extrabold text-blue-700">MUNICIPALIDAD DE TRANCAS</p>
        <h1 className="pb-5 text-blue-950 text-2xl font-bold">
          PANEL <span className="special-word">NOTICIAS</span> y CALENDARIO<br /> 
        </h1>

        <h1 className="pb-5 text-blue-500 text-xl">
          A traves de este Panel puede <br /><br />
          <span className="special-word"> * Cargar Noticias </span>  <br />
          <span className="special-word"> * Cargar Calendario </span>  <br />

          <span className="special-word"> * Ver las  Noticias Cargadas </span> 
          <span className="special-word"> /Editar / Eliminar </span> 

        </h1>

        <p className="text-lg font-bold text-blue-800"> - Se necesita tener usuario para poder acceder al panel de Carga de Noticias.</p><br />
        <p className="text-lg font-bold text-blue-800"> - Si no tiene Usuario por favor registrar su usuario </p>
      </div>

      <div className="hidden md:block basis-1/3 my-auto">
        <Image 
          src={trancas}
          alt="trancas"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
