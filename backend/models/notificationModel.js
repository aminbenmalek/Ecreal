import mongoose from "mongoose";

const notifSchema = mongoose.Schema(
  {
    cod_notif: {
      type: String,
      required: true,
    },
    libelle: {
      type: String,
      required: false,
    },
    categorie: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Notification = mongoose.model("Notification", notifSchema);
export default Notification;
