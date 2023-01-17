import mongoose from "mongoose";
const societeSchema = mongoose.Schema(
  {
    code_soc: {
      type: String,
      required: true,
    },
    nom_soc: {
      type: String,
      required: true,
    },
    abrv_soc: {
      type: String,
      required: true,
    },
    adr_soc: {
      type: String,
      required: true,
    },
    tel_soc: {
      type: String,
      required: false,
    },
    tva_soc: {
      type: String,
      required: true,
    },
    logo_soc: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Societe = mongoose.model("Societe", societeSchema);
export default Societe;
