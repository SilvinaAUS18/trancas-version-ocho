import React from 'react'
import escudo from '../assets/imagenes/logoMunicipio.jpg'
import bandera from '../assets/imagenes/bandera.png';
import Image from 'next/image';


function Cabeza() {
  return (
    <div className="flex container mx-auto my-auto contenedorCabeza rounded size-full bg-blue-900 text-white">

            <div className=' lg:pl-6  lg:size-1/12 md:size-2/12 md:px-8 sm:size:2/12  '>
                <Image src={escudo} alt="Image"
                width={0}
                height={0}
                sizes="100vw"
                className='rounded-full 
                my-2
                lg:min-h-32 
                lg:min-w-32 
                lg:mx-8
                lg:my-2
               
                md:max-h-14 md:max-w-14 
                sm:max-h-12 
                sm:max-w-12
                sm:ml-2

                 overflow-auto   '/>
            </div>
            <div className='lg:size-8/12 md:size-10/12 sm:size-10/12 mx-auto my-auto  w-100 '>
              <h1 
                    className='justify-center justify-items-center  
                    lg:font-bold
                    lg:text-[3.5rem]
                    lg:ml-10
                    md:text-2xl md:text-center md:justify-items-center 
                    sm:text-[1.1rem] sm:text-center sm:justify-items-center sm:font-bold '
                    >MUNICIPALIDAD DE TRANCAS
                    </h1>
            </div>
            <div className=' lg:size-2/12    md:size-2/12  sm:size-2/12 ' >
                 <Image src={bandera} alt="Image" 
                 width={0}
                 height={0}
                 sizes="100vw"
                 className=' overflow-auto
                 my-2
                 mr-2
                 
                 lg:w-32 
                 lg:h-24
                 lg:mr-auto
                 
                 md:max-h-28 
                 md:max-w-36
                 sm:max-h-7
                 sm:max-w-11
                 sm:mt-4
                 sm:mx-auto
                

                 ' />
            </div>
    </div>

      )
}

export default Cabeza