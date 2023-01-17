import mongoose from "mongoose";

const tiersSchema = mongoose.Schema(
  {
    cod_tiers: {
      type: String,
      required: true,
    },
    nom_tiers: {
      type: String,
      required: false,
    },
    pren_tiers: {
      type: String,
      required: false,
    },
    photo_tiers: {
      type: String,
      required: false,
    },
    cin_tiers: {
      type: String,
      required: false,
    },
    tel_tiers: {
      type: String,
      required: false,
    },
    adr_tiers: {
      type: String,
      required: false,
    },
    email_tiers: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const Tiers = mongoose.model("Tiers", tiersSchema);
export default Tiers;
