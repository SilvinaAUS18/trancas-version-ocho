import NavBarPrincipal from "../componetsFrondend/NavPrincipal";
import "./globals.css";
import Cabeza from "../componetsFrondend/Cabeza";
import Footer from '../componetsFrondend/Footer'
import { Rubik}from "next/font/google"

export const metadata = {
  title: "MUNICIPALIDAD DE TRANCAS",
  description: "Pagina institucional de la municipalidad de Trancas - Tucuman - Argentina",
};
const rubik = Rubik({
  weight:["300","400","500","600","700","800","900"],
  style:["italic", "normal"],
  subsets:["latin"]
})

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
      <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body
        className= {rubik.className}
      >
        <div className="container">
        <Cabeza/>
        <NavBarPrincipal/>
        {children}

        <Footer/>
        </div>
      </body>
    </html>
  );
}
