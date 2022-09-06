import mongoose from "mongoose";
const commandeSchema = mongoose.Schema(
  {
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Utilisateur",
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    societe: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Societe",
    },
    cod_cli: {
      type: String,
      required: true,
    },
    nom_cli: {
      type: String,
      required: true,
    },

    chariotListe: [
      {
        nom: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        prix: { type: Number, required: true },
        article: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Article",
        },
      },
    ],
    livraisonAdresse: {
      adresse: { type: String, required: false },
      ville: { type: String, required: false },
      codepostale: { type: Number, required: false },
      pays: { type: String, required: false },
      tel: { type: String, required: false },
    },
    methodepaiement: {
      type: String,
      required: false,
    },
    resultatpaiement: {
      id: { type: String },
      etat: { type: String },
      update_time: { type: String },
      email: { type: String },
    },
    articlesPrix: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxePrix: {
      type: Number,
      required: false,
      default: 0.0,
    },
    livraisonPrix: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalePrix: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaie: {
      type: Boolean,
      required: true,
      default: false,
    },
    date_paiement: {
      type: Date,
    },
    isLivree: {
      type: Boolean,
      required: true,
      default: false,
    },
    date_livraison: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const Commande = mongoose.model("Commande", commandeSchema);
export default Commande;
