import mongoose from "mongoose";
const CalendarioSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      min: 4,
    },
  
    texto: {
      type: String,
      required: true,
      min: 20,
    },
    imagen: {
      
      id: {
        type: String
      },
      url: {
        type: String
      }
    },
    categoria: {
      type: String,
      required: true,
      enum: [
        "ENERO",
        "FEBRERO",
        "MARZO",
        "ABRIL",
        "MAYO",
        "JUNIO",
        "JULIO",
        "AGOSTO",
        "SEPTIEMBRE",
        "OCTUBRE",
        "NOVIEMBRE",
        "DICIEMBRE",


      ],
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Calendario || mongoose.model("Calendario", CalendarioSchema);

