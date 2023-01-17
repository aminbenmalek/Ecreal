import mongoose from "mongoose";

const mouvSchema = mongoose.Schema(
  {
    notification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
      required: true,
    },
    libelle_mouv: {
      type: String,
      required: true,
    },
    date_mouv: {
      type: Date,
      required: true,
    },
    duree: {
      type: Number,
      required: true,
    },
    etat: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Mouvement = mongoose.model("Mouvement", mouvSchema);
export default Mouvement;
