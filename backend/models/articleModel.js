import mongoose from "mongoose";
const evaluationsSchema = mongoose.Schema(
  {
    nom: { type: String, required: false },
    rating: { type: Number, required: false },
    commentaire: { type: String, required: false },
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Utilisateur",
    },
  },
  { timestamps: true }
);

const articleSchema = mongoose.Schema(
  {
    utilisateur: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Utilisateur",
    },
    famille: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Famille",
    },
    code_art: {
      type: String,
      required: false,
    },
    nom: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    marque: {
      type: String,
      required: false,
    },
    categorie: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    prix: {
      type: Number,
      required: false,
    },
    prix_1: {
      type: Number,
      required: false,
    },
    prix_2: {
      type: Number,
      required: false,
    },
    num_stock: {
      type: Number,
      required: false,
    },

    evaluations: [evaluationsSchema],
    evaluation: {
      type: Number,
      required: false,
      default: 0,
    },
    numevaluation: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Article = mongoose.model("Article", articleSchema);
export default Article;
