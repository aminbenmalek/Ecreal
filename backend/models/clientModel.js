import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    cod_cli: {
      type: String,
      required: true,
    },
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Utilisateur",
    },
    nom_cli: {
      type: String,
      required: true,
    },
    photo_cli: {
      type: String,
      required: false,
    },
    adr_cli: {
      type: String,
      required: true,
    },
    ville_cli: {
      type: String,
      required: false,
    },
    tel_cli: {
      type: String,
      required: true,
    },
    email_cli: {
      type: String,
      required: false,
    },
    cod_tarif: {
      type: String,
      required: true,
    },
    cod_rep: {
      type: String,
      required: false,
    },
    is_Rep: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);
export default Client;
